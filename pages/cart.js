import Head from "next/head";
import Link from 'next/link'
import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { DataContext } from "../store/GlobalState";
import { getData } from "../utils/fetchData";

const Cart = () => {
    const {state,dispatch} = useContext(DataContext)
    const { cart,auth } = state

    const [total,setTotal] = useState(0)

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

    if(cart.length === 0 ) return<div className="flex justify-center "><img className="w-96 h-96" src="box.svg" alt="not empty"/></div> 
    return(
        <div>
            <Head>
                <title>Cart</title>
            </Head>
        <div class="px-6 py-8 text-left text-lg font-medium text-gray-900 uppercase tracking-wider">Shopping Cart</div>
        <div class="flex flex-col items-center">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">

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
            <div className="mx-10 text-xl">Total: ${total}.00</div>
            <Link href={auth.user ? '#': '/signin'}>
            <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-green-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-green-600">
                Checkout
            </button> 
            </Link>                 
        </div>

        </div>
    )

}

export default Cart