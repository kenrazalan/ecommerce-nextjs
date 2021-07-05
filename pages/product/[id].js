import {useContext, useState} from 'react'
import Head from 'next/head'
import { getData} from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Action'

const DetailProduct = (props) => {
    const [product ] = useState(props.product)
    const [tab,setTab] = useState(0)
    const {state,dispatch} = useContext(DataContext)

    const {cart} = state

    const isActive = (index) => {
        if(tab === index) return "active";
        return ""
    }

    return(
        <div className="flex flex-col justify-center md:flex-row rounded-xl shadow-lg m-7 bg-white">
            <Head>
                <title>Detail Product</title>
            </Head>
            <div className="flex flex-col justify-center p-4 md:max-w-[50%]">
                <img src={product.images[tab].url} alt={product} alt={product.images[tab].url}
                className="d-block img-thumbnail rounded mt-4 w-full" style={{height: '350px'}}/>
                <div className="flex mx-0 mt-1" style={{cursor: "pointer"}} >
                    {
                        product.images.map((img,i) => (
                            <img className={`img-thumbnail rounded ${isActive(i)}`} src={img.url} key={i} alt={img.url}
                            style={{height: "80px",width: '20%'}}
                            onClick={() => setTab(i)} />
                        ))
                    }
                </div>
            </div>
            <div className="flex flex-col p-8 md:mt-10">
                <h2 className="text-xl uppercase">{product.title}</h2>
                <h5 className=" text-red-500">₱ {product.price}.00</h5>
                <div className="mx-0 flex justify-between">
                    {
                        product.inStock > 0 
                        ? <h6 className="text-red-500">In Stock: {product.inStock}</h6>
                        : <h6 className="text-red-500">Out of Stock</h6>
                    }
                    <h6 className="text-red-500">Sold {product.sold}</h6>
                </div>
                <div className="my-2">{product.description}</div>
                <div className="my-2">{product.content}</div>
                <div className="flex mt-8">
                    <button 
                    onClick={() => {
                        dispatch(addToCart(product,cart))
                      }}
                    type="button" 
                    disabled={product.inStock === 0 ? true : false}
                    className={`${product.inStock === 0 && 'opacity-50 hover:bg-purple-500'} transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-8 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600`}>
                        Buy
                    </button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({params: {id}}) {

    const res = await getData(`product/${id}`)
    console.log(res)
    return {
      props: {
         product: res.product,
        // result: res.result
      }
    }
  }

export default DetailProduct