import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader/Loader';
import UserInfo from './UserInfo';

const MakeAdmin = () => {
      const {
        data: users,
        isLoading,
        refetch,
    } = useQuery('users', () => fetch('https://desolate-harbor-05396.herokuapp.com/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if(isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h2 className='text-xl text-secondary font-bold mb-4'>Make an Admin</h2>
            <div className="overflow-x-auto w-screen lg:w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Make Admin</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <UserInfo key={user._id} index={index} user={user} refetch={refetch}></UserInfo>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakeAdmin;