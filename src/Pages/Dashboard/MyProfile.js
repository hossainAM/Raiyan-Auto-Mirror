import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader/Loader';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const eduRef = useRef();
    const cityRef = useRef();
    const distRef = useRef();
    const phoneRef = useRef();
    const linkedRef = useRef();
    const imgRef = useRef();

    const imageStorageKey = '755356de0bb69c7e52c3efd877fa9a1b';

    const handleSubmit = e => {
        e.preventDefault();
        const name = user.displayName;
        const email = user.email;
        const education = eduRef.current.value;
        const city = cityRef.current.value;
        const district = distRef.current.value;
        const phone = phoneRef.current.value;
        const linkedin = linkedRef.current.value;
        const image = imgRef.current.files[0];
        console.log(image)

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                const img = data.data.url;
                 const addProfile = {
                     name,
                     email,
                     education,
                     city,
                     district,
                     phone,
                     linkedin,
                     img
                 }
                //post profile to database 
                fetch('https://pacific-springs-08376.herokuapp.com/profile', {
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
                        toast.success('Profile added successfully');
                    }
                    else{
                        toast.error('Failed to add profile')
                    }
                });
            }
        })
         //clear input field
         eduRef.current.value = '';
         cityRef.current.value = '';
         distRef.current.value = '';
         phoneRef.current.value = '';
         linkedRef.current.value = '';
    }

    //Update profile
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
            fetch(`https://pacific-springs-08376.herokuapp.com/profile/${email}`, {
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
    //get profile info from database
    const {
        data: profile,
        isLoading,
        refetch
    } = useQuery('profile', () => fetch(`https://pacific-springs-08376.herokuapp.com/profile/${user?.email}`, {
        method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
    }).then(res => res.json()));

    // console.log(profile)

    if(isLoading) {
        return <Loader></Loader>
    }

    refetch();

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 justify-center items-center gap-5'>
        <div  className="container flex px-5 items-center justify-center flex-col">
            <h2 className='text-xl text-secondary font-bold mb-4'>Add Profile</h2>
            <form onSubmit={handleSubmit} className="">
                <input type="text" placeholder="Name" className="input input-bordered" name="name" value={user.displayName} autoComplete='off' required />
                <br/>
                <input type="text" placeholder="Email" className="input input-bordered" name="email" value={user.email} autoComplete='off' required />
                <br/>
                <input ref={eduRef} type="text" placeholder="Education" className="input input-bordered" name="education" required />
                <br/>
                <input ref={cityRef} type="text" placeholder="City" className="input input-bordered" name="city" required />
                <br/>
                <input ref={distRef} type="text" placeholder="District" className="input input-bordered" name="district" required />
                <br/>
                <input ref={phoneRef} type="text" placeholder="Phone" className="input input-bordered" name="phone" required />
                <br/>
                <input ref={linkedRef} type="text" placeholder="Linkedin URL" className="input input-bordered" name="linkedin" required />
                <br/>
                <input ref={imgRef} type="file" className="input input-bordered" name="files" required />
                <br/>
                <input className='btn btn-secondary flex mx-auto py-2 w-100 mt-3' type="submit" value="Add Profile"/>
            </form>
            <button onClick={() => handleUpdate (user.email)} className='btn btn-primary mt-4'>Edit Profile</button>
        </div>
        <div className="text-gray-600 body-font">
            <h2 className='text-xl text-secondary text-center font-bold mb-4'>My Profile</h2>
            <div className="container flex px-5 items-center justify-center flex-col">
                <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src={profile.img} alt="profileImage" /></figure>
                <div class="card-body">
                    <h2 className="title-font sm:text-lg text-sm  mb-2 font-medium text-gray-900">Name: <span className='text-accent pl-4'>{profile.name}</span></h2>
                    <h2 className="title-font sm:text-lg text-sm mb-2 font-medium text-gray-900">Email: <span className='text-accent pl-4'>{profile.email}</span></h2>
                    <h2 className="title-font sm:text-lg text-sm mb-2 font-medium text-gray-900">Education: <span className='text-accent pl-4'>{profile.education}</span></h2>
                    <h2 className="title-font sm:text-lg text-sm mb-2 font-medium text-gray-900">City: <span className='text-accent pl-4'>{profile.city}</span></h2>
                    <h2 className="title-font sm:text-lg text-sm mb-2 font-medium text-gray-900">District: <span className='text-accent pl-4'>{profile.district}</span></h2>
                    <h2 className="title-font sm:text-lg text-sm mb-2 font-medium text-gray-900">Phone: <span className='text-accent pl-4'>{profile.phone}</span></h2>
                    <h2 className="title-font sm:text-lg text-sm mb-2 font-medium text-gray-900">LinkedIn: <span className='text-accent pl-4 underline'>{profile.linkedin}</span></h2>
                </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default MyProfile;
