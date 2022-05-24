import React from 'react';
import { useQuery } from 'react-query';
import Loader from '../../Shared/Loader/Loader';
import UserInfo from './UserInfo';

const MakeAdmin = () => {
      const {
        data: users,
        isLoading,
        refetch,
    } = useQuery('users', () => fetch('http://localhost:5000/user', {
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
            <h2>Make an Admin: {users.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
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