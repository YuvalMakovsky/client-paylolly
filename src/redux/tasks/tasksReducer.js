import {
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  CREATE_TASKS_BEGIN,
  CREATE_TASKS_SUCCESS,
  CREATE_TASKS_ERROR,
  UPDATE_TASKS_BEGIN,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_ERROR,
  DELETE_TASKS_BEGIN,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
} from "./tasksTypes";

import { tasksInitialState } from "./tasksActions";

const reducer = (state, action) => {
  switch (action.type) {
    case GET_TASKS_BEGIN:
    case CREATE_TASKS_BEGIN:
    case UPDATE_TASKS_BEGIN:
    case DELETE_TASKS_BEGIN:
      return { ...state, isLoading: true };

    case GET_TASKS_SUCCESS:
    case CREATE_TASKS_SUCCESS:
    case UPDATE_TASKS_SUCCESS:
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
      };

    case GET_TASKS_ERROR:
    case CREATE_TASKS_ERROR:
    case UPDATE_TASKS_ERROR:
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      if (!state) {
        return tasksInitialState;
      }
      return state;
  }
};

export default reducer;
