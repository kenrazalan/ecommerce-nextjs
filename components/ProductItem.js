import Link from 'next/link'
import { useContext } from 'react'
import { addToCart } from '../store/Action'
import { DataContext } from '../store/GlobalState'

const ProductItem = ({product}) => {
    const {state,dispatch} = useContext(DataContext)
    const {cart} = state

    const userLink = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info flex-fill"
                        style={{marginRight:"5px"}}>View</a>
                </Link>
                <button className="btn btn-success ml-1 flex-fill"
                    style={{marginLeft:"5px"}}
                    >
                    BUY
                </button>
            </>
        )
    }
    return(

<div className="flex justify-center m-8">
  {/* <div className="absolute opacity-80 inset-0 z-0"></div> */}
  <div className="relative flex flex-col items-center justify-center">
    <div className="container">
      <div className="max-w-xs w-full bg-gray-900 shadow-lg rounded-xl p-5 ">
        <div className="flex flex-col">
          <div className="">
            <div className="relative h-62 w-full mb-3">
              <div className="absolute flex flex-col top-0 right-0 p-3">
                <button className="transition ease-in duration-300 bg-gray-800  hover:text-purple-500 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <img src={product.images[0].url} alt="Just a flower" className=" w-full h-[250px] object-fill  rounded-2xl"/>
            </div>
            <div className="flex-auto justify-evenly">
              <div className="flex flex-wrap ">
                <div className="flex items-center w-full justify-between min-w-0 ">
                <div className="text-xl text-white font-semibold mt-1">??? {product.price}.00</div>
                  
                  <div className="flex items-center  text-white text-sm ">
                    {product.inStock === 0 ? <div className="bg-red-500 px-2 py-1 ml-3 rounded-lg">Out of Stock</div> 
                    :<div> IN STOCK: <span className="bg-green-400 px-2 py-1 ml-3 rounded-lg">{product.inStock}</span> </div> }
                  </div>
                </div>
              </div>
                  <h2 className="text-sm mr-auto cursor-pointer text-gray-200 hover:text-purple-500 mt-2">
                    {product.description}
                 </h2>
              <div className="lg:flex  py-4  text-sm text-gray-600">
              </div>
              <div className="flex space-x-2 text-sm font-medium justify-between">
                <Link href={`product/${product._id}`}>
                    <button  className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600">
                    <span>View</span>
                    </button>
                </Link>
                <button disabled={product.inStock === 0 ? true : false}
                 className={`${product.inStock === 0 && 'opacity-50 hover:bg-green-400' } transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-green-400 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600`}
                 onClick={() => {
                  dispatch(addToCart(product,cart))
                }}>
                  <span>Buy</span>
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}

export default ProductItem












