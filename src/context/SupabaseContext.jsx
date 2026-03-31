import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { toast } from "react-toastify";

export const SupabaseContext = createContext();

const SupabaseProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState("Login");
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  // Watch for login/logout changes
  useEffect(() => {
    // Check if someone is already logged in when app starts
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
     
    });

    return () => subscription.unsubscribe();
  }, []);


  const signUpUserWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://vastra0.netlify.app'
      }
    });


    if (error) {
      setLoading(false);
      toast.error(error.message);
    } else {
      setLoading(false);
      setLoginState("Login");
      setUserName("");
      setEmail("");
      setPassword("");
      toast.success("Account created! Check your email to verify.");
    }
  };

  const loginUserWithEmailAndPassword = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setLoading(false);
      
      if (error.message.includes("Email not confirmed")) {
        toast.error("Please verify your email before logging in. Check your inbox.");
      } else {
        toast.error("Please check your credentials");
      }

      setPassword("");
      console.log(error);
    } else {
      setLoading(false);
      toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
    }
  };

  const signUpWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast.error(error.message);
    }
  };


  const logout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      setLoading(false)
    }
    setLoading(false)
  };

  const putData = async (table, data) => {
    const { error } = await supabase.from(table).insert(data);
    if (error) {
      toast.error(error.message);
    }
  };


  const value = {
    signUpUserWithEmailAndPassword,
    loginUserWithEmailAndPassword,
    putData,
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    loginState,
    setLoginState,
    signUpWithGoogle,
    user,
    setUser,
    logout,
    formData,
    setFormData,
    loading,
    passVisible,
    setPassVisible
  };

  return (
    <SupabaseContext.Provider value={value}>
      {props.children}
    </SupabaseContext.Provider>
  );
};

export default SupabaseProvider;
