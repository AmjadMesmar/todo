import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../hooks/useajax'
import './todo.scss';



const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = () => {

  const [ _addItem, _toggleComplete, _getTodoItems,handleDelete,handleEdit,list] =  useAjax(todoAPI)

  // const [list, setList] = useState([]);

  //  const _addItem = async (item) => {
  //   item.due = new Date();
  //     axios({
  //       method: 'post',
  //       url: todoAPI,
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       headers: { 'Content-Type': 'application/json' },
  //       data: JSON.stringify(item),
  //     })
  //     .then(savedItem => {
  //       setList([...list, savedItem.data])
  //     }).catch(console.error);

  // };

  // const _toggleComplete = id => {

  //   let item = list.filter(i => i._id === id)[0] || {};

  //   if (item._id) {

  //     item.complete = !item.complete;

  //     let putUrl = `${todoAPI}/${id}`;

  //     axios({
  //       method: 'put',
  //       url: putUrl,
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       headers: { 'Content-Type': 'application/json' },
  //       data: JSON.stringify(item),
  //     })
  //       .then(savedItem => {
  //         setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
  //       })
  //       .catch(console.error);
  //   }
  // };

  // const _getTodoItems = () => {
  //   axios({
  //     method:'get',
  //     url:todoAPI})  
  //     .then(data => {
  //     setList (data.data.results);
  //     })
  //     .catch(console.error);
  // };

  // const handleDelete = id =>{
  //   let item = list.filter(i => i._id === id)[0] || {};
  //   if (item._id) {
  //     let deleteUrl = `${todoAPI}/${id}`;
  //     axios({
  //       method: 'delete',
  //       url: deleteUrl,
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       headers: { 'Content-Type': 'application/json' },
  //       data: JSON.stringify(item),
  //     })
  //       .then(() => {
  //       let id = list.indexOf(item)
  //        let newList = [...list]
  //        newList.splice(id, 1);
  //         setList(newList);
  //       })
  //       .catch(console.error);
  //   }
  // }
  // const handleEdit = (id,value) => {
  //   let item = list.filter(i => i._id === id)[0] || {};
  //   if (item._id) {
  //     item.text = value;
  //     let putUrl = `${todoAPI}/${id}`;
  //     axios({
  //       method: 'put',
  //       url: putUrl,
  //       mode: 'cors',
  //       cache: 'no-cache',
  //       headers: { 'Content-Type': 'application/json' },
  //       data: JSON.stringify(item),
  //     })
  //       .then(savedItem => {
  //         setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
  //       })
  //       .catch(console.error);
  //   }
  // }


  return (
    <>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>

      <section className="todo">

        <div>
          <TodoForm handleSubmit={_addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={_toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
      </section>
    </>
  );
};

export default ToDo;
