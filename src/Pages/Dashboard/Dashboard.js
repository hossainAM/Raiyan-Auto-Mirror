import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <h2 className='text-2xl font-bold text-purple-500 my-4'>Welcome to Your Dashboard</h2>
                <Outlet/>
            </div> 
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label> 
                <ul className="menu p-4 overflow-y-auto w-60 bg-base-100 text-base-content">
                {/* <!-- Sidebar content here --> */}
                    <li><Link to="/dashboard">My Order</Link></li>
                    <li><Link to="/dashboard/addreview">Add Review</Link></li>
                    <li><Link to="/dashboard/profile">My Profile</Link></li>
                    <li><Link to="/dashboard/makeadmin">Make Admin</Link></li>
                    <li><Link to="/dashboard/addproduct">Add Product</Link></li>
                    <li><Link to="/dashboard/manageproduct">Manage Products</Link></li>
                    <li><Link to="/dashboard/manageorder">Manage Orders</Link></li>
                </ul>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;