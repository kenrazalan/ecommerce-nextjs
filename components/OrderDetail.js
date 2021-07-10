import Link from 'next/link'

const OrderDetail = ({orderDetail}) => {
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
                    <div className={`${item.delivered ? 'bg-green-500' : ' bg-red-500'} rounded-sm flex justify-center`}>
                        {
                            item.delivered ? `Delivered on ${item.updatedAt}` : 'Not delivered'
                        }
                    </div>
                    <h3>Payment</h3>
                    <div className={`${item.delivered ? 'bg-green-500' : ' bg-red-500'} rounded-sm flex justify-center`}>
                        {
                            item.paid ? `Delivered on ${item.dateOfPayment}` : 'Not Paid'
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
    )

}
export default OrderDetail