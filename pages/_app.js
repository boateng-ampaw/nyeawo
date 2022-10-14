import { useEffect, useState } from 'react';
import Script from 'next/script';
import useSWR from 'swr'
import { AppContext } from '../components/utils/contexts';
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import NextNProgress from "nextjs-progressbar";
import Layout from '../components/layout/layout';
import useGetProducts from '../hooks/getProducts';

const fetcher = async ()=>{
  const resp = await fetch(`https://nyeawo.com/apis/products.php`)
  const data = await resp.json()

  // console.log(data);
  return data
}

function MyApp({ Component, pageProps }) {
  const {data,error} = useSWR('/all_products',fetcher)
  const checkForData = useGetProducts()

  // console.log('The SWR get pdts checker',checkForData);

  // console.log('Final data',data);

  const testObject = {
    // products: data ? data.all_products : [],
    products: data,
    isLoading: !error && !data,
    isError: error
  }


  const TestFunc = (param)=>{
    console.log(param);
  }

  useEffect(() => {
    typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
}, [])

// if(!data) return 'Loading...'

// if(error) return 'Error'

  return <>
  <NextNProgress color="#E20333" height={2} options={{ showSpinner: false }} />
  <AppContext.Provider value={{TestFunc, testObject, checkForData}}>    
    <Layout>
    <Component {...pageProps} />
    </Layout>
  </AppContext.Provider>
  </>
}

export default MyApp
