import Head from "next/head";
import Link from 'next/link'
import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { DataContext } from "../store/GlobalState";
import { getData, postData } from "../utils/fetchData";
import {useRouter} from 'next/router'

const Cart = () => {
    const {state,dispatch} = useContext(DataContext)
    const { cart,auth,orders } = state

    const [total,setTotal] = useState(0)
    const [address,setAddress] = useState('')
    const [mobile,setMobile] = useState('')
    const [payment,setPayment] = useState(false)
    const [callBack,setCallBack] = useState(false)
    const router = useRouter()

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

                    const { _id, title, images, price, inStock, sold} = res.product;
                    if(inStock > 0) {
                        newArr.push({ _id, title, images, price, inStock, sold,
                        quantity: item.quantity > inStock ? 1 : item.quantity })
                    }
                }
                dispatch({ type: 'ADD_CART', payload: newArr})
            }
            updateCart()
        }
    },[callBack])

    const handlePayment = async() => {
        if(!address || !mobile) return dispatch({type:"NOTIFY", payload: {error: "Please add address and mobile number."}})
        let newCart = [];
         for(const item of cart){
             const res = await getData(`product/${item._id}`)
             if(res.product.inStock - item.quantity >= 0){
                 newCart.push(item)
             }
         }
         if(newCart.length < cart.length){
             setCallBack(!callBack)
             return dispatch({type:"NOTIFY", payload: {error: "The product is out of stock or the quantity is insufficient."}})
         }
         dispatch({type:"NOTIFY", payload: {loading: true}})

         postData('order', {address, mobile, cart, total}, auth.token)
         .then(res => {
             if(res.err) return dispatch({ type: "NOTIFY", payload: {err: res.err}})
             dispatch({ type: "ADD_CART", payload: []})

             const newOrder = {
               ...res.newOrder,
               user: auth.user
             }

             dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder]})
             dispatch({ type: "NOTIFY", payload: {success: res.msg}})
             return router.push(`/orders/${res.newOrder._id}`)
         })
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
           
                 <Link href={auth.user ? '#!': '/signin'}>
                    <button onClick={handlePayment} className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-green-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-green-600">
                        Checkout
                    </button> 
                  </Link>      

            

              
        </div>

        </div>
    )

}

export default Cart