import React, { useEffect, useState} from 'react';
import If from './if';
import { Button } from 'react-bootstrap';

function TodoList(props) {
  const [flag, setFlag] = useState()
   function handler(e, id) {
     e.preventDefault()
    let value = document.getElementById(id).value;
    props.handleEdit(id,value)
    setFlag(!flag)
   }  
  return (

      <ul>
        {props.list? props.list.map(item => (
          <li
         
          key={item._id}
            className={`complete-${item.complete.toString()}`}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              <br/>
              Name: {item.text} <br></br>
             Assignee: {item.assignee}<br></br>
             Difficulty: {item.difficulty}
            </span>
            <Button id="deletebutton" variant="danger" className="btn-sm"  onClick={() =>  props.handleDelete(item._id)}>X</Button>
            <form onSubmit={(e)=>handler(e,item._id)}>
            <Button type='button' onClick={() =>setFlag(!flag)}>Edit</Button>
            <If condition={!flag}>
              <Button variant="success" type='submit'>
              submit
              </Button>
            <textarea id={item._id} required></textarea>
            </If>
            </form>
          </li>
        )): null}
      </ul>
    
  );
}

export default TodoList;
