"use client";

import { useForgotPasswordMutation } from '@/redux/api/authApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ButtonLoader from '../layout/ButtonLoader';

const ForgotPasswordComponent = () => {
    const [ email, setEmail] = useState('');
    const [ forgotPassword, { isLoading, error, isSuccess}] = useForgotPasswordMutation();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = { email };
        forgotPassword(userData);
    }

    useEffect(()=>{
        if(error && "data" in error){
            toast.error(error.data?.errMessage);
        }

        if(isSuccess){
            toast.success('Email sent successfully. Please check your email.');
        }
    },[isSuccess, error]);

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          action="/submit-forgot-password"
          method="POST"
        >
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mb-3">
            <label html-for="email_field" className="form-label"> Enter Email </label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn form-btn w-100 py-2" disabled={isLoading}>
            {
                isLoading ? <ButtonLoader></ButtonLoader> : 'Send Email'
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordComponent