import React from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification,  useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../../Pages/Login/Login.css'
import Loader from '../../Shared/Loader/Loader'
import toast from 'react-hot-toast';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, {
        sendEmailVerification: true,
    }); 

    //update profile
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

     //Email verification
    const [sendEmailVerification] = useSendEmailVerification(auth);

    let errorMessage;
    if(error || updateError){
        errorMessage =  <p className='text-red-500'>Error: {error?.message} || {updateError?.message}</p>
    }

    if(user) {
        navigate('/');
    }

    if(loading || updating) {
        return <Loader></Loader>
    }

    const onSubmit = async data => {
        //   console.log('data', data)
            await createUserWithEmailAndPassword(data.email, data.password);

            //Update profile
            await updateProfile({
                displayName: data.name
            });
            toast('Updated profile');
      }

    return (
        <div className='contentWrapper'>
           <div className='formWrapper'>
            <div className='containerForm logIn'>
                {/* <form action="#">
                    <h2 className='title text-center text-2xl mb-2 font-base text-neutral'>Sign Up</h2>
                    <input type="text" className='input' placeholder='User' />
                    <input type="email" className='input' placeholder='Email' />
                    <input type="password" className='input' placeholder='Password' />
                    <p className='text-center mt-2'>Forgot Password? <button className='btn btn-link '>Reset Password</button></p>
                    <button className='button block mx-auto'>Sign Up</button>
                    <p className='text-center mt-2'>Already have an account? <Link to="/login" className='btn btn-link'>Log In</Link></p>
                </form> */}
                <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                 <p className='text-center mt-2'>Already have an account? <Link to="/login" className='btn btn-link'>Log In</Link></p>
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <input className='btn w-full max-w-xs text-white' type="submit" value="SIGN UP" />
                        <p className='text-red-500 text-center'>{errorMessage}</p>
                    </form>
            </div>
        </div>
       </div>
    );
};

export default SignUp;