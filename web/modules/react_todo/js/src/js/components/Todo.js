import React from "react";

function CompletedTask(props) {
  return (
    <div className="list-item items">
        <div  className=" checkbox checkbox-is-checked" onClick={() => {props.onMarkComplete(props.id, props.content.nid[0].value)}}></div>
        <div className="todo-is-completed">{props.content.title[0].value}</div>
        <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id, props.content.nid[0].value)}}></button>
    </div>
  )
}

function NotCompetedTask(props) {
  return(
    <div className="list-item items">
      <div  className=" checkbox" onClick={() => {props.onMarkComplete(props.id, props.content.nid[0].value)}}></div>
        {props.content.title[0].value}
      <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id, props.content.nid[0].value)}}></button>
    </div>
  );
}


const Todo = (props) => {

     let isCompleted = props.content.body[0].value;
  
    return(
      <div>
        { isCompleted ? 
          <CompletedTask content={props.content} onMarkComplete={props.onMarkComplete} onDelete={props.onDelete} id={props.id}/> :  
          <NotCompetedTask content={props.content} onMarkComplete={props.onMarkComplete} onDelete={props.onDelete} id={props.id}/> }
      </div>
    );
  }

  export default Todo;