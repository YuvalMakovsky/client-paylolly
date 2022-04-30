import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { DatePickerComp } from "../components";
import { useDispatch } from "react-redux";
import { createTask } from "../redux";

const TaskModal = ({ showModalFunc, showModal, isEdit, editValues }) => {
  const [show, setShow] = useState(showModal);
  const dispatch = useDispatch();

  const initialTask = {
    name: isEdit ? editValues.name : "",
    status: isEdit ? editValues.status : "",
    date: new Date(),
    id: isEdit ? editValues.id : "",
  };

  const [task, setTask] = useState(initialTask);

  const renderTitle = () => {
    if (isEdit) {
      return <Modal.Title>Edit {editValues.name}</Modal.Title>;
    } else {
      return <Modal.Title>Create Task</Modal.Title>;
    }
  };

  const handleName = (e) => {
    setTask({ ...task, name: e.target.value });
  };

  const handleStatus = (e) => {
    let index = e.target.selectedIndex;
    setTask({ ...task, status: e.target[index].value });
  };

  const handleTime = (date) => {
    setTask({ ...task, date: date });
  };

  const handleSubmit = () => {
    if (!task.name || !task.status || !task.date) {
      return;
    }
    dispatch(createTask(task));
    showModalFunc();
  };

  return (
    <>
      <Modal show={show} onHide={showModalFunc}>
        <Modal.Header closeButton>{renderTitle()}</Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={task.name}
                placeholder="Enter Task Name:"
                autoFocus
                onChange={handleName}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status:</Form.Label>
              <Form.Select
                defaultValue={isEdit ? task.status : ""}
                onChange={handleStatus}
                name="status-select"
              >
                <option>Select Status:</option>
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <DatePickerComp
                label="Due Date"
                handleTime={handleTime}
                date={task.date}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showModalFunc}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskModal;
