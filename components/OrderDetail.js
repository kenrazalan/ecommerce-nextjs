import Link from 'next/link'
import { updateItem } from '../store/Action'
import { patchData } from '../utils/fetchData'
import PaypalBtn from './PaypalBtn'

const OrderDetail = ({ orderDetail, dispatch, state}) => {
    const { auth, orders } = state

    const handleDelivered = (order) => {
        dispatch({ type: 'NOTIFY', payload: {loading: true}})
        patchData(`order/delivered/${order._id}`, null , auth.token)
        .then(res => {

            const { paid, dateOfPayment, method, delivered} = res.result

            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}})

            dispatch(updateItem(orders, order._id, {
                ...order, 
                paid, 
                dateOfPayment, 
                method, 
                delivered
            },'ADD_ORDERS'))
            return dispatch({ type: 'NOTIFY', payload: {success: true}})
        })
    }
    if(!auth.user) return null
    return(
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
                    <div className={`${item.delivered ? 'bg-green-500' : ' bg-red-500'} rounded-sm flex justify-between items-center px-4 p-2`}>
                        {
                            item.delivered ? `Delivered on ${item.updatedAt}` : 'Not delivered'
                        }
                        {
                            auth.user.role ==='admin' && !item.delivered &&
                            <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-700 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-gray-900"
                                    onClick={() => handleDelivered(item)}>
                                Mark as delivered
                            </button>
                        }
                    </div>
                    <h3>Payment</h3>
                    {
                        item.method && <h4>Method: <em>{item.method}</em></h4>
                    }
                    {
                        item.paymentId && <h4>Payment ID: <em>{item.paymentId}</em></h4>
                    }
                    
                    <div className={`${item.paid ? 'bg-green-500' : ' bg-red-500'} rounded-sm flex justify-center p-2`}>
                        {
                            item.paid ? `Paid on ${item.dateOfPayment}` : 'Not Paid'
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
                    <div>
                        <h2 className="py-2">Total: ₱ {item.total}.00</h2>
                        { !item.paid && auth.user.role !== 'admin' &&
                        <div className="p-4">
                            <PaypalBtn order={item}/> 
                        </div>                            
                        }

                        
                    </div>
            </div>

        ))}
    </div>
    )

}
export default OrderDetail