import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import './LogicForm.css';
import PropTypes from 'prop-types';

const numberReg =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const schema = yup.object().shape({
  name: yup.string().min(2).max(25).required(),
  number: yup
    .string()
    .matches(
      numberReg,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const LogicForm = ({ addContact }) => {
  const handleSubmit = (values, { resetForm }) => {
    addContact(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off" className="LogicForm__Form">
        <label htmlFor="name" className="LogicForm__name">
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </label>
        <label htmlFor="number" className="LogicForm__number">
          Number
          <Field type="text" name="number" />
          <ErrorMessage name="number" component="div" />
        </label>
        <button type="submit" className="LogicForm__btn">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

LogicForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
