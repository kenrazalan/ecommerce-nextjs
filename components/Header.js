import React,{useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookies from 'js-cookie'


function Header() {
    const router = useRouter()
    const {state,dispatch} = useContext(DataContext)
    const {auth, cart} = state  

    const handleLogout = () => {
        Cookies.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstlogin')
        dispatch({type: "AUTH", payload: {}})
        dispatch({type: "NOTIFY", payload: {success: 'Logged out'}})
    }
    const loggedRouter = () => (
        <>
        <img className="cursor-pointer" src={auth.user.avatar} alt="profile" 
        style={{width:"30px",height:"30px",borderRadius:"50%" ,marginRight:"5px"}} />
        <span className="cursor-pointer">{auth.user.name}</span>
        <li className="nav-item">
          <Link href="/profile">
            <a className="nav-link cursor-pointer" >Profile</a>      
          </Link>
        </li>
        <li className="nav-item">
          <Link href="#">
            <button className="nav-link" onClick={handleLogout}>Logout</button>      
          </Link>
        </li>
      </>
    )

return (
    <div className="sticky top-0 z-50 bg-white flex items-center p-2 lg:p-5 shadow-sm justify-between">
        <div className="flex items-center">
          <Link href="/">
            <p className="cursor-pointer">Header</p>
          </Link>
            
        </div>

        <div className="justify-center">
            <ul className="flex space-x-6">
            <Link href="/cart">
                <li className="cursor-pointer">Cart <span>{cart.length}</span></li>
              </Link>
        {
          Object.keys(auth).length === 0 ? 

                <Link href="/signin">
                  <li className="cursor-pointer">Login</li>      
                </Link>
          :
          loggedRouter()
        }
                
            </ul>
        </div>

    </div>
)}

export default Header