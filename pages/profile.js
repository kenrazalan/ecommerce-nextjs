import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import { DataContext } from "../store/GlobalState"
import { patchData } from "../utils/fetchData"
import ImageUpload from "../utils/imageUpload"
import valid from '../utils/valid'


const Profile = () => {

    const initialState = { avatar: "" ,name: "", password:"", newPassword:""}
    const [input,setInput] = useState(initialState)
    const {avatar, name, password, newPassword} = input

    const {state,dispatch} =useContext(DataContext)
    const {auth , notify} = state;

    useEffect(() => {
        if(auth.user)  setInput({...input, name: auth.user.name})

    },[auth.user])

    const handleChange = (e) => {
        const {name,value} = e.target;
        setInput({...input, [name]: value})
        dispatch({type:'NOTIFY', payload: {}})
    }

    const handleChangeProfile = (e) => {
        e.preventDefault()
        if(password){
            const errMsg = valid(name, auth.user.email, password, newPassword)
            if(errMsg)return dispatch({type: 'NOTIFY', payload: {error: errMsg}})
            updatePassword()
        }
        if(name !== auth.user.name || avatar) updateInfo()
        
    }
    const updateInfo = async () =>{
        let media;
        dispatch({ type:'NOTIFY', payload: {loading: true}})
        if(avatar) media = await ImageUpload([avatar])

        patchData('user', {
            name, avatar: avatar ? media[0].url : auth.user.avatar
        } ,auth.token).then( res => {
            if(res.err) return dispatch({ type:'NOTIFY', payload: {error: res.err}})
            dispatch({ type:'AUTH', payload: {
                token: auth.token,
                user: res.user
            }})
            return dispatch({ type:'NOTIFY', payload: {success: res.msg}})
        })
    }
    const updatePassword = () => {
        dispatch({type: 'NOTIFY', payload: {loading: true}})
        patchData('user/resetPassword', {password}, auth.token)
        .then(res => {
            if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.msg}})
            return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
        })
    }
    const changeProfile = (e) => {
        const file = e.target.files[0]
        if(!file) return dispatch({type:'NOTIFY', payload: {error: 'File does not exist.'}})

        if(file.size > 2048 * 2048) //2mb  
        return dispatch({type:'NOTIFY', payload: {error: 'The largest image size is 1mb.'}})

        // if(file.type !== "image/jpeg" && "image/png") 
        // return dispatch({type:'NOTIFY', payload: {error: 'Image format does not supported.'}})

        setInput({...input,avatar: file})
    }
    if(!auth.user) return null

    return(
        <div>
            <Head>
                <title>Profile</title>
            </Head>
            <div className="container mx-auto py-8">
            <div className="w-96 mx-auto bg-white rounded shadow">

                <div className="flex justify-center mx-16 py-4 px-8 text-black text-xl font-bold">
                    {auth.user.role === 'user' ? 'User Profile': 'Admin Profile'}
                </div>
                <div className="flex justify-center items-center">
                    <div className="relative w-44 h-44 overflow-hidden avatar">
                        <img className=" border-2 rounded-full w-full h-full block" 
                        src={avatar ?URL.createObjectURL(avatar) : auth.user.avatar} alt="profile"/>
                        <span className="flex justify-center absolute bottom-[100%] left-0 w-full h-[50%] bg-[#fff8]
                            text-center font-normal uppercase text-red-500 transition duration-500 ease-in-out">
                            <img className="h-10 w-10 opacity-50" src="camera.svg" alt="camera"/>
                            {/* <p>Change</p> */}
                            <input className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" type="file" name="file" id="file_up"
                                    onChange={changeProfile} accept="image/*"/>
                        </span>
                    </div>
                </div>
                <form name="student_application" id="student_application" action="">
                    <div className="py-4 px-8">

                        <div className="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2">Name:</label>
                            <input class=" border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                name="name" id="name" value={name} placeholder="Name" onChange={handleChange}/>
                        </div>


                        <div className="mb-4">
                            <label class="block text-grey-darker text-sm font-bold mb-2">Email</label>
                            <input class=" bg-gray-200 border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                name="email" id="email"  placeholder="Email" defaultValue={auth.user.email} disabled/>

                        </div>

                        <div className="mb-4">
                            <label className="block text-grey-darker text-sm font-bold mb-2">New Password:</label>
                            <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="password"
                                name="password" id="new_password" value={password} placeholder="New Password" 
                                onChange={handleChange}/>
                            <p id="error_creater_id"></p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-grey-darker text-sm font-bold mb-2">Confirm New Password:</label>
                            <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="password"
                                name="newPassword" id="confirm_new_password" value={newPassword} placeholder="Confirm New Password" 
                                onChange={handleChange}/>
                            <p id="error_creater_id"></p>
                        </div>

                            <div className="flex justify-center mb-4">
                                <button
                                    onClick={handleChangeProfile}
                                    disabled={notify.loading}
                                    className="mb-2 mx-16 rounded-full py-1 px-24 bg-gradient-to-r from-green-400 to-blue-500 ">
                                    Update
                                </button>
                            </div>
                    </div>
                </form>

            </div>

        </div>
        </div>
    )
}

export default Profile


