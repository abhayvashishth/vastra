import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import SupabaseProvider from './context/SupabaseContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <SupabaseProvider>
     <ShopContextProvider>
           <App />  
     </ShopContextProvider>
    </SupabaseProvider>
   </BrowserRouter>
)
