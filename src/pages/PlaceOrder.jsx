import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from './CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import { SupabaseContext } from '../context/SupabaseContext'


const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const {navigate} = useContext(ShopContext)
  const [userData, setUserData] = useState({});
  const {formData, setFormData} = useContext(SupabaseContext)
  
  

 
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------------- Left Side ------------------ */}
      <form className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>

          <input onChange={(e)=>{
            let fn = e.target.value;
            setUserData((prev)=>({...prev, firstName: fn}))
          }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type="text" placeholder='First name' />

          <input onChange={(e)=>{
            let ln = e.target.value;
            setUserData((prev)=>({...prev, lastName: ln}))
          }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type="text" placeholder='Last name' />
        </div>

        <input onChange={(e)=> {
          let em = e.target.value;
          setUserData((prev)=>({...prev, email: em}))
        }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type="email" placeholder='Enter your email address' />

        <input onChange={(e)=>{
          let sa = e.target.value;
          setUserData((prev)=> ({...prev, streetAddress: sa}))
        }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type="text" placeholder='Street address' />

        <div className='flex gap-3'>

          <input onChange={(e)=>{
            let ct = e.target.value;
            setUserData((prev)=>({...prev, city: ct}))
          }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type="text" placeholder='City' />

          <input onChange={(e)=>{
            let st = e.target.value;
            setUserData((prev)=>({...prev, state: st}))
          }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type="text" placeholder='State' />

        </div>

        <div className='flex gap-3'>

          <input onChange={(e)=>{
            let zc = e.target.value;
            setUserData((prev)=> ({...prev, zipcode: zc}))
          }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type='text' placeholder='Zip code' />

          <input onChange={(e)=>{
            let cn = e.target.value;
            setUserData((prev)=>({...prev, country: cn}))
          }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type="text" placeholder='Country' />
        </div>

        <input onChange={(e)=>{
          let ph = e.target.value;
          setUserData((prev)=> ({...prev, phone: ph}))
        }} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' required type='number' placeholder='Phone' />

       <button onClick={(e)=>{
        e.preventDefault()
        let tempData = structuredClone(userData);
        let tArray = []
        for(const items in tempData){
          tArray.push({
            [items]: tempData[items]
          })
        }
        if(tArray.length >= 9){
          setFormData(tArray)
          toast.success('Your form is submitted')
          console.log(formData)
        }else{
          toast.error('Form is Incomplete')
        }

       }} className='bg-black text-white rounded py-2.5 transition-all duration-200 border border-black hover:bg-white hover:text-black px-3.5 w-full'>Submit</button>

      </form>

                  {/* ------------ Right Side ------------------- */}

         <div className='mt-8'>
          
          <div className='mt-8 min-w-80'>
            <CartTotal/>
          </div>

          <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>

            {/* ------------- Payment Method Selection ------------- */}

            <div className='flex gap-3 flex-col lg:flex-row'>

              <div onClick={()=>setMethod('stripe')} className={`flex rounded-lg items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'stripe' ? 'border-green-400' : ''} `}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
                <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
              </div>

              <div onClick={()=>setMethod('razorpay')} className={`flex rounded-lg items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'razorpay' ? 'border-green-400' : ''} `}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''} `}></p>
                <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
              </div>

              {/* Stripe integration removed - add back when implementing payments */}

              <div onClick={()=>setMethod('cod')} className={`flex rounded-lg items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'cod' ? 'border-green-400' : ''} `}>
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''} `}></p>
                <p className='text-gray-500 text-sm font-medium'>CASH ON DELIVERY</p>
              </div>

            </div>
            <div className='w-full text-end mt-8'>
              <button onClick={()=>{
                if(formData.length >= 9){
                  navigate('/orders')
                }else{
                  toast.error('Submit your form first')
                }
              }} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
          </div>
          </div>    
    </div>
  )
}

export default PlaceOrder