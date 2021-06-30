import React, { useEffect, useState } from 'react';
import useAjax from '../hooks/useajax';


const todoAPI = "https://api-js401.herokuapp.com/api/v1/todo";

export const CompletedTasks = React.createContext();

const IncompleteTasks = (props) =>{
    let [handleRequest] = useAjax();
    let  toggleMode = () => {
        setToggle( state.checked === false ? true : false )
     };
     const [data, setData] = useState([]);
     const [toggle, setToggle] = useState(false)
    

    let state = {
        checked: toggle, 
        data: data,
        toggle: toggleMode
    }

    useEffect( ()=>{
        (async ()=> {
            
            let results = await handleRequest(todoAPI, 'get')
            let list = results.data.results.filter(val => val.complete === false);
            if(state.checked === false){
                setData(list)
                
            } else if(state.checked === true) {
            results = await handleRequest(todoAPI, 'get')
            list = results.data.results.filter(val => val.complete === true);
            setData(list)}
        })();
}, [state.checked])
 
    return(
        <CompletedTasks.Provider value={state}>
           
           {props.children}
        </CompletedTasks.Provider>
    )
}

export default IncompleteTasks;




