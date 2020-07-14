import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
const ipv4 = require('./config').ipv4

export default class Login extends Component {
    constructor() {
        super()
        this.state = {}
        this.fetchTasks = this.fetchTasks.bind(this)
        this.addTask = this.addTask.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.fetchTasks()
    }

    fetchTasks() {
        fetch(ipv4 + '/task')
            .then(tasks =>
                tasks.json()
            )
            .then(tasks => {
                console.log(tasks)
                this.setState({
                    tasks: tasks
                })
            })
    }

    _onPress(item) {
        this.props.navigation.navigate("Task", { task: item, fetchTasks: this.fetchTasks })
    }

    addTask() {
        this.props.navigation.navigate("Add", { fetchTasks: this.fetchTasks })
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tasks}
                    renderItem={({ item, index, separators }) => (
                        <TouchableOpacity
                            key={item.key}
                            onPress={() => this._onPress(item)}>
                            <View style={styles.item}>
                                {item.image ? <Image source={{ uri: item.image }} style={styles.littleImage} /> : <Image
                                    style={styles.littleImage}
                                    source={require('./assets/img1.jpg')}
                                />}

                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <TouchableOpacity
                    onPress={() => { this.addTask() }}>
                    <View style={styles.addB}>
                        <Text style={styles.title}>ADD</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        marginTop: 30,
        padding: 10,
        backgroundColor: '#fff',
    },
    item: {
        padding: 30,
        margin: 20,
        backgroundColor: "#ff6666",
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    addB: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 50,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
    },
    littleImage: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        marginRight: 10,
        borderWidth: 5,
        borderColor: "#eddaeb"
    }
});
