import React, {useContext, useState, useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import SingleProduct from './SingleProduct'

function BestSeller() {
    console.log("1. Component is rendering...");

    const {products} = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(()=>{
        console.log("2. UseEffect is running and setting state...");
       const bestProducts = products.filter((item)=>(item.bestseller));
       setBestSeller(bestProducts.slice(0,5))
       
    }, [products])  
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLERS"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aperiam porro, dicta cumque temporibus alias dolore quod rerum sed repudiandae?
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item, index)=>(
                    <SingleProduct key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
                ))
            }

        </div>
    </div>
  )
}

export default BestSeller