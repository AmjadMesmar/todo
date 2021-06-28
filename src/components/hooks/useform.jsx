import { useState } from 'react'; 


const useForm = (props) => {
  const [task, setTask] = useState( {} );

  
  let changeHandler = (e) => {
    setTask({...task, [e.target.name]: e.target.value }) 
  };
  let submitHandler = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(task);
    const item = {};
   setTask({item})
  };
   return [changeHandler, submitHandler, task];
}

export default useForm;