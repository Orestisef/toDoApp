import React, { Component } from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
    state = {
      tasks: []
    };
  

    componentDidMount() {
     fetch('/my-api/get.json')
      .then(response => response.json())
      .then(data => this.setState( {tasks: data}));
    }
  
    handleSubmit = taskTitle => {
      console.log(taskTitle);
      //this.setState({tasks: [...this.state.tasks]});

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskTitle })
      };
      fetch('/my-api/post.json', requestOptions)
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
      fetch('/my-api/delete.json', requestOptions);
    }

    handleComplete = (index, nodeID) => {
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nid: nodeID })
      };
      fetch('/my-api/put.json', requestOptions)
      .then(response => response.json())
      .then(data => this.setState( {tasks: data}));
    }
  
    render() {
      return(
        <div className='wrapper'>
          <div className='card frame'>
            <Header numTodos={this.state.tasks.length} />
            <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} onMarkComplete={this.handleComplete}/>
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
        </div>
      );
    } 
  }
  
  
  class SubmitForm extends React.Component {
    state = { term: '' };
  
    handleSubmit = (e) => {
      e.preventDefault();
      if(this.state.term === '') return;
      this.props.onFormSubmit(this.state.term);
      this.setState({ term: '' });
    }
  
    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            className='input'
            placeholder='Enter Item'
            value={this.state.term}
            onChange={(e) => this.setState({term: e.target.value})}
          />
          <button className='button'>Submit</button>
        </form>
      );
    }
  }
  
  
  const Header = (props) => {
    return(
      <div className='card-header'>
        <h1 className='card-header-title header'>
          You have {props.numTodos} Todos
        </h1>
      </div>
    )
  }
  
  
  const TodoList = (props) => {
    
    const todos = props.tasks.map((todo, index) => {
      return <Todo content={{...todo}} key={index} id={index} onDelete={props.onDelete} onMarkComplete={props.onMarkComplete} />
    })
    return( 
      <div className='list-wrapper'>
        {todos}
      </div>
    );
  }
  
  const Todo = (props) => {

    // let isCompleted = props.content.body[0].value;
    // let text='';
    // if (isCompleted){
    //   text = 'DONE: ';
    // }

    return(
      <div className='list-item'>
        {/* text + props.content.title[0].value */}
        {props.content.title[0].value}
        <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id, props.content.nid[0].value)}}></button>
        <button class="markcomplete is-pulled-right" onClick={() => {props.onMarkComplete(props.id, props.content.nid[0].value)}}></button>
      </div>
    );
  }
  
//   ReactDOM.render(
//     <App />,
//     document.querySelector('#root')
//   );

export default App;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;