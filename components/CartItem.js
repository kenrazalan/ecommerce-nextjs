import Link from "next/link"
import { useState } from "react"
import { decrease, increase } from "../store/Action"
import Modal from "./Modal"


const CartItem = ({item,dispatch,cart}) => {
    const [toggle,setToggle] = useState(false)
    console.log(item)
    return(
        <>
        {
            toggle && (
                 <Modal toggle={toggle} setToggle={setToggle} item={item} cart={cart}/>
            )
        }
       
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={item.images[0].url} alt={item.name}/>
                </div>
                <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                    <Link href={`/product/${item._id}`}>
                         {item.title}
                    </Link>
                    </div>
                    <div className="text-sm text-gray-500">
                        {item.inStock > 0 
                        ? <p className=" text-red-500">In Stock: {item.inStock}</p>
                        : <p className="text-red-500">Out of Stock</p>
                        }
                    </div>
                </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {/* <div class="text-sm text-gray-900">Regional Paradigm Technician</div>
                <div class="text-sm text-gray-500">Optimization</div> */}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                {/* <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
                </span> */}
                <div className="h-[38px] rounded-[50px] border-solid border-[#D8D8D8] border  py-0 px-[20px] inline-flex items-center md:h-[49px]">
                    <button 
                        disabled={item.quantity === 1 ? true : false}
                        onClick={() => dispatch(decrease(cart, item._id))}
                        type="button"  className="text-[23px] font-normal">
                        -
                    </button>
                    <span className="text-[18px] my-0 mx-[18px] font-bold">{item.quantity}</span>
                    <button
                        disabled={item.quantity === item.inStock ? true : false}
                        onClick={() => dispatch(increase(cart, item._id))}
                        type="button" className="text-[23px] font-normal">
                        +
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₱ {item.price}.00
            </td>
            <td  className="cursor-pointer px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a onClick={() => setToggle(!toggle)} className=" p-3 text-indigo-600 hover:text-indigo-900">X</a>
            </td>
        </tr>
        </>
    )
}

export default CartItem