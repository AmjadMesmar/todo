import React from 'react';
import Pagination from "react-js-pagination";
 
import Header from './components/todo/header.jsx';

import IncompleteTasks from './components/contexts/tasks-context.provider'
import ToDo from './components/todo/todo-connected.js';
// require("bootstrap/less/bootstrap.less");

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 15
    };
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
  render() {
    return (
      <IncompleteTasks>
        <Header/>
        <ToDo />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange.bind(this)}
        />
        </IncompleteTasks>
    );
  }
}
