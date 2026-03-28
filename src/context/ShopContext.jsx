import { createContext, useEffect, useState } from "react";
import {toast} from 'react-toastify'
import { useLocation, useNavigate} from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export const ShopContext = createContext();

const ShopContextProvider = (props) =>{
    const currency = '€ ';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Fetch products from Supabase
    const fetchProducts = async () => {
        try {
            setLoading(true);
            
            const { data, error } = await supabase
                .from('products').select('*').order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching products:', error);
                toast.error('Failed to load products');
                return;
            }


            // Transform data to match your existing product structure
            const transformedProducts = data.map(product => ({
                _id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image_urls,
                category: product.category,
                subCategory: product.subcategory,
                sizes: product.sizes,
                date: new Date(product.created_at).getTime(),
                bestseller: product.bestseller
            }));

            setProducts(transformedProducts);
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // Fetch products when component loads
    useEffect(() => {
        fetchProducts();
    }, []);

    const addToCart = async (itemId, size) => {
        if(!size) {
            toast.error("Select Products Size")
            return;
        }
       let cartData = structuredClone(cartItems)
       console.log(cartItems)

       if(cartData[itemId]) {
        if(cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        }else{
            cartData[itemId][size] = 1;
        }
       }else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
       }
       setCartItems(cartData)
   
    }
    
const getCartCount = () => {
    let totalCount = 0;
    for(const items in cartItems){
        for (const item in cartItems[items]){
            try {
                if(cartItems[items][item] > 0){
                    totalCount += cartItems[items][item]
                }
            } catch (error) {
                
            }
        }
    }
    return totalCount;
}

const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);
};

const getCartAmount = () => {
    let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo = products.find((product)=> product._id === items);
        for(const item in cartItems[items]){
            try {
                if(cartItems[items][item] > 0) {
                    totalAmount += itemInfo.price * cartItems[items][item];
                }
            } catch (error) {
                
            }
        }
    }
    return totalAmount;
}

useEffect(()=>{
    getCartCount()
}, [cartItems])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, getCartCount, updateQuantity,
        getCartAmount, navigate, location, loading,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}


export default ShopContextProvider;