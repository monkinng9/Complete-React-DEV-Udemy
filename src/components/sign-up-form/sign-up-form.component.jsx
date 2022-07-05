import { useState } from 'react';

import FormInput from '../../components/form-input/form-input.component';
import Button from '../../components/button/button.component';
import './sign-up-form.styles.scss';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(password)
    console.log(confirmPassword)
    if (password !== confirmPassword) {
      alert(`Password do not match`);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      await createUserDocumentFromAuth(user, { displayName });
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        alert(`Email already in user`)
      } else {
        console.log(error)
      }
      console.log('User creation encountered an error', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label='Display Name' type="text" required onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label='Email' type='email' required onChange={handleChange} name="email" value={email} />

        <FormInput label='Password' type='password' required onChange={handleChange} name="password" value={password} />

        <FormInput label='Confirm Password' required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

        <Button buttonType='google' type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm;