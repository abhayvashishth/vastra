import {useContext} from 'react'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import { SupabaseContext } from '../context/SupabaseContext';
import { assets } from '../assets/assets';
import Profile from '../components/Profile';


const Login = () => { 

  const { signUpUserWithEmailAndPassword, loginUserWithEmailAndPassword, loginState, email, password, signUpWithGoogle, user, loading} = useContext(SupabaseContext);

if(user === null){
    
  return (
    <div className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'> {loginState} </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>

      <form className='flex flex-col' onSubmit={(e)=>{
        e.preventDefault();
        if(loginState === 'Login'){
          loginUserWithEmailAndPassword(email, password);
        }else{
          signUpUserWithEmailAndPassword(email, password)
        }
      }}>
         {loginState === 'Login' ? <SignIn/> : <SignUp/>}
         

          {
            loading? <button className='bg-black text-white font-light px-8 py-2 mt-4' type='button'>Loading...</button> : <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'> {loginState === 'Login' ? 'Sign In' : 'Sign Up'} </button>

          }
              {/* Google Button */}
           <button onClick={signUpWithGoogle} type='button' className="flex items-center justify-center bg-white border border-gray-300 rounded-md py-2 px-4 shadow-sm hover:shadow-md transition-shadow duration-300"
>
        <img src={assets.google_logo}  alt="Google Logo" className="mr-2 w-8"/>
      Sign in with Google
    </button>

      </form>
      
    </div>
  )
}
return (
  <Profile name={user.displayName} bio={"A Student"} profilePicture={user.photoURL} skills={["Coding", "Travelling"]} email={user.email}/>
)
}

export default Login