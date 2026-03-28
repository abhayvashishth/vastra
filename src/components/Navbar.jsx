import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import {assets} from "../assets/assets"
import { Link, useLocation } from 'react-router-dom'
import{NavLink} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import SearchBar from './SearchBar'
import { SupabaseContext } from '../context/SupabaseContext'



const Navbar= () => {
  const [visible, setVisible] = useState(false);
  const {showSearch, setShowSearch, getCartCount} = useContext(ShopContext);
  const location = useLocation();
  const {logout, user} = useContext(SupabaseContext);

  

  return (
    <div className='flex gap-2 items-center justify-between py-5 font-medium'>

                   {/* Left Part */}
       <Link to="/"> <img src={assets.logo} className='sm:w-20 w-12' alt="" /></Link>

                  {/* Middle Part */}
        <ul className='hidden lg:flex gap-5 text-sm text-gray-700'>

           <NavLink to="/" className='flex flex-col hover:text-purple-900 items-center gap-1 '>
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[2.0px] bg-gray-700 hidden' />

           </NavLink>

           <NavLink to='/collection' className='flex flex-col hover:text-purple-900 items-center gap-1 '>
            <p>COLLECTION </p>
            <hr className='w-2/4 border-none h-[2.0px] bg-gray-700 hidden' />

           </NavLink>

           <NavLink to='/about' className='flex flex-col hover:text-purple-900 items-center gap-1 '>
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[2.0px] bg-gray-700 hidden' />

           </NavLink>

           <NavLink to='/contact' className='flex flex-col hover:text-purple-900 items-center gap-1 '>
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[2.0px] bg-gray-700 hidden' />

           </NavLink>
        
        </ul>
        {
          showSearch && location.pathname === '/collection' ? <SearchBar/> : null
        }
                        
                        {/* Right Part */}
        <div className='flex items-center gap-6'>
                      
                         {/* search Icon */}
           <NavLink to={'/collection'}> <img onClick={()=>{setShowSearch(!showSearch)}} src={assets.search_icon} className='sm:w-6 w-5 cursor-pointer ' alt="" /></NavLink>

                      {/* Profile_Icon_Group */}
            <div className='group w-8'>
                <Link to='/login'><img className='sm:w-7 w-6 cursor-pointer hover:w-8' src={assets.profile_icon} alt="" /></Link>
                <div className='group-hover:block hidden absolute dropdown-menu  pt-4'>
                    <div className='flex flex-col gap-2 w-36 text-center text-slate-100 bg-gray-600 rounded-lg border border-gray-600'>
                        <Link to={'/login'}><p className='cursor-pointer hover:text-black hover:bg-white rounded-lg p-1'>My Profile</p></Link>
                        <Link to="/orders"><p className='cursor-pointer hover:text-black hover:bg-white rounded-lg p-1'>Orders</p></Link>
                        {
                          user?<button onClick={logout} className='cursor-pointer hover:text-black hover:bg-white rounded-lg p-1'>LogOut</button>:null
                        }
                    </div>
                </div>
            </div>

            <Link to="/cart" className='relative w-9'>
            <img src={assets.cart_icon} className='w-7 hover:w-8 min-w-6' alt="" />
            <p className='absolute text-[12px] text-center right-[-5px] bottom-[-5px] w-4 leading-4 bg-black text-white aspect-square rounded-full s '> {getCartCount()}</p>
            </Link>

            <img onClick={()=>{setVisible(true)}} src={assets.menu_icon} className='w-7 cursor-pointer lg:hidden' alt="" />
        </div>

                  {/* SideBar menu for Smaller screens */}
                  <div className={`sideBar absolute top-4 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full': 'w-0'}`}>

                    <div className='flex flex-col text-gray-600'>
                      <div onClick={()=>{setVisible(false)}} className='flex items-center gap-4 p-3 group hover:cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p className=''>Back</p>
                      </div>
                      <NavLink onClick={()=>{setVisible(false)}} className='py-3 border text-center hover:bg-red-800 hover:text-white' to='/'>HOME</NavLink>
                      <NavLink onClick={()=>{setVisible(false)}} className='py-3 border text-center hover:bg-red-800 hover:text-white' to='/collection'>COLLECTION</NavLink>
                      <NavLink onClick={()=>{setVisible(false)}} className='py-3 border text-center hover:bg-red-800 hover:text-white' to='/about'>ABOUT</NavLink>
                      <NavLink onClick={()=>{setVisible(false)}} className='py-3 border text-center hover:bg-red-800 hover:text-white' to='/CONTACT'>CONTACT</NavLink>
                    </div>

                  </div>

    </div>
  )
}

export default Navbar