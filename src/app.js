import React from 'react';
import Header from './components/todo/header.jsx';

import IncompleteTasks from './components/contexts/tasks-context.provider'
import ToDo from './components/todo/todo-connected.js';

export default class App extends React.Component {
  render() {
    return (
      <IncompleteTasks>
        <Header/>
        <ToDo />
        </IncompleteTasks>
    );
  }
}
