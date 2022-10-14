import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import PageHeader from "../../components/layout/main/page-header";
import AsideCategories from "../../components/layout/main/aside-categories";
import Products from "../../components/layout/main/products/products";
import Filters from "../../components/layout/main/filters";
import { AppContext } from "../../components/utils/contexts";
import VariableGoogleAd from "../../components/ads/variableGoogleAd";


export default function Category({category,sub_categories}){
    const router = useRouter()       

    // console.log(router);

    if(router.isFallback) return 'Loading page...'
    
    // console.log(router.query);

    return <div>
        <PageHeader title={category.title} />

        <section className='py-5'>


        <div className='container'>
          <div className='row'>
            <div className='col-md-3 d-none d-md-block pe-lg-4'>
              <aside>
                <AsideCategories categories={sub_categories} category_type='sub_categories' sub_category_title={category.title} />
                <Filters />
              </aside>
            </div>
            <div className='col-md-9'>
              <Products />            
            </div>
          </div>

        </div>

      </section>

    </div>
}

export async function getStaticPaths (){

    const resp = await fetch(`https://nyeawo.com/apis/products.php`)
    const data = await resp.json()

    // console.log(`In staticPaths:, ${data} `);

    let paths = data.product_categories.map((category)=>{        
        return {
            params: {
                category: category.slug.toString()
            }
        }
    })

    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(ctx){

    // const {params,query} = ctx
    const {params} = ctx

    const current_category = params.category ? `category=${params.category}` : ''
    // const page_num_to_get = query.pg ? `pg=${query.pg}` : ''

    // const resp = await fetch(`https://nyeawo.com/apis/products.php?${current_category}&${page_num_to_get}`)
    const resp = await fetch(`https://nyeawo.com/apis/products.php?${current_category}`)
    const data = await resp.json()


    let category = data.product_categories.find((category)=> { return category.slug === ctx.params.category})
    const sub_categories = category.sub_categories.length ? category.sub_categories : []
    // const locations = data.locations.length ? data.locations : []

    console.log(params,category,sub_categories);


    if(category.length === 0) {
        return {
            notFound: true,
        }
    }


    return {
        props: {
            category,
            sub_categories
        },
        revalidate: 10,
    }
}