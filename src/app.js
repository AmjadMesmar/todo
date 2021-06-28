import React from 'react';
import Header from './components/todo/header.jsx';

import ToDo from './components/todo/todo.js';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header/>
        <ToDo />
      </React.Fragment>
    );
  }
}
