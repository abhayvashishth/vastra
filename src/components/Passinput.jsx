import { useContext } from "react"
import { SupabaseContext } from "../context/SupabaseContext"
import {assets} from '../assets/assets'


export default function Passinput(){
    const {password, setPassword, passVisible, setPassVisible} = useContext(SupabaseContext);

    return(
        <div className="pass-input-container">
             <input onChange={(e)=>setPassword(e.target.value)} value={password} type={passVisible? 'text' : 'password'} placeholder='Password' required/>
             <button onClick={()=>setPassVisible(prev=>!prev)} type="button" className={`toggle-password ${passVisible}`}><img src={passVisible?assets.eye_open : assets.eye_close} alt="" /></button>
        </div>
    )
}