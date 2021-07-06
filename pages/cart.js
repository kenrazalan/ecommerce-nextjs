import Head from "next/head";
import Link from 'next/link'
import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";
import PaypalBtn from "./paypalBtn";

const Cart = () => {
    const {state,dispatch} = useContext(DataContext)
    const { cart,auth } = state

    const [total,setTotal] = useState(0)
    const [address,setAddress] = useState('')
    const [mobile,setMobile] = useState('')
    const [payment,setPayment] = useState(false)

    useEffect(() => {
      const getTotal = () => {
        const res = cart.reduce((prev, item) => {
          return prev + (item.price * item.quantity)
        },0)
        setTotal(res)
      }
      getTotal()
    },[cart])
    
    useEffect(() => {
        const cartLocal = JSON.parse(localStorage.getItem('__next_cart'))
        if(cartLocal && cartLocal.length > 0){
            let newArr = []
            const updateCart = async () => {
                for (const item of cartLocal) {
                    const res = await getData(`product/${item._id}`)

                    const { _id, title, images, price, inStock} = res.product;
                    if(inStock > 0) {
                        newArr.push({ _id, title, images, price, inStock,
                        quantity: item.quantity > inStock ? 1 : item.quantity })
                    }
                }
                dispatch({ type: 'ADD_CART', payload: newArr})
            }
            updateCart()
        }
    },[])

    const handlePayment = () => {
        if(!address || !mobile) return dispatch({type:"NOTIFY", payload: {error: "Please add address and mobile number."}})
        setPayment(true)
    }

    if(cart.length === 0 ) return<div className="flex justify-center "><img className="w-96 h-96" src="box.svg" alt="not empty"/></div> 
    return(
        <div>
            <Head>
                <title>Cart</title>
            </Head>
        <div className="px-6 py-8 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Shopping Cart</div>
        <div className="flex flex-col items-center">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                            {cart.map(item => (
                                <CartItem key={item._id} item={item} dispatch={dispatch} cart={cart}/>
                            ))}
            

                    
                    </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>

        <div className="flex items-center justify-end m-10">
            <form>
                <h2>Shipping</h2>

                <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="text" name="address" placeholder="Address"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="text" name="mobile" placeholder="Mobile Number"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" 
                    value={mobile} 
                    onChange={(e) => setMobile(e.target.value)} />
                </div>

            </form>
            <div className="mx-10 text-xl">Total: ${total}.00</div>
            {
                payment 
                ? <PaypalBtn total={total} address={address} mobile={mobile} state={state} dispatch={dispatch}/>
                : <Link href={auth.user ? '#!': '/signin'}>
                    <button onClick={handlePayment} className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-green-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-green-600">
                        Checkout
                    </button> 
                  </Link>      

            }

              
        </div>

        </div>
    )

}

export default Cart