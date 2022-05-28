import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Blog from '../src/Pages/Blog/Blog'
import Login from '../src/Pages/Login/Login'
import NotFound from '../src/Pages/NotFound/NotFound'
import Header from './Shared/Header'
import SignUp from './Pages/Login/SignUp'
import { Toaster } from 'react-hot-toast';
import RequireAuth from './Pages/Login/RequireAuth'
import Purchase from './Pages/Purchase/Purchase'
import Dashboard from './Pages/Dashboard/Dashboard'
import MyOrder from './Pages/Dashboard/MyOrder'
import AddReview from './Pages/Dashboard/AddReview'
import MyProfile from './Pages/Dashboard/MyProfile'
import MakeAdmin from './Pages/Dashboard/MakeAdmin'
import AddProduct from './Pages/Dashboard/AddProduct'
import ManageProducts from './Pages/Dashboard/ManageProducts'
import ManageOrders from './Pages/Dashboard/ManageOrders'
import MyPortfolio from '../src/Pages/MyPortfolio/MyPortfolio'
import Payment from './Pages/Dashboard/Payment'
import RequireAdmin from './Pages/Login/RequireAdmin'


const App = () => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/purchase/:id' element={<RequireAuth>
          <Purchase/>
        </RequireAuth>}/>
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard/>
        </RequireAuth>}>
          <Route index element={<MyProfile/>}/>
          <Route path='addreview' element={<AddReview/>}/>
          <Route path='myorder' element={<MyOrder/>}/>
          <Route path='makeadmin' element={<RequireAdmin><MakeAdmin/></RequireAdmin>}/>
          <Route path='addproduct' element={<RequireAdmin><AddProduct/></RequireAdmin>}/>
          <Route path='payment/:id' element={<Payment/>}/>
          <Route path='manageproduct' element={<RequireAdmin><ManageProducts/></RequireAdmin>}/>
          <Route path='manageorder' element={<RequireAdmin><ManageOrders/></RequireAdmin>}/>
        </Route>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/portfolio' element={<MyPortfolio/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster></Toaster>
    </div>
  )
}

export default App