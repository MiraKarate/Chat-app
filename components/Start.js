// React and React Native imports
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Alert } from 'react-native';

// Firebase Authentication imports
import { getAuth, signInAnonymously } from "firebase/auth";

const StartScreen = ({ navigation, db }) => {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('#090C08')

    const auth = getAuth();

    // Function to sign in an anonymous user and navigate to the chat screen.
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("ChatScreen", { userID: result.user.uid, name: name, backgroundColor: backgroundColor });   // Pass backgroundColor here
                Alert.alert("Signed in Successfully!");
            })
            .catch(() => {
                Alert.alert("Unable to sign in, try later again.");
            })
    }

    // Render the background image for the start screen
    return (
        <ImageBackground source={require('../img/background-image.png')} resizeMode="cover" style={styles.background}>
            <View style={styles.container}>
                {/* Render the title of the App */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Chat App</Text>
                </View>
                {/* Render the main menu */}
                <View style={styles.menu}>
                    {/* Render the input field with an image */}
                    <View style={styles.inputField}>
                        <Image
                            source={require('../img/your-name.png')} // Specify the path to the image here
                            style={styles.imageStyle}
                        />
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder='Your Name'
                        />
                    </View>
                    {/* Render custom color options for the chat view */}
                    <View style={styles.chooseColorContainer}>
                        <Text style={[styles.chooseColor]}>Choose Background Color:</Text>
                        <View style={styles.colorContainer}>
                            {/* Render color selection circles */}
                            <TouchableOpacity
                                style={[styles.circle, styles.black]}
                                onPress={() => { setBackgroundColor('#090C08') }}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.circle, styles.darkBrown]}
                                onPress={() => { setBackgroundColor('#474056') }}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.circle, styles.gray]}
                                onPress={() => { setBackgroundColor('#8A95A5') }}
                            ></TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.circle, styles.green]}
                                onPress={() => { setBackgroundColor('#B9C6AE') }}
                            ></TouchableOpacity>
                        </View>
                    </View>
                    {/* Render a button to navigate to the 'Chat View' */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={signInUser}
                    >
                        <Text style={styles.buttonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
                {/* Adjust the keyboard behavior for Android and iOS */}
                {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
                {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        width: '100%',
        height: '100%'
    },
    titleContainer: {
        justifyContent: 'start',
        marginTop: '22%',
        marginBottom: '30%'
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    menu: {
        backgroundColor: '#fff',
        width: "88%",
        height: "44%",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '7%',
    },
    inputField: {
        alignItems: "center",
        justifyContent: "start",
        flexDirection: "row",
        width: "88%",
        marginTop: 15,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#757083',
        borderRadius: 3,
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 30,
        width: 30,
        resizeMode: 'stretch',
        alignItems: 'flex-start',
    },
    textInput: {
        width: '88%',
        padding: 15,
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        opacity: 0.5,
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    chooseColorContainer: {
        width: '88%',
        marginBottom: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    chooseColor: {
        opacity: 1,
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
    },
    colorContainer: {
        flexDirection: 'row',
        width: '88%',

    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
    },
    black: {
        backgroundColor: '#090C08'
    },
    darkBrown: {
        backgroundColor: '#474056'
    },
    gray: {
        backgroundColor: '#8A95A5'
    },
    green: {
        backgroundColor: '#B9C6AE'
    },
    button: {
        width: '88%',
        height: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#757083',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default StartScreen;
