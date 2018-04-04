import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';
import { Link } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom';
function RegisterForm(props) {
  function update(ev) { 
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    props.dispatch(action);
  }
  
  //attribution = https://stackoverflow.com/questions/16424659check-if-a-string-contains-an-email-address
  function checkIfEmailInString(text) { 
    var re = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    return re.test(text);
  }
  
  function submit(ev) {
  	if (props.form.name == undefined){
  		alert('Name cannot be balnk, Please enter name')
  	}
  	else if (props.form.password == undefined || props.form.password.length < 8){
  		alert('Please enter atleast 8 digits for password')
  	}
  	else if (props.form.email == undefined || !checkIfEmailInString(props.form.email)){
  		alert('Please enter a valid email id')
  	}
  	else {
  		api.submit_user(props.form);
    	alert('User Created Successfully')
    	window.location.reload();
  	}
  }



  return <div style={{padding: "4ex"}}>
    <h2>New User Registration</h2>
    <FormGroup>
      <Label for="username">User Name</Label>
      <Input type="text" name="name" value={props.form.name} onChange={update}/>
      <Label> User Email </Label>
      <Input type="email" name="email" value={props.form.email} onChange={update}/>
      <Label> Enter Password </Label>
      <Input type="password" name="password" value={props.form.password} onChange={update}/>
    </FormGroup>
    <Button onClick={submit} color="primary">Create User</Button> &nbsp;
  </div>;
}


function state2props(state) {
  return { 
  form: state.form, 
  users: state.users,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(RegisterForm);
