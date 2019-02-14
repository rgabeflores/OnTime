import React from "react";
import{
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableHighlight
} from 'react-native';
import Toolbar from '../components/Toolbar';
const styles = '../components/style'
export default class TasksScreen extends React.Component {
    // constructor of the class, this stores the data(what it displays) for TaskScreen
    constructor(){
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            taskDataSource: ds
        }
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }
    // call it before the component mounts, debugging
    componentWillMount(){
        this.getItems();
    }
    // get called
    componentDidMount(){
        this.getItems();
    }
    // get the items from the list view
    getItems(){
        // hardcode values (fetch data from firebase later)
        let tasks = [{title: 'Task One'}, {title: 'Task Two'}];
        // update the view
        this.setState({
            taskDataSource: this.state.taskDataSource.cloneWithRows(tasks)
        });
    }
    // display task title 
    renderRow(task){
        return (
            <TouchableHighlight onPress={()=> {
                this.pressRow(task);
                }}>
                <View style = {styles.li}>
                    <Text style = {styles.liText}>
                        {task.title}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
    // log the task that was tapped on (or do something else later)
    pressRow(task){
        console.log(task);
    }
    render() {
        if(this.state.taskDataSource.getRowCount === 0){
            return(
                <View style={styles.container}>
                    <Text>
                    loading....
                    </Text>
                </View>
            );
        } else {
        return(
                <View style = {styles.container}>
                    <Toolbar title = "Task List"/>
                    <ListView
                        dataSource = {this.state.taskDataSource}
                        renderRow = {this.renderRow}
                    />
                </View>
            );
        }
    }
}

AppRegistry.registerComponent('tasklister', () => tasklister);