import router, { useRouter } from 'next/router'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { patchData } from '../../utils/fetchData';
import { updateItem } from '../../store/Action';

const EditUser = () => {
    const router = useRouter()
    const { id } = router.query;

    const {state, dispatch} = useContext(DataContext)
    const { auth, users } = state

    const [editUser,setEditUser] = useState([])
    const [checkAdmin, setCheckAdmin] = useState(false)
    const [num, setnum] = useState(0)

    useEffect(() => {
       
        users.forEach(user => {
            if(user._id === id ) {
                setEditUser(user)
                setCheckAdmin(user.role === 'admin' ? true : false)
            }
        });
    }, [users])

    const handleCheck = () => {
        setCheckAdmin(!checkAdmin)
        setnum(num + 1)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let role = checkAdmin ? 'admin' : 'user'
        if(num % 2 !== 0) {
            dispatch({ type: 'NOTIFY', payload: { loading : true}})
            patchData(`user/${editUser._id}`, {role}, auth.token)
            .then(res => {
                
                if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err}})
                dispatch(updateItem(users, editUser._id, {
                    ...editUser, role
                }, 'ADD_USERS'))
                return dispatch({ type: 'NOTIFY', payload: {success: res.msg }})
            })
        }

    }
    return(
        <div className="px-6 py-8">
            <Head>
                <title>Edit User</title>
            </Head>

            <button onClick={() => router.back()} className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-700 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-gray-900">
                    <span>Back</span>
            </button>
            <div className="w-96 mx-auto bg-white rounded shadow">
                <div className="flex justify-center mx-16 py-4 px-8 text-black text-xl font-bold">
                    Edit User
                </div>
                <form name="student_application" id="student_application" action="">
                        <div className="py-4 px-8">

                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2">Name</label>
                                <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                    name="name" id="name"  
                                    placeholder="Name"
                                    defaultValue={editUser.name} />

                            </div>
                        


                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2">Email</label>
                                <input className=" border rounded w-full py-2 px-3 text-grey-darker" type="text"
                                    name="email" 
                                    id="email"  
                                    placeholder="Email" 
                                    defaultValue={editUser.email}/>

                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="flex items-center">
                                <input id="isAdmin" 
                                    name="isAdmin" 
                                    type="checkbox" 
                                    className="form-checkbox"
                                    checked={checkAdmin}
                                    onChange={handleCheck}/>
                                <span className="ml-2">isAdmin</span>
                                </label>
                            </div>

                            <div className="flex justify-center mb-4">
                                <button onClick={handleSubmit}
                                        className="mb-2 mx-16 rounded-full py-1 px-24 bg-gradient-to-r from-green-400 to-blue-500 ">
                                        Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default EditUser