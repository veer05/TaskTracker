import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }


  function create_token(ev) {
    api.submit_login(props.login);
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
    </Form>
  </div>;
  });


  let Session = connect(({token}) => {return {token};})((props) => {
  return <div className="navbar-text">
    User name = { props.token.user_name }
  </div>;
  });
  
  function Nav(props) {
  let session_info;
  let action_info;
  let tasks_info;
  let logout;
  if (props.token) {
    session_info = <Session token={props.token} />;
    action_info = <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>;
    tasks_info = <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Tasks</NavLink>;
  }
  else {
    session_info = <LoginForm />
    action_info = (<NavLink to="/register" href="#" className="nav-link">Register</NavLink>);
  }


  return (
     <nav className="navbar navbar-dark bg-dark navbar-expand">
       <span className="navbar-brand">
                  Task Tracker
      </span>
      <ul className="navbar-nav mr-auto">
      <NavItem>
          { tasks_info }
      </NavItem>
      <NavItem>
           { action_info }
      </NavItem>
       </ul>
       { logout }
      { session_info }
     </nav>
   );
 }


function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);