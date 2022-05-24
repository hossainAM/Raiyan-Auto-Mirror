import React from 'react';
import auth from '../../firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import useToken from '../../Hooks/useToken';

const SocialLogin = () => {
    const [signInWithGoogle, gUser, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate()

    const handleGoogleLogin = async () => {
        await signInWithGoogle();
    }

      const [token] = useToken(gUser);

    let errorMessage;
     if(error) {
        errorMessage =  <p>Error:{error?.message}</p>
     }

    if(loading) {
         return <Loader></Loader>
     }

    if (token) {
        navigate('/')
    }
    return (
        <>
         <h1 className='text-center mb-2'>.................Or.................</h1>
         <div className='flex justify-center mb-3'>
			<button onClick={handleGoogleLogin} className="bg-secondary hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
			Login with Google
		    </button>
		 </div>
         <p className='text-center text-red-500'>{errorMessage}</p>
        </>
    );
};

export default SocialLogin;