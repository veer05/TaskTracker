import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';


function TaskForm(props) {
  function update(ev) { 
    let tgt = $(ev.target);

    let data = {};
    if (tgt.attr('name') == "completed") {
      data["completed"] = $(tgt).is(':checked') ? 'true' : 'false';
    }
    else {
      data[tgt.attr('name')] = tgt.val();
    }
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    props.dispatch(action);
  }
  function submit(ev) {
    
    if (props.form.title == "") {
       alert('Task Title Cannot be empty')
    }
    else if (props.form.assigned_to == ""){
     alert('You need to assign task to someone, Cannot be blank')
    }
    else if (props.form.description == ""){
      alert('Task Description Cannot be null')
    }
    else if (props.form.time_taken % 15 != 0 || props.form.time_taken == ""){
      
      alert('Time Taken Should be in multiple of 15 min, Please provide valid data')
    } 
    else{
      api.submit_task(props.form);
    }
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_FORM',
    });
  }


  let users = _.map(props.users, (uu) => <option key={uu.id} value={uu.name}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_id">Assigned To</Label>
      <Input type="select" name="assigned_to" value={props.form.assigned_to} onChange={update}>
        <option></option>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Input type="text" name="user_id" value={props.form.user_id} onChange={update}/>
      <Label for="body">Title of Task</Label>
      <Input type="text" name="title" value={props.form.title} onChange={update}/>
      <Label> Task Description </Label>
      <Input type="textarea" name="description" value={props.form.description} onChange={update}/>
      <Label> Time Spent </Label>
      <Input type="number" name="time_taken" min="0" step="15" value={props.form.time_taken} onChange={update}/>
      <Label> Task Completed? </Label>
      <Input type="checkbox" className= "setmargin" name="completed" value={props.form.completed} onChange={update}/>
    </FormGroup>
    <Button onClick={submit} color="primary">Create Task</Button> &nbsp;
    <Button className = "btn btn-info" onClick={clear}>Clear</Button>
  </div>;
}


function state2props(state) {
  return { 
  form: state.form, 
  users: state.users,
  };
}

// Export the result of a curried function call.
export default connect(state2props)(TaskForm);
