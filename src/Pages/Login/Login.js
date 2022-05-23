import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useEffect, useRef } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loader from '../../Shared/Loader/Loader';
import './Login.css'
import SocialLogin from './SocialLogin';
import toast from 'react-hot-toast';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    let from = location.state?.from?.pathname || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await signInWithEmailAndPassword(email, password);

        //clear field
        emailRef.current.value = '';
        passwordRef.current.value = '';
    }

    useEffect(() => {
       if (user) {
           navigate(from, {
               replace: true
           });
       }
   }, [from, navigate, user])

    if(loading) {
       return <Loader></Loader>
    }

    let errorMessage;
    if (error) {
      errorMessage = <p>Error: {error?.message}</p>
    }

    const handleSignUp = () => {
        navigate('/signup');
    }

     //Reset Password
    const handlePasswordReset = async () => {
        const email = emailRef.current.value;
        if(email){
            await sendPasswordResetEmail(email);
            toast('Email Sent');
        }
        else{
            toast('Please Provide your Email Address')
        }
    }

    return (
       <div className='contentWrapper'>
            <div className='formWrapper'>
        <div className='containerForm logIn'>
            <form onSubmit={handleLogin} action="#">
                <h2 className='title text-center text-2xl mb-2 font-base text-neutral'>Log In</h2>
                <input ref={emailRef} type="email" className='input' placeholder='Email' />
                <input ref={passwordRef} type="password" className='input' placeholder='Password' />
                <p className='text-center mt-2'>Forgot Password? <button onClick={handlePasswordReset} className='btn btn-link '>Reset Password</button></p>
                <button className='button block mx-auto'>Log In</button>
                <p className='text-center mt-2'>Don't have an account? <Link to="/signup" onClick={handleSignUp} className='btn btn-link'>Sign Up</Link></p>
            </form>
            <SocialLogin></SocialLogin>
            <p className='text-red-500 text-center'>{errorMessage}</p>
        </div>
        </div>
       </div>
    );
};

export default Login;