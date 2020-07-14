import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.15
import '@expo/vector-icons'; // 6.3.1
const ipv4 = require('./config').ipv4

// Form
const Form = t.form.Form;

// Form model
const User = t.struct({
    email: t.String,
    password: t.String,
});

export default class Login extends Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.loginSuccess = this.loginSuccess.bind(this)
    }

    handleSubmit() {
        if (this.forminput.getValue()) {
            var input = this.forminput.getValue()
            // fetch to backend
            fetch(ipv4 + '/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    email: input.email,
                    password: input.password,
                }),
            })
                .then(res =>
                    res.json()
                )
                .then(jwt => {
                    if(jwt.token){
                        //TODO: Cache jwt :)
                        /* */
                        //
                        this.loginSuccess()
                        Alert.alert("Hello, " + jwt.username)
                    }else{
                        console.log(jwt)
                    }
                })
        }
    }

    loginSuccess() {
        this.props.navigation.navigate('Home')
    }

    handleRegister() {
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Form ref={c => { this.forminput = c }} type={User} />
                <Button title="Login" onPress={this.handleSubmit} />
                <Button title="Not member?, Register" onPress={this.handleRegister} />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        marginTop: 30,
        padding: 20,
        backgroundColor: '#fff',
    },
    content: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    }
});