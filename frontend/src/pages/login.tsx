import { Button, CircularProgress } from "@mui/material";
import { lightBlue } from '@mui/material/colors';
import React, { FormEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import logo from '../assets/Logo.svg';
import loginBg1 from '../assets/login-bg-1.svg';
import Input from "../components/Input";
import { AuthState } from "../app/store";
import { login, reset } from '../auth/authSlice';

type formType = {
  email: string;
  password: string;
}

const Login: React.FC = function () {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state: AuthState) => state.auth);
  const [formData, setFormData] = useState<formType>({email: '', password: ''});
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateEmail = (emailAddress: string): boolean => {
    const regex = /^[a-zA-Z0-9._]{3,}@[a-zA-Z0-9]{2,}\.[a-zA-Z]{2,}$/;

    if (!emailAddress || !regex.test(emailAddress)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  }

  const checkPasswordLength = (password: string): boolean => {
    if(!password) {
      setPasswordError(true);
      return false;
    } else if(password.length <= 5) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
      return true;
    }
  }

  const handleForm = (event: any) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: String(value).trim()});
  }

  const handleFormSubmission: FormEventHandler = async (event) => {
    event.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = checkPasswordLength(formData.password);

    if (isEmailValid && isPasswordValid) {
      const response = await dispatch(login(formData));
    }
  }

  useEffect(() => {
    if(user) {
      navigator('/');
    }
  }, [user]);

  useEffect(() => {
    if(message) {
      setErrorMessage(message);
    }
    console.log(user);
    dispatch(reset());
  }, [user, message, isError, isSuccess, navigator, dispatch]);

  return (
    // The entire login page along with background image.
    <section
      className="flex flex-col justify-center items-center w-full h-full pt-6"
      style={{
        backgroundImage: `url(${loginBg1})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPositionY: '-22%',
        backgroundAttachment: 'fixed',
      }}
    >

      <div>
        <img src={`${logo}`} alt="brand logo" />
      </div>
      <p className="text-gray-100 text-base py-6">Online Project Management</p>
      <form
      onSubmit={handleFormSubmission}
      >
        {/* Login field card. */}
        <div className='flex flex-col items-center gap-5 w-[26rem] p-10 rounded-lg shadow-lg bg-white'>
          <p className="text-xl py-3 text-center">Login to get started</p>
          <div className="flex flex-col gap-2 w-full">
            <Input
              type='text'
              label='email'
              name="email"
              value={formData.email}
              onChange={handleForm}
              error={emailError}
            />

            <Input
              type='password'
              label='password'
              name="password"
              value={formData.password}
              onChange={handleForm}
              error={passwordError}
            />
          </div>
          <div className="relative">
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: lightBlue[900] }}
            disabled={isLoading}
            className="py-[0.35rem] px-[4.5rem] mt-4 text-center text-gray-100 font-thin rounded-full shadow-none hover:shadow-none"
          >
            Login
          </Button>
          {isLoading && (
          <CircularProgress
            size={24}
            className="absolute top-[23px] right-3 text-cyan-600 -translate-x-1/2"
          />
        )}
          </div>
        </div>
      </form>
      {/* This message should appear when provided information is not there inside the records */}
      {errorMessage && <p className="text-sm text-red-500 mt-5">{errorMessage}</p>}
    </section>

  );
}


export default Login;