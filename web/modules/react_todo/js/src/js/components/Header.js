import React from "react";


const Header = (props) => {
  
    return(
      <div className='card-header'>
        <h1 className='card-header-title header'>
          {props.numTodos} Todos
        </h1>
      </div>
    )
  }

  export default Header;