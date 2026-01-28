import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='h-screen w-64 bg-black text-white p-4 flex flex-col gap-2'>
            <NavLink to={'/products'} className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-blue-800'}`}>
                All Products
            </NavLink>

            <NavLink to={'/new-invoice'} className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-blue-800'}`}>New Invoice</NavLink>
            <NavLink to={'/add-product'} className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-blue-800'}`}>Add Product</NavLink>
            <NavLink to={'/history'} className={({ isActive }) => `${isActive ? 'text-red-500' : 'text-blue-800'}`}>History</NavLink>
        </div>
    )
}

export default Sidebar