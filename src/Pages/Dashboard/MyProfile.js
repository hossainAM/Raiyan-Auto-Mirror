import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const eduRef = useRef();
    const cityRef = useRef();
    const distRef = useRef();
    const phoneRef = useRef();
    const linkedRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        const name = user.displayName;
        const email = user.email;
        const education = eduRef.current.value;
        const city = cityRef.current.value;
        const district = distRef.current.value;
        const phone = phoneRef.current.value;
        const linkedin = linkedRef.current.value;

        const addProfile = {
            name, email, education, city, district, phone, linkedin
        }

       //post new product to server 
        const url = `https://desolate-harbor-05396.herokuapp.com/profile`
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(addProfile)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
                toast.success('Product added successfully');
            }
            else{
                toast.error('Failed to add product')
            }
        });

        //clear input field
        eduRef.current.value='';
        cityRef.current.value='';
        distRef.current.value='';
        phoneRef.current.value='';
        linkedRef.current.value='';
    }

    const handleUpdate = (email) => {
        const education = eduRef.current.value;
        const city = cityRef.current.value;
        const district = distRef.current.value;
        const phone = phoneRef.current.value;
        const linkedin = linkedRef.current.value;

          //send updated profile info to server
            const profile = {
                education, city, district, phone, linkedin
            }
            fetch(`https://desolate-harbor-05396.herokuapp.com/profile/${email}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(profile)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });

        //clear input field
        eduRef.current.value='';
        cityRef.current.value='';
        distRef.current.value='';
        phoneRef.current.value='';
        linkedRef.current.value='';
    }

    return (
        <div>
            <h2 className='text-xl text-secondary font-bold mb-4'>My Profile</h2>
            <form onSubmit={handleSubmit} className="">
                <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" name="name" value={user.displayName} autoComplete='off' required />
                <br/>
                <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" name="email" value={user.email} autoComplete='off' required />
                <br/>
                <input ref={eduRef} type="text" placeholder="Education" className="input input-bordered w-full max-w-xs" name="education" required />
                <br/>
                <input ref={cityRef} type="text" placeholder="City" className="input input-bordered w-full max-w-xs" name="city" required />
                <br/>
                <input ref={distRef} type="text" placeholder="District" className="input input-bordered w-full max-w-xs" name="district" required />
                <br/>
                <input ref={phoneRef} type="text" placeholder="Phone" className="input input-bordered w-full max-w-xs" name="phone" required />
                <br/>
                <input ref={linkedRef} type="text" placeholder="Linkedin URL" className="input input-bordered w-full max-w-xs" name="linkedin" required />
                <br/>
                <input className='btn btn-secondary py-2 w-100 mt-3 mr-4' type="submit" value="Add Profile"/>
            </form>
            <button onClick={() => handleUpdate (user.email)} className='btn btn-primary mt-4'>Edit Profile</button>
        </div>
    );
};

export default MyProfile;