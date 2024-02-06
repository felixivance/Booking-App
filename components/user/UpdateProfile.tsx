"use client"
import { useLazyUpdateSessionQuery, useUpdateProfileMutation } from '@/redux/api/userApi';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ButtonLoader from '../layout/ButtonLoader';

function UpdateProfile() {

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ _id, setId ] = useState("");

    const { user: currentUser } = useAppSelector((state)=>state.auth)

    console.log(currentUser);

    const [ updateProfile, { isLoading, error, isSuccess } ] = useUpdateProfileMutation();

    const [ updateSession, { data }] = useLazyUpdateSessionQuery();

    console.log(data);

    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
          //@ts-ignore 
          setName(currentUser?.name);
          //@ts-ignore
          setEmail(currentUser?.email); 
          //@ts-ignore
          setId(currentUser?._id);

        }

        if(error && 'data' in error){
            toast.error(error?.data?.message)
        }

        if(isSuccess){
            updateSession({ userId: _id })
            router.refresh() // refresh the route
        }
      },[currentUser, error, isSuccess]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      const userData = { name, email , _id};

      updateProfile(userData);
    }
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Update Profile</h2>

          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
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
            { isLoading ? <ButtonLoader></ButtonLoader> : "Update"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile