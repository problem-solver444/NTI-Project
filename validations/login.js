const yup = require('yup');

const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
});

module.exports = loginSchema;
