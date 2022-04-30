import { Field, ErrorMessage } from "formik";

const FormRow = ({ labelText, name, type }) => {
  return (
    <div className="form-group mt-2">
      <label htmlFor={name}>{labelText}</label>
      <Field type={type} name={name} className="form-control" />
      <ErrorMessage name={name} component="span" className="text-danger" />
    </div>
  );
};
export default FormRow;
