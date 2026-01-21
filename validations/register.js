const yup = require('yup');

let registerSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters long'),
  email: yup.string().required('Email is required').email('Email must be a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
  age: yup.number().required('Age is required').min(0, 'Age must be a positive number')
});

module.exports = registerSchema;
