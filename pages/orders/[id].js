import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'



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
                <div className="flex justify-center">
                    {orderDetail.map(item => (
                        <div key={item._id}>
                            <h2>Order Id: {item._id}</h2>
                            <div className="mt-4">
                                <h4 className="font-medium">Shipping</h4>
                                <p>Name: {item.user.name}</p>
                                <p>Email: {item.user.email}</p>
                                <p>Address: {item.address}</p>
                                <p>Mobile: {item.mobile}</p>
                                <div className={`${item.delivered ? 'bg-green-500' : ' bg-red-500'} rounded-sm flex justify-center`}>
                                    {
                                        item.delivered ? `Delivered on ${item.updatedAt}` : 'Not delivered'
                                    }
                                </div>
                                <div>
                                    <h4>Order Items</h4>
                                    {
                                        item.cart.map(item => (
                                            <div key={item._id} className="flex justify-between items-center p-2 w-96">
                                                <img className="w-[50px] h-[45px] object-cover" src={item.images[0].url} alt={item.images[0].url}/>
                                                <h5 className=" flex-1 p-2">
                                                    <Link href={`/product/${item._id}`}>
                                                    <a className="">{item.title}</a>
                                                    </Link>
                                                </h5>
                                                <span>
                                                    {item.quantity} x ₱ {item.price}.00 = ₱ {item.quantity * item.price}.00
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default DetailOrder