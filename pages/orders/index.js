import Head from "next/head";
import Link from 'next/link'
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/GlobalState";

const orders = () => {

    const {state,dispatch} = useContext(DataContext)
    const { orders} = state

    return(
        <div>
            <Head><title>My Orders</title></Head>
        
            <div className="px-6 py-8 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Orders</div>
            <div className="flex flex-col items-center">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delivered
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                            {orders.map(item => (
                                <tr key={item._id}>
                                    <Link href={`/orders/${item._id}`}> 
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer">
                                        {item._id}
                                    </td>
                                    </Link>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    ₱ {item.total}.00
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item.delivered ? <p>Yes</p> : <p>No</p>}
                                    </td>   
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {item._id}
                                    </td>
                                </tr>
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
export default orders