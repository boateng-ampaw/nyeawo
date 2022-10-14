import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import filter from 'lodash/filter';
import values from 'lodash/values';
import some from 'lodash/some';
import includes from 'lodash/includes';
import orderBy from 'lodash/orderBy';

const fetcher = async (url, params)=>{ 

    // console.log('Params',url, params);

    // const current_category = params.category !== undefined ? `category=${params.category}` : ''
    // const page_num = params.pg !== undefined ? `pg=${params.pg}` : ''

    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');

    // console.log('Page number',`${url}?${queryString}`);
    
    const isFilter = params.filter,
          min_price = params.min_price, 
          max_price = params.max_price,
          isDeliverable = params.delivery,
          searchQuery = params.s

    // console.log('Search query',searchQuery);
        //   [lng,lat] = params.location

    // console.log(isFilter, min_price,max_price,isDeliverable);

        // console.log(page_num,'Location:', lng,lat);

        // console.log('Is delirable',isDeliverable);


    const resp = await fetch(`${url}?${queryString}`)
    const data = await resp.json()

    // console.log('Before filter',orderBy(data.all_products,'is_promoted',['desc']));
        

    // if(isFilter && (isDeliverable !== undefined)){
    //     data.all_products = filter(data.all_products,function(product){


    //         return ((isDeliverable !== undefined) ? (+isDeliverable === product.store.is_deliverable) : product)
    //     })

    // }

    // const searchedData = data.all_products.filter(a=> some(values(a),b => includes(b,searchQuery)));
        // console.log('Searched data',searchedData);

        // console.log(data.all_products.includes(searchQuery));

    // if(searchQuery) {
    //     // const searchedData = data.all_products.filter(a=> values(a).some(b => b.includes(searchQuery)));
    //     console.log('Searched data',searchedData);

    //     data.all_products = searchedData
    // }

    // console.log('After filter',data.all_products);

    return data
}

export default function useGetProducts(filters){
    const {data,mutate, error} = useSWR([`https://nyeawo.com/apis/products.php`,{...filters,limit:60}],fetcher, { refreshInterval: 5000 })

    const router = useRouter()

    // console.log('queryString',router.isReady);

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