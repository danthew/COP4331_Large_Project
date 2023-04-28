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
    datetimepicker,
    ScrollView,
    Pressable,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { Input, NativeBaseProvider, Icon, Box, AspectRatio } from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card, ListItem } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import tryRegister from '../api/register';

const background = require('./../assets/background.png');
const logo = require('./../assets/logo.png');

interface RegisterScreenProps {
    navigation: any;
}

export default function Register(props: RegisterScreenProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("");

    /* DatePicker Stuff */
    const [date, setDate] = useState(new Date());
    const [ dateOfBirth, setDateOfBirth ] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChange = ({ type }, selectedDate) => {
        if (type === "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
        } else {
            toggleDatePicker();
        }
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const confirmDatePicker = () => {
        setDateOfBirth(date.toString());
        toggleDatePicker();
    };

    /* DatePicker Stuff */

    const login = ()=> {
        props.navigation.navigate("Login");
    }

    const register = async ()=> {
        // "email", "password", "name", "username", "dob"

        console.log("DOB: ", dateOfBirth);
        var newDob = moment(dateOfBirth).format("MM/DD/YYYY");
        console.log(newDob);

        var registerCreds = {
            "email": email,
            "password": password,
            "name": name,
            "username": username,
            "dob": newDob,
        };
        console.log("[register]: registerCreds: ", JSON.stringify(registerCreds, null, 4));
        let response = await tryRegister(registerCreds);
        if (!response.success) {
            setErrorMessage("Something went wrong");
            return;
        }
    }

    return (
      <View style={styles.container}>
      <ImageBackground source={background} resizeMode="cover" style={styles.image} />
      <Card style={styles.card}>
          <Card.Title> Register </Card.Title>
          <Card.Divider/>
          <Image style={styles.logo} source={require("./../assets/logo.png")} />
          <View style={styles.fields}>
              <StatusBar style="auto" />
              <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Username"
                      placeholderTextColor="#003f5c"
                      onChangeText={(username) => setUsername(username)}
                    /> 
                  </View> 
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Email"
                      placeholderTextColor="#003f5c"
                      onChangeText={(email) => setEmail(email)}
                    /> 
                  </View> 
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Password"
                      placeholderTextColor="#003f5c"
                      secureTextEntry={true}
                      onChangeText={(password) => setPassword(password)}
                    /> 
                  </View> 
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Full Name"
                      placeholderTextColor="#003f5c"
                      onChangeText={(name) => setName(name)}
                    /> 
                  </View> 
        <View>
  <Pressable onPress={toggleDatePicker}>
    <TextInput
      style={styles.input}
      placeholder="Sat Aug 21 2004"
      value={dateOfBirth}
      onChangeText={setDateOfBirth}
      placeholderTextColor="#11182744"
      editable={false}
      onPressIn={toggleDatePicker}
    />
  </Pressable>
  {showDatePicker && (
    <View style={{ flex: 1 }}>
      <DateTimePicker
        value={date}
        display="spinner"
        mode="date"
        onChange={onChange}
        style={styles.datePicker}
        maximumDate={new Date()}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {/* Cancel Button */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.pickerButton,
            { backgroundColor: "#11182711" },
          ]}
        >
          <Text
            style={[styles.datePickerBtn, { color: "#075985" }]}
            onPress={toggleDatePicker}
          >
            {" "}
            Cancel{" "}
          </Text>
        </TouchableOpacity>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.button, styles.pickerButton]}
        >
          <Text
            style={[styles.datePickerBtn, { color: "#075985" }]}
            onPress={confirmDatePicker}
          >
            Confirm{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )}
</View>

                  <TouchableOpacity>
                      <Button
                        title="Already have an account? Sign in"
                          onPress={login}
                      />
                  </TouchableOpacity> 
                  <TouchableOpacity style={styles.loginBtn} onPress={register}>
                    <Text style={styles.loginText}>Register</Text> 
                  </TouchableOpacity> 
              </ScrollView>
        </View>
      </Card>
    </View> 
  );
}

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
        justifyContent: 'center',
        maxHeight: "80%",
        width: "90%",
        alignSelf: "center",
    },
    scrollView: {
        flex: 1,
        alignSelf: "stretch",
        marginHorizontal: 0,
        marginBottom: -60,
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
        marginLeft: 20,
    },
    inputView: {
        backgroundColor: "#65bbfc",
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 15,
        marginTop: 10,
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
        marginBottom: 5,
        alignItems: "center",
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        top: 20,
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
    scrollViewContent: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    datePicker: {
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#003f5c',
        borderWidth: 0,
        width: "100%",
        height: 120,
        marginTop: -10,
    },
    pickerButton: {
        paddingHorizontal: 20,
    },
    datePickerBtn: {
        fontSize: 14,
        fontWeight: "500",
        color: "#fff",
    }
});

