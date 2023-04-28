
import { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from 'react-native';
import { Input, NativeBaseProvider, Icon, Box, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card, ListItem } from 'react-native-elements'
import tryLogin from '../api/login';

/* UserContext */
import { useContext } from 'react';
import { UserContext } from '../UserContext';

interface LoginScreenProps {
    navigation: any;
}

const background = require('./../assets/background.png');
const logo = require('./../assets/logo.png');

const styles = StyleSheet.create({
    image: {
        flex: 1,
        position: "absolute",
        zIndex: -1,
        width: "100%",
        height: "100%",
        webkitFilter: "blur(8px)", /* Safari 6.0 - 9.0 */
        filter: "blur(8px)",
    },
    logoText: {
        fontSize: 37,
        fontWeight: 'bold',
        color: '#65bbfc',
        alignSelf: 'center',
        marginVertical: 0,
        marginTop: 20,
    },
    errorText: {
        color: "red",
    },
    card: {
        flex: 1,
        position: "relative",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    fields: {
        flex: 0,
        position: "relative",
        left: 0,
        top: 0,
        height: "50%",
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        bottom: 10,
        left: 22,
    },
    inputView: {
        backgroundColor: "#65bbfc",
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 15,
        marginTop: 100,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    passwordView: {
        backgroundColor: "#65bbfc",
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 25,
        alignItems: "center",
    },
    forgotBtn: {
        height: 30,
        marginBottom: 55,
        marginTop: 0,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        top: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#65bbfc",
    },
    registerBtn: {
      color: "blue",
      borderRadius: 25,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 0,
      marginTop: 20,
    },
    registerText: {
      color: '#0099ff',
      fontSize: 16,
    },
});

export default function Login(props: LoginScreenProps) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { user, updateUser } = useContext(UserContext);

    const register = async ()=> {
        setErrorMessage("");
        props.navigation.navigate("Register");
    };

    const login = async ()=> {

        if (id === '' && password === '') {
            setErrorMessage("Please enter your credentials");
            return;
        } else if (id === '') {
            setErrorMessage("Please enter an email or username");
            return;
        } else if (password === '') {
            setErrorMessage("Please enter your password");
            return;
        }

        const emailTest = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        var isEmail = emailTest.test(id);
        var loginCreds;

        if (isEmail) {
            loginCreds = {
                "email": id,
                "password": password,
            };
        } else {
            loginCreds = {
                "username": id,
                "password": password,
            }
        }

        console.log("[login]: Credentials: ", loginCreds);

        let res = await tryLogin(loginCreds);
        if (res.success) {
            console.log("Successfully logged in!");
        } else {
            console.log("No good!");
            switch (res.status) {
                default:
                    setErrorMessage("Incorrect username or password. Please check your credentials and try again.");
            }
        }

        var userInfo = res.response;
        console.log("Setting user context to: ", JSON.stringify(userInfo, null, 4));
        updateUser(userInfo);

        props.navigation.navigate("Home");
        console.log(res);
        return res;
    }

  return (
      <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.image} />
      <Card style={styles.card}>
          <Image style={styles.logo} source={require("./../assets/logo.png")} /> 
          <Text style={styles.logoText}>Recipeasy</Text>
          <View style={styles.fields}>
              <StatusBar style="auto" />
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  onChangeText={(id) => setId(id)}
                /> 
              </View> 
              <View style={styles.passwordView}>
                <TextInput
                  style={styles.TextInput}
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                /> 
              </View>
              <View>
                <TouchableOpacity style={styles.forgotBtn} onPress={register}>
                  <Text style={styles.registerText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
              <View>
              <TouchableOpacity style={styles.registerBtn} onPress={register}>
                  <Text style={styles.registerText}>New User? Make an Account</Text>
              </TouchableOpacity>
              </View>
              {errorMessage !== '' && (
                  <Text style={styles.errorText}>{errorMessage}</Text>
              )}
              <TouchableOpacity style={styles.loginBtn}
                    onPress={login}>
                <Text style={styles.loginText}>Login</Text> 
              </TouchableOpacity> 
          </View>
      </Card>
    </View> 
  );
}

