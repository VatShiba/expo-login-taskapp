import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    Alert,
    Image,
    View,
} from 'react-native';
import t from 'tcomb-form-native'; // 0.6.15
const ipv4 = require('./config').ipv4

// Form
const Form = t.form.Form;

// Form model
const Task = t.struct({
    _id: t.String,
    createdAt: t.String,
    updatedAt: t.String,
    title: t.String,
    description: t.String,
});

let options = {
    fields: {
        _id: {
            label: 'MongoDB item id',
            editable: false
        },
        createdAt: {
            editable: false
        },
        updatedAt: {
            editable: false
        }
    },
};

export default class Register extends Component {
    constructor() {
        super()
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillMount() {
        this.setState({
            task: this.props.route.params.task
        })
    }

    handleUpdate() {
        console.log(this.forminput.getValue())
        if (this.forminput.getValue()) {
            var input = this.forminput.getValue()
            // fetch to backend
            fetch(ipv4 + '/task/' + this.state.task._id + '/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    title: input.title,
                    description: input.description,
                }),
            })
                .then(res =>
                    res.json()
                )
                .then(res => {
                    console.log(res)
                    if (res.task) {
                        Alert.alert(res.message)
                        this.props.route.params.fetchTasks() // fetch previos screen
                        this.props.navigation.goBack()
                    }
                })
        }
    }

    handleDelete() {
        if (this.forminput.getValue()) {
            // fetch to backend
            fetch(ipv4 + '/task/' + this.state.task._id + '/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            })
                .then(res =>
                    res.json()
                )
                .then(res => {
                    console.log(res)
                    if (res) {
                        Alert.alert(res.message)
                        this.props.route.params.fetchTasks() // fetch previos screen
                        this.props.navigation.goBack()
                    }
                })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.content}>
                    {this.state.task.image ? <Image source={{ uri: this.state.task.image }} style={styles.image} /> : null}
                </View>
                <Form ref={c => (this.forminput = c)}
                    type={Task} options={options}
                    value={this.state.task}
                />
                <Button title="Update" onPress={this.handleUpdate} />
                <Button title="Delete" onPress={this.handleDelete} />
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
    },
    image: {
        width: 150, height: 150
    }
});