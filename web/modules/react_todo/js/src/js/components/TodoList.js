import React from "react";
import Todo from "./Todo";


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

  export default TodoList;