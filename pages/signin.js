import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { useState,useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'

const Signin = () => {


    const initialState = { email: "" , password:""}

    const [userData,setUserData] = useState(initialState)
    const {email,password} = userData;
    const router = useRouter()

    const {state,dispatch} = useContext(DataContext)
    const {auth} = state

    const handleChangeInput = e => {
        const {name,value } = e.target;
        setUserData({...userData, [name]: value})
        dispatch({type: "NOTIFY", payload: {}})
    }
    const handleSubmit = async e => {
        e.preventDefault()
    
        dispatch({type: "NOTIFY", payload: {loading:true}})
    
        const res = await postData('auth/login',userData)
        console.log(res)
        if(res.err) return dispatch({ type: "NOTIFY",payload: {error: res.err}})
  
        dispatch({ type: "NOTIFY",payload: {success: res.msg}})
  
        dispatch({ type: "AUTH",payload: {
            token: res.access_token,
            user: res.user
        }})
  
        Cookie.set('refreshtoken', res.refresh_token, {
            path: 'api/auth/accessToken',
            expires: 7
        })
        localStorage.setItem('firstLogin',true)  
      }
    useEffect(() => {
        if(Object.keys(auth).length !==0 ) router.push('/')
    },[auth])


    return(
    <div className="relative flex items-center justify-center py-2 bg-no-repeat bg-cover">
        <Head>
            <title>Signin</title>
        </Head>
    <div className="mt-2 items-center z-10 ">
        <form onSubmit={handleSubmit}
            className="bg-white max-w-sm mx-auto rounded-xl overflow-hidden p-6 sm:p-14 space-y-10 border border-r-2 border-indigo-200 ">
            <h2 className="text-4xl font-bold text-center text-indigo-600">Login</h2>
            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="email" name="email" placeholder="Email"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" 
                    value={email} onChange={handleChangeInput}/>
              
            </div>
            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="password" name="password" placeholder="Password"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" 
                    value={password} onChange={handleChangeInput}/>
                
            </div>
            <div className="block mt-2">
                <label for="" className="flex items-center">
                    <input type="checkbox"
                        className="ml-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </input>
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>
            <div className="flex items-center justify-end mt-4">
                <a className="underline text-sm text-gray-600 hover:text-gray-900" href="/register">
                    Dont have an account?
                </a>
                <button
                    className="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600 ">
                    Log in
                </button>
            </div>
        </form>
    </div>
    </div>
)

}

export default Signin