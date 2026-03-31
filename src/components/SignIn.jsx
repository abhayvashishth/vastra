import { useContext } from 'react'
import { SupabaseContext } from '../context/SupabaseContext'
import Passinput from './Passinput'

function SignIn() {
    const {setLoginState, setEmail, email} = useContext(SupabaseContext)
  return (
    <div className='flex flex-col sm:min-w-[350px] min-w-200px gap-1 '>
         <div className='flex flex-col gap-1'>
             <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
             <Passinput/>
         </div>
        <div className='flex justify-between text-sm'>
           <p className='cursor-pointer'>Forgot your password</p>
           <p onClick={()=>setLoginState('SignUp')} className='cursor-pointer'>Create Account</p>
        </div>
    </div>
  )
}

export default SignIn 