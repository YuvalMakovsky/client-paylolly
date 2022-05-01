import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { Form } from "react-bootstrap";

const DatePickerComp = ({ label, handleTime, date }) => {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <DatePicker
          selected={date}
          onChange={(date) => handleTime(date)}
          className="form-select"
          dateFormat="dd-MM-yyyy"
        />
      </Form.Group>
    </div>
  );
};

export default DatePickerComp;
