import React, {useState,useContext} from 'react';
import If from './if';
import ACL from '../acl';
import {SigninContext} from '../contexts/auth'
import { Button } from 'react-bootstrap';

function TodoList(props) {

  const context = useContext(SigninContext)

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
         <ACL capability="update">

            <span onClick={() => props.handleComplete(item._id)}>
              <br/>
              Name: {item.text} <br></br>
             Assignee: {item.assignee}<br></br>
             Difficulty: {item.difficulty}
            </span>
            </ACL>
            <If condition={ !context.user.capabilities.includes('create') && !context.user.capabilities.includes('update') }>

            <span >
             Item : {item.text}  <br></br>
              Assignee: {item.assignee}  <br></br>
               Difficulty: {item.difficulty}  <br></br>
            </span>
            </If>


            <ACL capability="delete"> 
            <Button id="deletebutton" variant="danger" className="btn-sm"  onClick={() =>  props.handleDelete(item._id)}>X</Button>
            </ACL>
            <ACL capability="update"> 
            <form onSubmit={(e)=>handler(e,item._id)}>
            <Button type='button' onClick={() =>setFlag(!flag)}>Edit</Button>
            <If condition={!flag}>
              <Button variant="success" type='submit'>
              submit
              </Button>
            <textarea id={item._id} required></textarea>
            </If>
            </form>
            </ACL>
          </li>
        )): null}
      </ul>
    
  );
}

export default TodoList;
