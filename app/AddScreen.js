import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    Image
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.15
import '@expo/vector-icons'; // 6.3.1
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from "expo-image-manipulator";
const ipv4 = require('./config').ipv4

// Form
const Form = t.form.Form;

// Form model
const Task = t.struct({
    title: t.String,
    description: t.String,
});

const options = {
    fields: {
        title: {
            label: 'Task Title',
        },
        description: {
            label: 'Description',
        }
    },
};

export default class Add extends Component {
    state = {
        image: null,
    };

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                const manipResult = await ImageManipulator.manipulateAsync(
                    result.localUri || result.uri,
                    [{ resize: { width: 150, height: 150 } }],
                    { compress: 0, format: ImageManipulator.SaveFormat.JPEG, base64: true }
                )
                console.log('base64:', manipResult.base64)
                this.setState({
                    image: manipResult.uri,
                    image64: "data:image/png;base64," + manipResult.base64
                });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    handleSubmit() {
        if (this.state.forminput.getValue()) {
            var input = this.state.forminput.getValue()
            // TODO: Upload to firebase storage and keep url at MongoDB 'image'

            // ใช้แบบนี้ไปก่อน base64 ครองโลก
            // fetch to backend
            fetch(ipv4 + '/task/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    title: input.title,
                    description: input.description,
                    image: this.state.image64
                }),
            })
                .then(res =>
                    res.json()
                )
                .then(res => {
                    if (res.task) {
                        Alert.alert(res.message)
                        this.props.route.params.fetchTasks() // fetch previos screen
                        this.props.navigation.goBack()
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Form ref={c => { this.state.forminput = c }} type={Task} options={options} />
                <View style={styles.content}>
                    {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
                </View>
                <Button title="Pick an image from camera roll" onPress={this._pickImage} />
                <Button title="Create" onPress={this.handleSubmit} />
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