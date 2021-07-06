import Head from 'next/head'
import Link from 'next/link'
import { useState,useContext } from 'react'
import {DataContext} from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import valid from '../utils/valid'

const Register = () => {

    const initialState = {name:"", email: "" , password:"", cf_password:""}

    const [userData,setUserData] = useState(initialState)
    const {name,email,password,cf_password} = userData;

    const {state,dispatch} = useContext(DataContext)

    const handleChangeInput = e => {
        const {name,value } = e.target;
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const errorMsg = valid(name,email,password,cf_password)
        if(errorMsg) return dispatch({ type: "NOTIFY",payload: {error: errorMsg}})
    
        dispatch({type: "NOTIFY", payload: {loading:true}})
    
        const res = await postData('auth/register',userData)
         console.log(res)
        if(res.err) return dispatch({ type: "NOTIFY",payload: {error: res.err}})
        return dispatch({ type: "NOTIFY",payload: {success: res.msg}})
    }
    
    return(
        <div>
            <Head>
                <title>Register</title>
            </Head>
        <div className="mt-2 mb-5 items-center z-10 ">
        <form onSubmit={handleSubmit}
            className="bg-white max-w-sm mx-auto rounded-xl  overflow-hidden p-6 sm:p-14 space-y-5 border border-r-2 border-indigo-200">
            <h2 className="text-4xl font-bold text-center text-gray-600">Register</h2>

            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="text" name="name" placeholder="Name"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" 
                    value={name} onChange={handleChangeInput}/>
            </div>

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
            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="password" name="cf_password" placeholder="Confirm Password"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" 
                    value={cf_password} onChange={handleChangeInput}/>
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
                <a className="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                    Forgot Password?
                </a>
                <button
                    className="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600 ">
                    Register
                </button>
            </div>
        </form>
        </div>
        </div>
    )


}

export default Register