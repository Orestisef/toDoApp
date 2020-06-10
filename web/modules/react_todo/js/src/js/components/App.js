import React, { Component } from "react";
import ReactDOM from "react-dom";

import Header from "./Header";
import TodoList from "./TodoList";
import SubmitForm from "./SubmitForm";

import 'bulma/css/bulma.min.css';
import "./App.css";


class App extends React.Component {
  state = {
    tasks: []
  };

  //-------Lifecycle Methode -----//
  componentDidMount() {
   fetch('/custom-api/get.json')
    .then(response => response.json())
    .then(data => this.setState( {tasks: data}));
  }

  //----- Actions Handlers --------//
  handleSubmit = taskTitle => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle })
    };
    fetch('/custom-api/post.json', requestOptions)
    .then(response => response.json())
    .then(data => this.setState( {tasks: data}));
  }

  
  handleDelete = (index, nodeID) => {
    const newArr = [...this.state.tasks];
    newArr.splice(index, 1);
    this.setState({tasks: newArr});

    console.log(nodeID);
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nid: nodeID })
    };
    fetch('/custom-api/delete.json', requestOptions);
  }

  
  handleComplete = (index, nodeID) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nid: nodeID })
    };
    fetch('/custom-api/put.json', requestOptions)
    .then(response => response.json())
    .then(data => this.setState( {tasks: data}));
  }

  //--------- Render -------------//
  render() {
    return(
      <div className='wrapper'>
        <div className='card frame'>
            <Header numTodos={this.state.tasks.length} />
            <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} onMarkComplete={this.handleComplete}/>
          </div>
          <div className='card frame frame-form'>
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
      </div>
    );
  } 
}



export default App;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;

