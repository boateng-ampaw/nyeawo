import { useState } from "react";
import { useRouter } from "next/router"
import Link from "next/link";
import Image from 'next/future/image'
import Head from 'next/head'
import useAuthUser from "../../hooks/auth";
import Product from "../../components/layout/main/products/product"
import productDetailStyles from '../../components/styles/product-detail.module.css'
import ReportProductForm from "../../components/layout/main/products/report-product-form";
// import { map, isEmpty } from 'lodash'
import "slick-carousel/slick/slick.css"; 
import { Tooltip, Whisper } from 'rsuite';
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaPhoneAlt } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos, MdDeliveryDining, MdOutlineLocalOffer, MdOutlineFavoriteBorder } from 'react-icons/md'
import { TiWarning } from 'react-icons/ti'
import { IoReturnUpBack } from 'react-icons/io5'
import 'rsuite/dist/rsuite.min.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export default function TestComponent({product_detail}){
    const router = useRouter()
    const [contactChannel, setContactChannel] = useState({contact: false, whatsapp: false})
    const {data,loading,loginError,mutate, isLoggedIn, user} = useAuthUser()

    const followStore_tooltip = (
      <Tooltip>
        This is a help <i>tooltip</i> .
      </Tooltip>
    );

    if(router.isFallback) return (
        <div className="container">
          <div className="row">
            <div className="col-lg">
            <Skeleton className='' count={1} height={100} width={`100%`} />
            </div>
    
            <div className="col-lg">
            <Skeleton className='' count={1} height={100} width={`100%`} />
            </div>
          </div>
    
        </div>)

        // console.log('Product detail',product_detail);

        const slides2 = product_detail.images.gallery.map(gallery=>gallery)

        const ArrowLeft = ({ currentSlide, slideCount, ...props }) => (
            <button
                {...props}
                className={
                  "position-absolute top-50 start-0 translate-middle-y slider-btn prev rounded-circle shadow-lg mx-2 border-0 slick-arrow" +
                  (currentSlide === 0 ? " slick-disabled" : "")
                }
                aria-hidden="true"
                aria-disabled={currentSlide === 0 ? true : false}
                type="button"
                >
                  <MdOutlineArrowBackIos className="fs-4" />
                </button>
          );
          const ArrowRight = ({ currentSlide, slideCount, ...props }) => (
              <button
                  {...props} 
                  className={
                    "slick-arrow position-absolute top-50 end-0 translate-middle-y slider-btn next rounded-circle shadow-lg mx-2 border-0" +
                    (currentSlide === slideCount - 1 ? " slick-disabled" : "")
                  }
                  aria-hidden="true"
                  aria-disabled={currentSlide === slideCount - 1 ? true : false}
                  type="button"
                  
                  >
                    <MdOutlineArrowForwardIos className="fs-4" />
                  </button>
          );
      
          const settings = {
            customPaging: function(i) {
              return (
                <a>
                  <Image className="img-fluid" src={slides2[i]} width={730} height={730} alt={`alt`} />
                </a>
              );
      
            },
            dots: true,
            dotsClass: `slick-dots position-relative ${productDetailStyles.slickThumb} pt-3`,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: <ArrowLeft />,
            nextArrow: <ArrowRight />,
          };

        const showContactChannel = (channel)=>{      
        setContactChannel(prev=>{
            return {...prev,[channel]: true}
        })
        }


        const followStore = (userIsLoggedIn,store_id) => {

          if(userIsLoggedIn){

            // console.log('Run the follow script', store_id, router.asPath);

          } else {
            console.log('Login first', router.asPath, router.pathname, router);

            router.push({
              pathname: `/login`,
              query: {
                action: 'follow store',
                store: store_id,
                return : router.asPath
              }
            })
          }
            
          }



    return (
        <div>
            <style jsx >
                {`
                
                `}
            </style>
            <Head>
                <title>{product_detail.title}</title>
            </Head>


            {/* <h5>{product_detail.title}</h5> <hr/>

            More from seller <br/>
            {
                product_detail.more_from_seller ? product_detail.more_from_seller.map(item=>{
                    return <Link key={`${item.id}_test`} href={`/test/${item.slug}`}><a className="me-3">{item.title}</a></Link>
                }) : ''
            } <hr/>

            Related products <br/>
            {
                product_detail.related_products ? product_detail.related_products.map(item=>{
                    return <Link key={`${item.id}_test`} href={`/test/${item.slug}`}><a className="me-3">{item.title}</a></Link>
                }) : ''
            } */}


<section className="pt-4 pt-lg-5 mb-5 pb-5">
          <div className="container">
            {/* <div>
              {JSON.stringify(product_detail)}
            </div> */}
            <div className="row gx-lg-5">

              <div className="col-lg-8 mb-4 mb-lg-0">
                <div className={`${productDetailStyles.productGalleryWrap}`}>
                  
                    <div className={`${productDetailStyles.productGallery} mb-3 mb-lg-0`}>
                               
                    <Slider {...settings} className={`${productDetailStyles.productGallerySlider} position-relative`}>
                      {
                        slides2.map((slide,index)=>{
                          return (
                            <div key={index}>
                              <Image className="img-fluid object-fit-contain" priority={true} src={slide} key={index} width={730} height={730} alt={product_detail.title} />
                            </div>
                          )
                        })
                      }
                    </Slider>

                    </div>
                </div>
              </div>

              <div className="col-lg-4">

                <div className={`${productDetailStyles.productDetailWrap}`}>
                  <div className="mb-3 pb-2 d-flex align-items-center">
                    <Link href={product_detail.store.store_link}><a className="text-decoration-none text-secondary nyeawo-btn nyeawo-btn-simple me-4 medium" dangerouslySetInnerHTML={{__html: product_detail.store.name}}></a></Link>
                    <p className="text-decoration-none nyeawo-btn nyeawo-btn-primary mb-0 pointer" onClick={()=>{followStore(isLoggedIn,product_detail.store.id)}}><span className="material-icons-outlined me-1" >favorite_border</span> Follow store</p>
                  </div>
                  <h2 className="secondary-font mb-3 text-dark text-capitalize" dangerouslySetInnerHTML={{__html: product_detail.title}}></h2>
                  <h6 className="fw-normal text-dark rounded-pill bg-dark d-inline text-white py-1 px-2">GHS{product_detail.regular_price}</h6>
                  <div className="text-dark fw-normal lh-base mb-5 mt-4 pt-2" dangerouslySetInnerHTML={{__html: product_detail.description}}></div>

                  <div className={`${productDetailStyles.productCTAs} border border-white-50 bg-light px-4 py-4 rounded-4 mb-5`}>
                    <div className="row">
                      <div className="col-6 border-end border-white-50">
                        <div>
                          <div className="mb-2 d-flex align-items-center"><FaPhoneAlt className="text-secondary me-2 medium" /> <span className="medium text-secondary">Phone</span></div>
                           <p className={`mb-0 text-black ${!contactChannel.contact ? 'pointer' : ''} fs-6`} onClick={()=>{!contactChannel.contact ? showContactChannel('contact') : null}}>{contactChannel.contact ? <Link href={`tel:${product_detail.store.store_contact_number}`}><a className="text-decoration-none text-dark fw-semibold" target="_blank">{product_detail.store.store_contact_number}</a></Link> : <span className="fw-semibold">Show Contact</span>}</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="ps-2">
                          <div className="mb-2 d-flex align-items-center"><RiWhatsappFill className="text-secondary me-2 fs-5" /> <span className="medium text-secondary">WhatsApp</span></div>
                           <p className={`mb-0 text-black ${!contactChannel.whatsapp ? 'pointer' : ''} fs-6`} onClick={()=>{!contactChannel.whatsapp ? showContactChannel('whatsapp') : null}}>{contactChannel.whatsapp ? <Link href={`https://api.whatsapp.com/send?phone=${product_detail.store.store_whatsapp_number}&text=I saw your ${product_detail.store.name} Ad on Nyeawo.com`}><a className="text-decoration-none text-dark fw-semibold" target="_blank">{product_detail.store.store_whatsapp_number}</a></Link> : <span className="fw-semibold">Show WhatsApp</span>} </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    

                    <div className="accordion" id="accordionFlushExample">
                      <div className="accordion-item">
                        <div className="accordion-header" id="flush-headingOne">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          <span className="pe-2"><MdDeliveryDining className="fs-5" /></span> Delivery
                          </button>
                        </div>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body" dangerouslySetInnerHTML={{__html: product_detail.store.delivery_info}}></div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div className="accordion-header" id="flush-headingTwo">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                          <span className="pe-2"><IoReturnUpBack className="fs-5" /></span> Return Policy
                          </button>
                        </div>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body" dangerouslySetInnerHTML={{__html: product_detail.store.return_policy}}></div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div className="accordion-header" id="flush-headingThree">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                          <span className="pe-2"><MdOutlineLocalOffer className="fs-5" /></span> Offers
                          </button>
                        </div>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body" dangerouslySetInnerHTML={{__html: product_detail.product_offer}}></div>
                        </div>
                      </div>
                    </div>

                  </div>


                  <div className={`${productDetailStyles.securityInfo} d-flex align-items-center border-top pt-4 mb-4`}>
                    <TiWarning className="text-warning flex-grow-0 flex-shrink-0 me-2 text-center fs-4" style={{width: '35px',height: '35px',lineHeight: '35px'}} />
                    <div className="medium text-dark" style={{maxWidth: '350px'}}><span className="fw-bold">Security tip:</span> Transactions with buyers should be done in an open space or public areas.</div>
                  </div>

                  <ReportProductForm productId={product_detail.id} productTitle={product_detail.title} />


                </div>

              </div>

            </div>
          </div>
        </section>

        <section className="mb-5">
          <div className="container">
            <div className="d-flex justify-content-between border-bottom pb-4 mb-4">

              <div className="">
                  <div>
                    <h5 className="text-dark fw-semibold">More from this shop</h5>
                  </div>
              </div>

              <div className="">
                  <div>
                    <Link href={product_detail.store.store_link}><a className="text-decoration-none nyeawo-btn nyeawo-btn-primary px-3">See more</a></Link>
                  </div>
              </div>

            </div>
              <div className="row gx-lg-5">

                <div className="col-lg-5 mb-4 mb-lg-0">
                    <div className={`${productDetailStyles.storeDetailWrap}`}>
                      <div className={`${productDetailStyles.storeDetail} d-flex mb-4`}>
                        <div className={`me-3`}>
                          <Link href={product_detail.store.store_link}>
                            <a className={`${productDetailStyles.storeLogo} bg-light flex-shrink-0 flex-grow-0`}>
                              <Image className="img-fluid object-fit-cover" src={product_detail.store.store_logo || `/images/img-placeholder.png`} alt={product_detail.store.slug} width={300} height={300} />
                            </a>
                          </Link>
                        </div>
                        <div className="pt-3">
                          <h6 className="mb-1"><Link href={product_detail.store.store_link}><a className="text-decoration-none text-dark" dangerouslySetInnerHTML={{__html: product_detail.store.name}}></a></Link></h6>
                          <div className="text-secondary">{product_detail.store.store_location}</div>
                        </div>
                        <div className="ms-auto">
                          
                          <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>Follow this store</Tooltip>}>
                            <span className="nyeawo-icon-bnt pointer fs-3" onClick={()=>{followStore(isLoggedIn,product_detail.store.id)}}>
                            <MdOutlineFavoriteBorder className={`${product_detail.id}`} />
                            </span>
                          </Whisper>
                        </div>
                      </div>
                      <p className={`${productDetailStyles.storeDescription}`} dangerouslySetInnerHTML={{__html: product_detail.store.store_description}}></p>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="row gy-4 gy-lg-0">
                      {/* {JSON.stringify(product_detail.more_from_seller)} - {typeof product_detail.more_from_seller} */}

                      { product_detail.more_from_seller ?
                        product_detail.more_from_seller.map(item=>{
                          return (
                            <div key={item.id} className="col-6 col-lg-4">
                              <Product {...item} showStore={false} />
                            </div>
                          )
                        }) : ''
                      }


                    </div>
                </div>

              </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="d-flex justify-content-between border-bottom pb-4 mb-4">

              <div className="">
                  <div>
                    <h5>Related products</h5>
                  </div>
              </div>

              <div className="">
                  <div>
                    <Link href={`/`}><a className="text-decoration-none nyeawo-btn nyeawo-btn-primary px-3">See more</a></Link>
                  </div>
              </div>

            </div>
              <div className="row">
              {/* {JSON.stringify(product_detail.related_products)} - {typeof product_detail.related_products} */}

                     { product_detail.related_products ?
                        product_detail.related_products.map(item=>{
                          return (
                            <div key={item.id} className="col-6 col-lg-3">
                              <Product {...item} showStore={true} />
                            </div>
                          )
                        }) : ''
                      }

              </div>
          </div>
        </section>

        <div> 
        </div>

        </div>
    )
}

export async function getStaticPaths(){
    const resp = await fetch(`https://nyeawo.com/apis/products.php?limit=10`)
    const data = await resp.json()

    let paths = data.all_products.map(product=>{
        return {
            params: {
                p_id: product.slug.toString()
            }
        }
    })



    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(ctx){
    const {params} = ctx
    const page_name=params.p_id ? `product_slug=${params.p_id}` : ''

    const resp = await fetch(`https://nyeawo.com/apis/products.php?${page_name}`)
    const data = await resp.json()

    // console.log(data);

    return {
        props: {
            product_detail: data.all_products ? data.all_products[0] : {}
        }
    }
}