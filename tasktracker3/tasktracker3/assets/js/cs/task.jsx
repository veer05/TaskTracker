import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import TaskForm from './task-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import api from '../api';
import store from '../store';

export default function Task(props) {

  function delete_task(){
      api.delete_tasks(props.task.id)
  }

  function edit_task() {
    api.delete_tasks(props.task.id)
    let data = {
      assigned_to: props.task.assigned_to,
      title: props.task.title,
      description: props.task.description,
      time_taken: props.task.time_taken,
      completed: props.task.completed,
      user_id:  props.curr_user.user_id,
    }

    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    store.dispatch(action);
  }

  let task = props.task;
  return  (<div className="card bg-light border-dark dispcard">
      <div className="card-body">
      <table className="table">
          <tr><td>Task Assigned by :</td><td> { task.user.name } </td></tr>
          <tr><td>Task Assigned to :</td><td>{ task.assigned_to } </td></tr>
          <tr><td>Task Title       :</td><td>{ task.title } </td></tr>
          <tr><td>Task Description :</td><td>{ task.description } </td></tr>
          <tr><td>Task Completed?  :</td><td>{ task.completed ? "completed":"not completed" } </td></tr>
          <tr><td>Time Spent       :</td><td>{ task.time_taken } </td></tr>

          <tr className="text-right"><td></td><td>
            <Button className= "btn btn-info"onClick={edit_task}> Edit </Button>
            <Button className="btn btn-danger" onClick={delete_task}> Delete </Button>
          </td></tr>
        </table>
        </div>
      </div>);
}


