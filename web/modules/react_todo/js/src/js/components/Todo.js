import React from "react";


const Todo = (props) => {

    // let isCompleted = props.content.body[0].value;
    // let text='';
    // if (isCompleted){
    //   text = 'DONE: ';
    // }
  
    return(
      <div className='list-item items'>
        <label class="checkbox check" onClick={() => {props.onMarkComplete(props.id, props.content.nid[0].value)}}><input type="checkbox" /></label>
        {/* text + props.content.title[0].value */}
        {props.content.title[0].value}
        <button class="delete is-pulled-right" onClick={() => {props.onDelete(props.id, props.content.nid[0].value)}}></button>
      </div>
    );
  }

  export default Todo;