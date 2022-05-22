import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
    return (
       <div className='contentWrapper'>
            <div className='formWrapper'>
        <div className='containerForm logIn'>
            <form action="#">
                <h2 className='title text-center text-2xl mb-2 font-base text-neutral'>Log In</h2>
                <input type="email" className='input' placeholder='Email' />
                <input type="password" className='input' placeholder='Password' />
                <p className='text-center mt-2'>Forgot Password? <button className='btn btn-link '>Reset Password</button></p>
                <button className='button block mx-auto'>Log In</button>
                <p className='text-center mt-2'>Don't have an account? <Link to="/signup" className='btn btn-link'>Sign Up</Link></p>
            </form>
        </div>
        </div>
       </div>
    );
};

export default Login;