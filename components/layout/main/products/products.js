import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import { orderBy } from "lodash";
import Product from "./product"
import 'material-icons/iconfont/outlined.css'
import useGetProducts from "../../../../hooks/getProducts";
import SortProducts from "../sort";
import SelectedFilters from "../selected-filters";
import Filters from "../filters";
import Skeleton from 'react-loading-skeleton'
import ProductListLoaderSkeleton from "../../../utils/product-list-loader-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import VariableGoogleAd from "../../../ads/variableGoogleAd";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'
import { Notification, Placeholder, Loader } from 'rsuite';


// {products=[],current_page='',total_pages}
export default function Products(props){
  const router = useRouter()
  const {data,isLoading,isError, mutate} = useGetProducts(router.query)
  const [products,setProducts] = useState({})

  // console.log('useGetPdts',data);

  useEffect(()=>{
    // console.log('Run useEffect');
    // setProducts(getProducts)
  // console.log('SWR Pdts',products);
    
  },[data])

  // if(isLoading) return 'Loading...'
  // if(isError) return 'Error...'

    return (

      <div className={`productsWrap`}>
        {/* <VariableGoogleAd currentPath={router.asPath} slot="5961623171" /> */}

        {/* {JSON.stringify(products)} */}

                <div className={`productsCountSort mb-4`}>
                  <div className='row justify-content-lg-between'>
                  <div className='col-sm-6 col-lg-auto order-lg-2'>
                    <SortProducts />
                  </div>
                  <div className='col-sm-6 col-lg-auto d-lg-none order-lg-3 mt-4 mt-sm-0'>
                  <button type="button" className="btn w-100 btn btn-outline-dark fw-semibold" data-bs-toggle="modal" data-bs-target="#mobileFilters">Filters</button>
                  </div>
                  <div className="modal fade" id="mobileFilters" tabIndex="-1" aria-labelledby="mobileFiltersLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen-md-down">
                      <div className="modal-content">
                        <div className="modal-header px-lg-4">
                          <h1 className="modal-title fs-5 fw-semibold text-dark" id="mobileFiltersLabel">Filters</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-5 px-lg-4">                          
                          <Filters />
                        </div>
                        <div className="modal-footer px-lg-4">
                        
                        {isLoading ? <div className="text-center w-100"><Loader speed="fast" /></div> : <button type="button" className="btn btn-primary w-100" data-bs-dismiss="modal">{data.all_products?.length ? `Show ${data.all_products?.length} results` : 'No products found'}</button> }
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-lg-auto order-lg-1 mt-4 mt-lg-0'>
                    <p className='text-secondary small' >{data.all_products !== undefined ? `${data.all_products.length}${(data.current_page < data.total_pages) ? '+' : ''} product${+data.all_products.length > 1 ? 's' : ''}` : ''} </p>
                  </div>
                  </div>
                </div>

                <div className={`mb-5`}>
                  <SelectedFilters />
                </div>


                <div className={`allProducts`}>
                  <div className='row'>
                  {/* <ProductListLoaderSkeleton count={8} /> */}
                    
                    {
                      isLoading ? <ProductListLoaderSkeleton count={8} /> : (
                        data.all_products.map(product=>{
                          return (
                            <div key={product.id} className={`col-6 col-md-4 col-lg-3 mb-5`}>
                              <Product {...product} showStore={true} />
                            </div>
                          )
                      })
                      )
                    }

                    {
                      (data.all_products !== undefined && data.all_products.length === 0 ) ? (
                        <>
                        <h4 className="secondary-text text-dark mb-2">{`We can't find any products matching your filter`}</h4>
                        <p className="fs-6">Try different filters or clear the existing filters or call <span className="fw-semibold text-dark">0546.72.72.95</span> for assistance</p>
                        </>
                      ) : ''
                    }

                        {
                          (data.current_page && 1 < +data.current_page < data.total_pages) && <>
                          
                            <div className="col-12">
                              <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center">
                                  <li className={`page-item ${(data.current_page && +data.current_page <= 1) ? 'disabled' : ''}`}>
                                    <Link
                                        href={{
                                            pathname: router.pathname,
                                            query: { ...router.query, pg: data.current_page-1 },
                                        }}
                                        shallow={true}
                                    ><a className="page-link" aria-label="Previous"><span aria-hidden="true"><IoIosArrowBack className={`page-item ${(data.current_page && +data.current_page <= 1) ? 'fs-5 text-muted' : ''}`} /></span></a></Link>                                                     
                                  </li>

                                  {
                                    (data.current_page > 1) ? <>
                                      <li className="page-item disabled" aria-current="page"><span className="page-link">Page {data.current_page}</span></li>                                    
                                    </> : ''
                                  }                                
                                  
                                  
                                  <li className={`page-item ${(data.current_page >= data.total_pages) ? 'disabled' : ''}`}>
                                        <Link
                                        href={{
                                            pathname: router.pathname,
                                            query: { ...router.query, pg: data.current_page+1 },
                                            
                                        }}
                                        shallow={true}
                                    ><a className="page-link text-decoration-none" aria-label="Next"><span aria-hidden="true"><IoIosArrowForward className="fs-5" /></span></a></Link>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          
                          </>
                        }

                    
                    
                    
                  </div>
        </div>

              </div>
        
    )
}