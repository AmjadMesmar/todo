import React, { useEffect, useState} from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';

import './todo.scss';

function ToDo(){
  const [list, setList] = useState([])

  let addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item])
  };

  let toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let list2 = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(list2);
    }

    
  };
  let deleteHandler = id => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
     let id = list.indexOf(item)
     let newList = [...list]
      newList.splice(id, 1);
      setList(newList);
    }
  }
  let editHandler = (id,value) => {
    
    
  let item = list.filter(i => i._id === id)[0] || {};

  if (item._id) {
    item.text = value;
    let list2 = list.map(listItem => listItem._id === item._id ? item : listItem);
    setList(list2);
  
    }
  }
  useEffect(() => {
    let list = [
      { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A'},
      { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'},
      { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
      { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C'},
      { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'},
    ];
    setList(list)
  },[])

  return (
    <>
        <h2>
        There are {list? list.filter(item => !item.complete).length: 0} Items To Complete
        </h2>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDelete={deleteHandler}
            handleEdit={editHandler}
          />
        </div>
      </section>
    </>
  );
}
export default ToDo;
