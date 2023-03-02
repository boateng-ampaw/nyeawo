import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import filter from 'lodash/filter';
import values from 'lodash/values';
import some from 'lodash/some';
import includes from 'lodash/includes';
import orderBy from 'lodash/orderBy';

const fetcher = async (url, params)=>{ 

    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    // console.log('Page number',`${url}?${queryString}`);
    
    // const isFilter = params.filter,
    //       min_price = params.min_price, 
    //       max_price = params.max_price,
    //       isDeliverable = params.delivery,
    //       searchQuery = params.s


    const resp = await fetch(`${url}?${queryString}`)
    const data = await resp.json()

    return data
}

export default function useGetProducts(filters){
    const {data,mutate, error} = useSWR([`https://nyeawo.com/apis/products.php`,{...filters,limit:60}],fetcher, { refreshInterval: 5000 })

    const router = useRouter()


    useEffect(()=>{
        // console.log('queryString', router.isReady, data);
    },[data])

    return {
        data: data ? data : [],
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}