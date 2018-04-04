import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import Nav from './nav';
import Feed from './feed';
import Users from './users';
import TaskForm from './task-form';
import Register from './register';

export default function tasktracker_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <TaskTracker state={store.getState()}/>
    </Provider>,
    document.getElementById('root'),
  );
}


let TaskTracker = connect((state) => state)((props) => {
  let logoff = false;
  function logout(){
    window.location.reload()
  }
    if (props.token != null){
    return (
      <Router>
        <div>
          <Nav />
          <div className="btnlft">
           <Button onClick={logout}>Log Out</Button>
        </div>
          <Route path="/" exact={true} render={() => 
            <div>
              <TaskForm />
              <Feed tasks={props.tasks} user={props.token} />
            </div>
          } />
          <Route path="/users" exact={true} render={() =>
            <Users users={props.users} />
          } />
        </div>
        
      </Router>);
    }
    else {
    return (
      <Router>
        <div>
          <Nav />
          <h2> Please Login to view or create task </h2>
          <h2> If you do not have an account, you could register </h2>
          <Route path="/register" component={Register}/>
        </div>
      </Router>);
    }
});
