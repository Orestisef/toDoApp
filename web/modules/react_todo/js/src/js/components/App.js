import React, { Component } from "react";
import ReactDOM from "react-dom";

// class Form extends Component {
//   constructor() {
//     super();

//     this.state = {
//       value: ""
//     };

//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     const { value } = event.target;
//     this.setState(() => {
//       return {
//         value
//       };
//     });
//   }

//   render() {
//     return (
//       <form>
//         <input
//           type="text"
//           value={this.state.value}
//           onChange={this.handleChange}
//         />
//       </form>
//     );
//   }
// }

// export default Form;

// const wrapper = document.getElementById("container");
// wrapper ? ReactDOM.render(<Form />, wrapper) : false;


class App extends React.Component {
    state = {
      tasks: []
    };
  

    componentDidMount() {
     fetch('/my-api/get.json')
      .then(response => response.json())
      .then(data => this.setState( {tasks: data}));
    }
  
    handleSubmit = task => {
      //this.setState({tasks: [this.state.tasks, task]});

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'React POST Request Example' })
      };
      fetch('/my-api/post.json', requestOptions);
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
  
    render() {
      return(
        <div className='wrapper'>
          <div className='card frame'>
            <Header numTodos={this.state.tasks.length} />
            <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
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
      return <Todo content={{...todo}} key={index} id={index} onDelete={props.onDelete} />
    })
    return( 
      <div className='list-wrapper'>
        {todos}
      </div>
    );
  }
  
  const Todo = (props) => {
    
    return(
      <div className='list-item'>
        {props.content.title[0].value}
        {props.content.nid[0].value}
        <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id, props.content.nid[0].value)}}></button>
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