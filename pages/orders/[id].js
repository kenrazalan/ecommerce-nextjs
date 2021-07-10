import Head from 'next/head'

import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import OrderDetail from '../../components/OrderDetail'


const DetailOrder = () => {
    const {state,dispatch} = useContext(DataContext)
    const {orders, auth} = state

    const router = useRouter()
    const [orderDetail,setOrderDetail] = useState([])

    useEffect(() => {
        const newArr = orders.filter(order => order._id === router.query.id)
        setOrderDetail(newArr)
    },[orders])
    return(
        <div>
            <Head><title>Order Details</title></Head>
            <div className="px-6 py-8">
                <button onClick={() => router.back()} className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-700 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-gray-900">
                    <span>Back</span>
                </button>
                <OrderDetail orderDetail={orderDetail}/>
            </div>
        </div>
    )
}
export default DetailOrder