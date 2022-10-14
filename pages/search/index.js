import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Image from 'next/future/image'
import Products from '../../components/layout/main/products/products'
import { BiSliderAlt } from 'react-icons/bi'
import { FiSliders } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

export default function SearchHome(){
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')


    const handleSearchQuery = (e)=>{
        const textVal = e.target.value
        setSearchQuery(textVal)
    }

    const deleteSearchQuery = ()=>{
        console.log('Delete search query', router.query);
        router.push({
            pathname: router.pathname,
            query: {}
        },undefined,{shallow: true})


        setSearchQuery('')
    }

    
    useEffect(()=>{

        console.log(router);
        if(router.isReady)
        setSearchQuery(router.query.s)

    },[router.query,router.isReady])

    return <>
    <style jsx>
        {
            `
            textarea:hover, 
            input:hover, 
            textarea:active, 
            input:active, 
            textarea:focus, 
            input:focus,
            button:focus,
            button:active,
            button:hover,
            label:focus,
            .btn:active,
            .btn.active
            {
                outline:0px !important;
                -webkit-appearance:none;
                box-shadow: none !important;
            }
            `
        }
    </style>
    <section className="py-5">
        <div className="container">
            <div className="row">
                <div className="col-lg-7 mx-auto">
                    <div className={`py-4 pt-lg-5`}>
                        <h2 className="text-center mb-4 fw-semibold"> {router.query.s ? <>Results for <span className="text-dark">{router.query.s}</span></> : <span className="text-dark">Search</span> } </h2>
                        <form className="">
                            <div className="border rounded-4 d-lg-flex align-items-center justify-content-between px-2 py-2 px-lg-3 py-lg-3">
                                <div className="flex-fill d-flex align-items-center justify-content-between">
                                <div className="flex-fill">
                                    <input className="border-0 bg-transparent w-100 fs-5" onChange={(e)=>handleSearchQuery(e)} type="text" placeholder='Search for anything you need' name="s" value={searchQuery} />
                                </div>
                                {
                                    searchQuery ? <div className="pointer text-danger" style={{height: '40px'}} onClick={deleteSearchQuery}><span className="nyeawo-icon-bnt pointer fs-3 h-100 bg-white"><GrClose className="text-dark fs-5" /></span></div> : ''
                                }
                                </div>
                                
                                <div className="text-center pt-2 pt-lg-0 ps-3">
                                    <button className="border-0 bg-transparent"><span className="text-primary text-uppercase fw-semibold" style={{fontSize: '13px'}}>Search</span></button>
                                </div>  
                            </div>
                        </form>
                    </div>

                    {
                        router.query.s ? (
                            <div className="mb-lg-4">
                            <button type="button" className="btn btn-lg btn-outline-dark border-secondary fw-normal d-none d-lg-flex align-items-center justify-content-center mx-auto px-3" data-bs-toggle="modal" data-bs-target="#mobileFilters">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{display:'block',height:'14px',width:'14px',fill:'currentColor'}} aria-hidden="true" role="presentation" focusable="false" className="me-2"><path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg>
                                <span className="fs-6">Filter products</span>
                            </button>
                            </div>
                            ) : ''
                    }

                    


                </div>

                

                <div className="col-lg-10 mx-auto">
                    {
                         router.query.s ? <Products showStores={true} /> : <div className="text-center mt-4 fs-4">You forgot to enter a search term! <Image src='/images/curved-arrow-svgrepo-com.svg' width={60} height={60} /></div>
                    }
                    
                </div>

            </div>
        </div>
    </section>
    </>
}