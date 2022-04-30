import React, { useEffect, useState } from "react";
import { TaskModal } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../redux";
import { Table, Form, Row, Col, Badge, Button } from "react-bootstrap";
import { FaEdit, FaTrashAlt, FaPlus, FaFilter } from "react-icons/fa";
import { IconContext } from "react-icons";
import { DatePickerComp } from "../components";
import moment from "moment";

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasksReducer);

  const checkSixDayaHead = (date) => {
    const today = moment();
    const newDate = moment(date, "DD-MM-YYYY");
    if (newDate.diff(today, "days") >= 6) {
      return true;
    } else {
      return false;
    }
  };

  const initialState = {
    showModal: false,
    isEdit: false,
    editValues: {},
  };

  const [values, setValue] = useState(initialState);

  const filterState = {
    name: "",
    status: "",
    startDate: new Date(),
    endDate: new Date(),
  };

  const [filters, setFilter] = useState(filterState);

  useEffect(() => {
    // getTaskFromServer();
  }, []);

  const getTaskFromServer = () => {
    filters.startDate = filters.startDate.toLocaleDateString();
    filters.endDate = filters.endDate.toLocaleDateString();
    dispatch(getTasks(filters));
  };

  const showModalFunc = () => {
    if (!values.showModal) {
      setValue({ ...values, showModal: true });
    } else {
      setValue({ ...initialState });
    }
  };

  const editTask = (id) => {
    let taskValues = tasks.find((task) => task.id === id);
    setValue({
      ...values,
      showModal: true,
      isEdit: true,
      editValues: taskValues,
    });
  };

  const filterName = (e) => {
    setFilter({
      ...filters,
      name: e.target.value,
    });
  };
  const filterStatus = (e) => {
    let index = e.target.selectedIndex;
    setFilter({ ...filters, status: e.target[index].value });
  };
  const filterStartDate = (date) => {
    setFilter({ ...filters, startDate: date });
  };
  const filterEndDate = (date) => {
    setFilter({ ...filters, endDate: date });
  };

  const handleFilter = () => {
    console.log(filters);
  };

  const deleteTask = (id) => {};

  return (
    <>
      <Row>
        {values.showModal && (
          <TaskModal
            showModalFunc={showModalFunc}
            showModal={values.showModal}
            isEdit={values.isEdit}
            editValues={values.editValues}
          />
        )}
        <Col lg={1} className="text-center"></Col>
        <Col lg={10} className="text-center">
          <Row className="mt-2">
            <Col lg={4}>
              <h6>
                Total taks <Badge bg="secondary">{tasks.length}</Badge>
              </h6>
            </Col>
            <Col lg={4}>
              <h6>
                Task Remmining{" "}
                <Badge bg="secondary">
                  {tasks.filter((task) => task.status !== "completed").length}
                </Badge>
              </h6>
            </Col>
            <Col lg={4}>
              <h6>
                Task Completed{" "}
                <Badge bg="secondary">
                  {" "}
                  {tasks.filter((task) => task.status === "completed").length}
                </Badge>
              </h6>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={3}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="filterName"
                  onChange={filterName}
                  placeholder="Filter By Name"
                  autoFocus
                />
              </Form.Group>
            </Col>

            <Col lg={3}>
              {" "}
              <Form.Group>
                <Form.Select name="filter-select" onChange={filterStatus}>
                  <option>Filter By Status:</option>
                  <option value="not started">Not Started</option>
                  <option value="in progress">In Progress</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col lg={3}>
              {" "}
              <Form.Group>
                <DatePickerComp
                  label=""
                  handleTime={filterStartDate}
                  date={filters.startDate}
                />
              </Form.Group>
            </Col>
            <Col lg={3}>
              {" "}
              <Form.Group>
                <DatePickerComp
                  label=""
                  handleTime={filterEndDate}
                  date={filters.endDate}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={10}></Col>
            <Col className="d-flex justify-content-end" lg={2}>
              {" "}
              <Button
                variant="primary"
                className="d-flex"
                onClick={handleFilter}
              >
                Filter{" "}
                <IconContext.Provider
                  value={{
                    className: "ms-2",
                  }}
                >
                  <div>
                    <FaFilter />
                  </div>
                </IconContext.Provider>{" "}
              </Button>{" "}
            </Col>
          </Row>

          <Row className="mt-3">
            <Table striped bordered hover>
              <thead className="text-center">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th className="d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="d-flex"
                      onClick={showModalFunc}
                    >
                      Create New Task{" "}
                      <IconContext.Provider
                        value={{
                          className: "ms-2",
                        }}
                      >
                        <div>
                          <FaPlus />
                        </div>
                      </IconContext.Provider>{" "}
                    </Button>{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.length ? (
                  <>
                    {tasks.map((task, i) => {
                      return (
                        <tr className="text-center" key={task.id}>
                          <td>{i + 1}</td>
                          <td>
                            {task.name[0].toUpperCase() +
                              task.name.substring(1)}
                          </td>
                          <td>{task.date}</td>
                          <td>
                            {task.status[0].toUpperCase() +
                              task.status.substring(1)}
                          </td>
                          <td>
                            <div className="d-flex justify-content-center">
                              <div
                                onClick={() => {
                                  editTask(task.id);
                                }}
                              >
                                <IconContext.Provider
                                  value={{
                                    color: "blue",
                                    className: "withPointer",
                                  }}
                                >
                                  <div>
                                    <FaEdit />
                                  </div>
                                </IconContext.Provider>
                              </div>
                              <div>
                                {checkSixDayaHead(task.date) && (
                                  <div
                                    onClick={() => {
                                      deleteTask(task.id);
                                    }}
                                  >
                                    <IconContext.Provider
                                      value={{
                                        color: "red",
                                        className: "ms-2 withPointer",
                                      }}
                                    >
                                      <div>
                                        <FaTrashAlt />
                                      </div>
                                    </IconContext.Provider>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : isLoading ? (
                  <>
                    <tr className="text-center">
                      <td></td>
                      <td>Please wait...</td>
                      <td></td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="text-center">
                      <td></td>
                      <td>No Data To Display</td>
                      <td></td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
          </Row>
        </Col>
        <Col lg={1} className="text-center"></Col>
      </Row>
    </>
  );
};

export default Tasks;
