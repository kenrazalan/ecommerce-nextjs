import Head from 'next/head'
import { useState } from 'react'
import ProductItem from '../components/ProductItem'
import {getData} from '../utils/fetchData'

export default function Home(props) {

  const [products,setProducts] = useState(props.productProps)
  return (
    <div className="grid grid-cols-3 justify-center">
      <Head>
        <title>Home</title>
      </Head>
      {
        products.length === 0 
        ? <h2>No Products</h2>
        : products.map(product => (
          <ProductItem key={product._id} product={product}/>
        ))
      }
    </div>
  )
}
 
export async function getServerSideProps() {
  const res = await getData('product')
  console.log(res)
  return {
    props: {
      productProps: res.products,
      result: res.result
    }
  }
}