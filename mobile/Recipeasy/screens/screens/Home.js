import React, {useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

/* User Context */
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Home = ()=> {

    const { user, updateUser } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}> Hello {user.name}! Successfully logged in </Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
    text: {
        flex: 0,
        position: "relative",
        alignItems: "center",
        height: "10%",
        width: "50%",
    }
});

export default Home;
