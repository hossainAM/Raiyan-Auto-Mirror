import React from 'react';
import { NavLink } from 'react-router-dom';
import auth from '../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth);

    const handleSignOut = () => {
         signOut(auth);
         localStorage.removeItem('accessToken');
    };

    const menuItems = <>
        <li><NavLink style={({ isActive }) => isActive ? {color: '#f6d860'} : undefined} to='/'>Home</NavLink></li>
        <li><NavLink style={({ isActive }) => isActive ? {color: '#f6d860'} : undefined} to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink style={({ isActive }) => isActive ? {color: '#f6d860'} : undefined} to='/blog'>Blog</NavLink></li>
        <li><NavLink style={({ isActive }) => isActive ? {color: '#f6d860'} : undefined} to='/portfolio'>My Portfolio</NavLink></li>
        {user ? 
        <li><NavLink style={({ isActive }) => isActive ? {color: '#f6d860'} : undefined} onClick={handleSignOut} to='/login'>Logout</NavLink></li>
        :
        <li><NavLink style={({ isActive }) => isActive ? {color: '#f6d860'} : undefined} to='/login'>Login</NavLink></li>
        }
    </>
    return (
        <div className="navbar bg-base-100 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabindex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                    {user && <p className='text-primary font-bold'>{user.displayName}</p>}
                </div>
                <a className="btn btn-ghost normal-case text-xl text-secondary font-bold">Raiyan Auto Mirror</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className='navbar-end'>
                <label tabindex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
            </div>
        </div>
    );
};

export default Header;