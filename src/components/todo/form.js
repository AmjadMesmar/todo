import React, { useEffect, useState }from 'react';
import useForm from '../hooks/useform'
import { Button } from 'react-bootstrap';


const TodoForm = (props) => {

  const [ changeHandler, submitHandler] =  useForm(props)

  // const [task, setTask] = useState({});
  // let changeHandler = (e) => {
  //   setTask({...task, [e.target.name]: e.target.value }) 
  // };
  // let submitHandler = (e) => {
  //   e.preventDefault();
  //   e.target.reset();
  //   props.handleSubmit(task);
  //   const item = {};
  //  setTask({item})
  // };

  return (
    <>
      <h3>Add Item</h3>
      <form onSubmit={submitHandler}>
        <label>
          <span>To Do Item</span>
          <input
            name="text"
            placeholder="Add To Do List Item"
            onChange={changeHandler}
          />
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={changeHandler} />
        </label>
        <label>
          <span>Assigned To</span>
          <input type="text" name="assignee" placeholder="Assigned To" onChange={changeHandler} />
        </label>
        <Button variant="success" type="submit">Add Item</Button>
      </form>
    </>
  );
}
export default TodoForm;