import axios from "axios";

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

export const tasksInitialState = {
  isLoading: false,
  error: "",
  tasks: [],
};

export const getTasks = (filters) => {
  return async (dispatch) => {
    dispatch({ type: GET_TASKS_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        data: filters,
        url: "http://localhost:8000/api/v1/getTasks",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        dispatch({ type: GET_TASKS_SUCCESS, payload: data.data.tasks });
      } else {
        dispatch({ type: GET_TASKS_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const createTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TASKS_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        data: task,
        url: "http://localhost:8000/api/v1/createTask",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        dispatch({ type: CREATE_TASKS_SUCCESS, payload: data.data.tasks });
      } else {
        dispatch({ type: CREATE_TASKS_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const updateTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TASKS_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        data: task,
        url: "http://localhost:8000/api/v1/updateTask",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        dispatch({ type: UPDATE_TASKS_SUCCESS, payload: data.data.tasks });
      } else {
        dispatch({ type: UPDATE_TASKS_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const deleteTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TASKS_BEGIN });
    try {
      const { data } = await axios({
        method: "post",
        data: task,
        url: "http://localhost:8000/api/v1/deleteTask",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        dispatch({ type: DELETE_TASKS_SUCCESS, payload: data.data.tasks });
      } else {
        dispatch({ type: DELETE_TASKS_ERROR, payload: data.message });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
