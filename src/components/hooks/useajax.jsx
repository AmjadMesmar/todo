import { useEffect,useState } from 'react'; 
import axios from 'axios';


const useAjax = (apiUrl) => {

    const [list, setList] = useState([]);


   const _addItem = async (item) => {
    item.due = new Date();
      axios({
        method: 'post',
        url: apiUrl,
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(item),
      })
      .then(savedItem => {
        setList([...list, savedItem.data])
      }).catch(console.error);

  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let putUrl = `${apiUrl}/${id}`;

      axios({
        method: 'put',
        url: putUrl,
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(item),
      })
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    axios({
      method:'get',
      url:apiUrl})  
      .then(data => {
      setList (data.data.results);
      })
      .catch(console.error);
  };

  const handleDelete = id =>{
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      let deleteUrl = `${apiUrl}/${id}`;
      axios({
        method: 'delete',
        url: deleteUrl,
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(item),
      })
        .then(() => {
        let id = list.indexOf(item)
         let newList = [...list]
         newList.splice(id, 1);
          setList(newList);
        })
        .catch(console.error);
    }
  }
  const handleEdit = (id,value) => {
    let item = list.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.text = value;
      let putUrl = `${apiUrl}/${id}`;
      axios({
        method: 'put',
        url: putUrl,
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(item),
      })
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem.data : listItem));
        })
        .catch(console.error);
    }
  }
  useEffect(_getTodoItems, [apiUrl]);

   return [ _addItem, _toggleComplete, _getTodoItems,handleDelete,handleEdit, list];
}

export default useAjax;