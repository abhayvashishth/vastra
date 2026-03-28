import React, { Component, useContext, useEffect } from 'react'
import { SupabaseContext } from '../context/SupabaseContext';
import { useNavigate } from 'react-router-dom';

function Protected(props) {
    const {Component} = props;
    const {user} = useContext(SupabaseContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])  // Re-check whenever user state changes
    

  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected