import React from 'react';
import { Link } from 'react-router-dom';
import '../../Pages/Login/Login.css'

const SignUp = () => {
    return (
        <div className='contentWrapper'>
           <div className='formWrapper'>
            <div className='containerForm logIn'>
                <form action="#">
                    <h2 className='title text-center text-2xl mb-2 font-base text-neutral'>Sign Up</h2>
                    <input type="text" className='input' placeholder='User' />
                    <input type="email" className='input' placeholder='Email' />
                    <input type="password" className='input' placeholder='Password' />
                    <p className='text-center mt-2'>Forgot Password? <button className='btn btn-link '>Reset Password</button></p>
                    <button className='button block mx-auto'>Sign Up</button>
                    <p className='text-center mt-2'>Already have an account? <Link to="/login" className='btn btn-link'>Log In</Link></p>
                </form>
            </div>
        </div>
       </div>
    );
};

export default SignUp;