import React, {useContext} from 'react';
import './contexts/paging.scss'
import {CompletedTasks} from './contexts/tasks-context.provider';



const ToDoPagination = (props) =>{

    const context = useContext(CompletedTasks);    

    return(
      
      
  <>
  
  <ul className="renderPageNumber">
              <li>
                  <button  onClick={ context.PagingState.handlePrevPage} disabled={context.PagingState.currentPage===context.PagingState.pages[0] ? true : false}>Prev</button>
              </li>

              {context.PagingState.renderPageNumber}

              <li>
                  <button onClick={context.PagingState.handleNextPage} disabled={context.PagingState.currentPage===context.PagingState.pages[context.PagingState.pages.length-1]  ? true : false}>Next</button>
              </li>
           
              
              
            </ul>
            <form onSubmit={context.PagingState.handlerLimitPerPage}>
                <label> # of items per page</label>
            <input type="number" name="number" id="number"></input>

            <select defaultValue="sort" onChange={context.PagingState.DifficultySortHandler}>
                <option  value="default"> sort </option>
                <option  value="Descending"> Difficulty: Descending </option>
                <option  value="Ascending"> Difficulty: Ascending  </option>
            </select>
            </form>
  </>



             
        

         
           
 
            
      
    )
}

export default ToDoPagination;





