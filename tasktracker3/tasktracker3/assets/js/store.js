import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';


function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'ADD_TASK':
    return [action.task, ...state];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  default:
    return state;
  }
}

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }	
}

let empty_login = {
  email: "",
  pass: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_form = {
  user_id: "",
  assigned_to: "",
  title: "",
  description: "",
  time_taken: "",
  completed: "",
  token: "",
};

function selective_clear(state) {
	let clear_state = {
	user_id: state.user_id,
	assigned_to: "",
	title: "",
	description: "",
	time_taken: "",
	completed: "",
	token: state.token,}
	return clear_state;
}

function register_state(){
	let reg_state = {
		name: "",
		email: "",
		password: "",
	}
	return reg_state;
}

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      console.log('Inside update form ',state)
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
	    return Object.assign({}, selective_clear(state), action.data);
	case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    case 'LOGOFF':    	
    	return empty_form; 
    default:
      console.log('Inside default form ',state)
      return state;
  }
}

function root_reducer(state0, action) {
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  /*if (action.type == 'UPDATE_LOGIN_FORM') {
  		let reducer = combineReducers({users})
  }
  else{*/
  		let reducer = combineReducers({tasks, users, form, token, login});
  //}
  let state1 = reducer(state0, action);
  //console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;