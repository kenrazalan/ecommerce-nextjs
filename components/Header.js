import React,{useContext} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { DataContext } from '../store/GlobalState'
import Cookies from 'js-cookie'


function Header() {
    const router = useRouter()
    const {state,dispatch} = useContext(DataContext)
    const {auth} = state  

    const handleLogout = () => {
        Cookies.remove('refreshtoken', {path: 'api/auth/accessToken'})
        localStorage.removeItem('firstlogin')
        dispatch({type: "AUTH", payload: {}})
        dispatch({type: "NOTIFY", payload: {success: 'Logged out'}})
    }
    const loggedRouter = () => (
        <>
        <img src={auth.user.avatar} alt="profile" 
        style={{width:"30px",height:"30px",borderRadius:"50%" ,marginRight:"5px"}} />
        {auth.user.name}
        <li className="nav-item">
          <Link href="#">
            <a className="nav-link" >Profile</a>      
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
            <p>Header</p>
        </div>

        <div className="justify-center">
            <ul className="flex space-x-6">
                <li>Cart</li>
        {
          Object.keys(auth).length === 0 ? 

                <Link href="/signin">
                  <li>Login</li>      
                </Link>
          :
          loggedRouter()
        }
                
            </ul>
        </div>

    </div>
)}

export default Header