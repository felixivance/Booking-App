'use client';

import { useLazyUpdateSessionQuery, useUploadAvatarMutation } from '@/redux/api/userApi';
import { setUser } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ButtonLoader from '../layout/ButtonLoader';

const UpdateAvatar = () => {

    const dispatch  = useAppDispatch();

    const router = useRouter();

    const [ avatar, setAvatar ] = useState("");
    const [ avatarPreview, setAvatarPreview ] = useState("/images/default_avatar.jpg");
    const [ uploadAvatar, {isLoading, error, isSuccess} ] = useUploadAvatarMutation();
    const [ updateSession, { data }] = useLazyUpdateSessionQuery();

    if(data) dispatch(setUser(data?.user));

    const { user } = useAppSelector((state)=>state.auth)

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = {avatar}

        uploadAvatar(userData);
    }

    useEffect(() => {
        //@ts-ignore
        if(user?.avatar){
            //@ts-ignore
            setAvatarPreview(user?.avatar?.url);
        }
        if(error && 'data' in error){
            console.log(error?.data?.errMessage)
            toast.error(error?.data?.errMessage)
        }

        if(isSuccess){
            //@ts-ignore
            updateSession();
            router.refresh();
        }
    },[user,error,isSuccess]);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        const reader = new FileReader();

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatar(reader.result as string);
                setAvatarPreview(reader.result as string);
            }
        }

        reader.readAsDataURL(files[0]);
      };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-8">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Upload Avatar</h2>

          <div className="form-group">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <figure className="avatar item-rtl">
                  <img src={avatarPreview} className="rounded-circle" alt="image" />
                </figure>
              </div>
              <div className="input-foam">
                <label className="form-label" html-for="customFile">
                  Choose Avatar
                </label>
                <input
                  type="file"
                  name="avatar"
                  className="form-control"
                  id="customFile"
                  accept="images/*"
                  onChange={onImageChange}
                />
              </div>
            </div>
          </div>

          <button type="submit" className="btn form-btn w-100 py-2"
          disabled={isLoading}>
            {
                isLoading ? <ButtonLoader></ButtonLoader> : "Upload"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateAvatar