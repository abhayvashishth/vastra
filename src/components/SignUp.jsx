import React, { useContext } from 'react'
import { SupabaseContext } from '../context/SupabaseContext'
import Passinput from './Passinput';

function SignUp() {
    const {setLoginState, setEmail, email} = useContext(SupabaseContext);

   
  return (
    <div className='flex flex-col sm:min-w-[350px] min-w-200px gap-1 '>
         <div className='flex flex-col gap-1'>
             <input onChange={(e)=>setEmail(e.target.value)}  value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
          <Passinput/>
         </div>
         <p onClick={()=>setLoginState('Login')} className='cursor-pointer text-sm'>Login Here</p>
      
    </div>
  )
}

export default SignUp 