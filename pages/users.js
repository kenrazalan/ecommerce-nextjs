import Head from 'next/head'
import Link from 'next/link'
import { useContext, useState } from 'react'
import UserItem from '../components/UserItem'
import { DataContext } from '../store/GlobalState'

const Users = () => {
    const { state,dispatch } = useContext(DataContext)
    const { users, auth } = state



    if(!auth.user) return null
    return(
        <div>
            <Head>
                <title>Users</title>
            </Head>

            <div className="px-6 py-8 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Orders</div>
            <div className="flex flex-col items-center">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Avatar
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Admin
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">


                        {users.map((user, index) => (
                           <UserItem user={user} index={index} dispatch={dispatch} auth={auth} users={users}/>
                            ))}
            

                    
                    </tbody>
                    </table>
                  </div>
                </div>
            </div>
            </div>
    
        </div>
    )
}


export default Users