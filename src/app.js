import React from 'react';
import SignContext from './components/contexts/auth'
import CompletedSignin from './components/signin'
import ACL from './components/acl';
import Header from './components/todo/header.jsx';

import IncompleteTasks from './components/contexts/tasks-context.provider'
import ToDo from './components/todo/todo-connected.js';

export default class App extends React.Component {
  render() {
    return (
      <IncompleteTasks>
        <SignContext>
        <CompletedSignin />
        <Header/>
        <ACL capability="read">
        <ToDo />
        </ACL>
        </SignContext>
        </IncompleteTasks>
    );
  }
}
