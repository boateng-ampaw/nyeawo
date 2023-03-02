import { useState,useEffect, useRef } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";


const userFetcher = async (url) => {
    const res = await fetch(`${url}`,{
      credentials: 'include'
    });
    let data = await res.json()

    // console.log(data);
    
    return data;
  }


  export default function useAuthUser(){
    const { data,mutate, error } = useSWR(`https://nyeawo.com/apis/login-api.php`, userFetcher, {revalidateOnMount: true});
    const router = useRouter()

    const loading = !data && !error;
    const isLoggedIn = data?.isLoggedIn
    const loginError = error && error.status === 403;

    useEffect(()=>{
        if(data){
        // if(data.isLoggedIn === false) router.push('/account/login')
      }
      },[data])


      return {
        loading,
        isLoggedIn,
        loginError,
        data,
        mutate
      };

  }