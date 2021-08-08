import Link from "next/link"
import { useState } from "react"
import { decrease, deleteItem, increase } from "../store/Action"
import { deleteData } from "../utils/fetchData"
import Modal from "./Modal"


const UserItem = ({ user, index,dispatch, auth , users}) => {
    const [toggle, setToggle] = useState(false)

    const handleSubmit = () => {
        deleteData(`user/${user._id}`, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type:'NOTIFY', payload: {error: res.err}})
            return dispatch({ type:'NOTIFY', payload: {success: res.msg}})
        })
        dispatch(deleteItem(users, user._id, 'ADD_USERS'))
    }
    return (
        <>
            {
                toggle && (
                    <Modal
                        toggle={toggle}
                        setToggle={setToggle}
                        message="Are you sure you want to remove this user."
                        handleSubmit={handleSubmit} />
                )
            }

            <tr key={user._id}>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                    {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                    {user._id}
                </td>

                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex-shrink-0 h-8 w-8">
                        <img className="h-8 w-8 rounded-full " src={user.avatar} alt="avatar" />
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role === 'admin' ? user.root ? 'Admin(Root)' : '' : 'No'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link href={
                        auth.user.root && auth.user.email !== user.email
                            ? `/edit_user/${user._id}` : '#!'
                    }>
                        <a className="cursor-pointer">Edit</a>
                    </Link>
                    {
                        auth.user.root && auth.user.email !== user.email
                            ? <a className="cursor-pointer" onClick={() => setToggle(!toggle)}>  Remove</a>
                            : <a>  Remove</a>
                    }
                </td>
            </tr>
        </>
    )

}
export default UserItem