import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.15
const ipv4 = require('./config').ipv4

// Form
const Form = t.form.Form;

// Form model
const User = t.struct({
  email: t.String,
  username: t.String,
  fullname: t.String,
  age: t.Number,
  password: t.String,
  retypepassword: t.String,
});

let options = {
  fields: {
    fullname: {
      label: 'Full Name',
    },
    password:{
      secureTextEntry: true
    },
    retypepassword: {
      label: 'Retype Password',
      secureTextEntry: true,
    }
  },
};

export default class Register extends Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    console.log(this.forminput.getValue())
    if (this.forminput.getValue()) {
      var input = this.forminput.getValue()
      // fetch to backend
      fetch(ipv4 + '/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
              email: input.email,
              username: input.username,
              age: input.age,
              fullname: input.fullname,
              password: input.password,
          }),
      })
          .then(res =>
              res.json()
          )
          .then(res => {
              console.log(res)
              if(res.username){
                this.props.navigation.goBack()
                Alert.alert("Successfully, " + res.username)
              }
          })
  }
  }


  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Form ref={c => (this.forminput = c)} type={User} options={options}/>
        <Button title="Submit" onPress={this.handleSubmit} />
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