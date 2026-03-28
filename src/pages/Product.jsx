import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import {assets} from "../assets/assets"
import RelatedProducts from '../components/RelatedProducts'
import { SupabaseContext } from '../context/SupabaseContext'

const Product = () => {
  const {productId} = useParams()
  const {products, currency, addToCart} = useContext(ShopContext)
  const {user} = useContext(SupabaseContext)
  const [productData, setProductData] = useState()
  const [image, setImage] = useState('')
  const [random, setRandom] = useState(Math.floor(Math.random()*99 + 133))
  const [size, setSize] = useState('');
  const navigate = useNavigate()

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id == productId){
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(()=>{
    fetchProductData()
  }, [productId])

  return productData ? (
    <div className='border-T-2 PT-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-5 '>
            {
              productData.image.map((item, index)=>(
                <img onClick={()=>{setImage(item)}} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' />
              ))
            }

          </div>
          <div className='w-full sm:w-[80%] ' >
            <img className='w-full h-auto' src={image} alt="" />

          </div>
        </div>
        {/* ----------- Product Info ------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_dull_icon} alt="" className='w-3 5' />
              <p className='pl-2'> ({random}) </p>
              
          </div>
          <p className='mt-5 text-2xl font-medium'> {currency} {productData.price} </p>
          <p className='mt-5 text-gray-500 md:w-4/5'> {productData.description} </p>

                              {/* ----------------------- Product Sizes ------------------------- */}

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index)=>(
                <button onClick={()=> size === item ? setSize('') : setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-yellow-700 bg-yellow-500 text-white ' : '' } `} key={index}> {item} </button>
              ))}
            </div>
          </div>

                              {/*------------------------- Add To Cart -----------------------------  */}

          <button onClick={()=>{
            if(!user){
              navigate('/login')
            }else{ addToCart(productData._id, size)}
              
          }} className='bg-yellow-500 hover:bg-white hover:text-black border-yellow-700 border transition-all duration-500 rounded-lg text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 h-[2px] bg-gray-300 ' />

                               {/* --------------------------- Lies ------------------------------- */}

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-2'>
            <div className='flex gap-2' >
              <img className='w-5' src={assets.authentic_icon} alt="" />
              <p>100% Original product</p>
            </div>

            <div className='flex gap-2' >
              <img className='w-5' src={assets.cod_icon} alt="" />
              <p>Cash on delivery is available on this product</p>
            </div>

            <div className='flex gap-2' >
              <img className='w-5' src={assets.exchange_icon} alt="" />
              <p>Easy return and exchange policy within 7 days</p>
            </div>

          </div>
        </div>

      </div>

                  {/* ------------- Description & Review Section ------------ */}

              <div className='mt-20'>
                <div className='flex'>
                  <p className='border px-5 py-3 text-sm'>Description</p>
                  <p className='border px-5 py-3 text-sm'>Reviews ({random})</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim voluptas aliquid nemo veritatis, reprehenderit similique molestias numquam aspernatur sint optio laborum hic sit consectetur rerum sapiente magni voluptates quaerat id accusamus dolor fugit quis laudantium amet nulla. Doloribus autem ex voluptas, tempora accusamus consequatur perferendis. Nisi corporis dicta praesentium laborum!</p>
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit saepe voluptas obcaecati qui ex enim distinctio veritatis odit maiores aspernatur labore debitis, nihil ducimus dolores praesentium provident dignissimos. Repellat, minus? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim id similique rem, atque quasi eligendi officia corporis libero provident repudiandae tempora dicta dolore nulla deleniti incidunt labore delectus cum. Consequuntur, minus velit veniam, expedita dolorum alias, recusandae dicta dignissimos sequi inventore voluptates nulla ex vel eum id similique hic est.</p>
                </div> 
              </div>

                    {/* ----------- Display Related Products ----------------- */}

                    <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product