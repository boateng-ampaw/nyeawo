import { useState } from "react";
import Link from 'next/link'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import Head from 'next/head'
import productDetailStyles from '../../../components/styles/product-detail.module.css'
import Product from "../../../components/layout/main/products/product";
import ReportProductForm from "../../../components/layout/main/products/report-product-form";
import { map } from 'lodash'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaPhoneAlt } from 'react-icons/fa';
import { RiWhatsappFill } from 'react-icons/ri'
import { MdSecurity, MdOutlineArrowForwardIos, MdOutlineArrowBackIos, MdDeliveryDining, MdOutlineLocalOffer, MdFavoriteBorder, MdOutlineFavoriteBorder, IoMdClose } from 'react-icons/md'
import { TiWarning } from 'react-icons/ti'
import { IoReturnUpBack } from 'react-icons/io5'
import 'rsuite/dist/rsuite.min.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// const formInputs = {
//   fullname: '',
//   contact_number: '',
//   message: '',
//   k_hid_kformname0: 'kformname0'
// }


export default function ProductDetail(props) {
    const router = useRouter()
    const [contactChannel, setContactChannel] = useState({contact: false, whatsapp: false})
    // const [formInput, setFormInput] = useState(formInputs) 

  

    if(router.isFallback) return <div className="container">
      <div className="row">
        <div className="col-lg">
        <Skeleton className='' count={1} height={100} width={`100%`} />
        </div>

        <div className="col-lg">
        <Skeleton className='' count={1} height={100} width={`100%`} />
        </div>
      </div>

    </div>

  
    const slides2 = props.product.images.gallery.map(gallery=>gallery)

    // console.log('gallery',typeof props.product.images.gallery, typeof slides2);

    const showContactChannel = (channel)=>{      
      setContactChannel(prev=>{
        return {...prev,[channel]: true}
      })
    }

    // const reportProduct = (product_id)=>{
    //   console.log(product_id);
    // }    

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
            <Image className="img-fluid" src={slides2[i]} width={730} height={730} alt={``} />
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

    const followStore = (store_id) => {
      console.log('...');
    }

    return <div>
      <style jsx >
        {`
          
        `}
      </style>
        <Head>
            <title>{props.product.title}</title>
        </Head>
        {/* A product - {JSON.stringify(props.product)} === {JSON.stringify(props.product.title)} <br/><br/>
        <Link href={`/`}><a>Marketplace</a></Link> */}

        <section className="pt-4 pt-lg-5 mb-5 pb-5">
          <div className="container">
            <div className="row gx-lg-5">

              <div className="col-lg-8 mb-4 mb-lg-0">
                <div className={`${productDetailStyles.productGalleryWrap}`}>
                  
                    <div className={`${productDetailStyles.productGallery} mb-3 mb-lg-0`}>
                               
                    <Slider {...settings} className={`${productDetailStyles.productGallerySlider} position-relative`}>
                      {
                        slides2.map((slide,index)=>{
                          return (
                            <div key={index}>
                              <Image className="img-fluid object-fit-contain" src={slide} key={index} width={730} height={730} alt={props.product.title} priority />
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
                    <Link href={props.store_link}><a className="text-decoration-none text-secondary nyeawo-btn nyeawo-btn-simple me-4 medium" dangerouslySetInnerHTML={{__html: props.product.store.name}}></a></Link>
                    <Link href={`/`}><a className="text-decoration-none nyeawo-btn nyeawo-btn-primary"><span className="material-icons-outlined me-1" >favorite_border</span> Follow store</a></Link>
                  </div>
                  <h2 className="secondary-font mb-3 text-dark text-capitalize" dangerouslySetInnerHTML={{__html: props.product.title}}></h2>
                  <h6 className="fw-normal text-dark rounded-pill bg-dark d-inline text-white py-1 px-2">GHS{props.product.regular_price}</h6>
                  {/* <p className="mb-0 mt-4 pt-2 fs-6 fw-semibold mb-2">Description</p> */}
                  <div className="text-dark fw-normal lh-base mb-5 mt-4 pt-2" dangerouslySetInnerHTML={{__html: props.product.description}}></div>

                  <div className={`${productDetailStyles.productCTAs} border border-white-50 bg-light px-4 py-4 rounded-4 mb-5`}>
                    <div className="row">
                      {/* <div className="col-12">{JSON.stringify(isLoading)} - {JSON.stringify(contactChannel)}</div> */}
                      <div className="col-6 border-end border-white-50">
                        <div>
                          <div className="mb-2 d-flex align-items-center"><FaPhoneAlt className="text-secondary me-2 medium" /> <span className="medium text-secondary">Phone</span></div>
                           <p className={`mb-0 text-black ${!contactChannel.contact ? 'pointer' : ''}`} onClick={()=>{!contactChannel.contact ? showContactChannel('contact') : null}}>{contactChannel.contact ? <Link href={`tel:${props.store_contact_number}`}><a className="text-decoration-none text-dark fw-semibold" target="_blank">{props.store_contact_number}</a></Link> : <span className="fw-semibold">Show Contact</span>}</p>
                          {/* {!contactChannel.contact ? <small style={{fontSize: '12px'}}>Click to show</small> : ''} */}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="ps-2">
                          <div className="mb-2 d-flex align-items-center"><RiWhatsappFill className="text-secondary me-2 fs-5" /> <span className="medium text-secondary">WhatsApp</span></div>
                           <p className={`mb-0 text-black ${!contactChannel.whatsapp ? 'pointer' : ''}`} onClick={()=>{!contactChannel.whatsapp ? showContactChannel('whatsapp') : null}}>{contactChannel.whatsapp ? <Link href={`https://api.whatsapp.com/send?phone=${props.store_whatsapp_number}&text=I saw your ${props.product.store.name} Ad on Nyeawo.com`}><a className="text-decoration-none text-dark fw-semibold" target="_blank">{props.store_whatsapp_number}</a></Link> : <span className="fw-semibold">Show WhatsApp</span>} </p>
                          {/* {!contactChannel.whatsapp ? <small style={{fontSize: '12px'}}>Click to show</small> : ''} */}
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
                          <div className="accordion-body" dangerouslySetInnerHTML={{__html: props.product.store.delivery_info}}></div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div className="accordion-header" id="flush-headingTwo">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                          <span className="pe-2"><IoReturnUpBack className="fs-5" /></span> Return Policy
                          </button>
                        </div>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body" dangerouslySetInnerHTML={{__html: props.product.store.return_policy}}></div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <div className="accordion-header" id="flush-headingThree">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                          <span className="pe-2"><MdOutlineLocalOffer className="fs-5" /></span> Offers
                          </button>
                        </div>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                          <div className="accordion-body" dangerouslySetInnerHTML={{__html: props.product.product_offer}}></div>
                        </div>
                      </div>
                    </div>

                  </div>


                  <div className={`${productDetailStyles.securityInfo} d-flex align-items-center border-top pt-4 mb-4`}>
                    <TiWarning className="text-warning flex-grow-0 flex-shrink-0 me-2 text-center fs-4" style={{width: '35px',height: '35px',lineHeight: '35px'}} />
                    <div className="medium text-dark" style={{maxWidth: '350px'}}><span className="fw-bold">Security tip:</span> Transactions with buyers should be done in an open space or public areas.</div>
                  </div>

                  <ReportProductForm productId={props.product.id} productTitle={props.product.title} />

                  
                  


                  


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
                    <Link href={props.store_link}><a className="text-decoration-none nyeawo-btn nyeawo-btn-primary px-3">See more</a></Link>
                    {/* `/stores/${props.store_slug}` */}
                  </div>
              </div>

            </div>
              <div className="row gx-lg-5">

                <div className="col-lg-5 mb-4 mb-lg-0">
                    <div className={`${productDetailStyles.storeDetailWrap}`}>
                      <div className={`${productDetailStyles.storeDetail} d-flex mb-4`}>
                        <div className={`me-3`}>
                          <Link href={props.store_link}>
                            <a className={`${productDetailStyles.storeLogo} bg-light flex-shrink-0 flex-grow-0`}>
                              <Image className="img-fluid object-fit-cover" src={props.store_logo || `/images/img-placeholder.png`} alt={props.store_slug} width={300} height={300} />
                            </a>
                          </Link>
                        </div>
                        <div className="pt-3">
                          <h6 className="mb-1"><Link href={props.store_link}><a className="text-decoration-none text-dark" dangerouslySetInnerHTML={{__html: props.store_name}}></a></Link></h6>
                          <div className="text-secondary">{props.store_location}</div>
                        </div>
                        <div className="ms-auto"><span className="nyeawo-icon-bnt pointer fs-3" onClick={()=>{followStore(props.store_id)}}><MdOutlineFavoriteBorder className={`${props.id}`} /></span></div>
                      </div>
                      <p className={`${productDetailStyles.storeDescription}`} dangerouslySetInnerHTML={{__html: props.store_description}}></p>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="row gy-4 gy-lg-0">

                      {
                        props.more_from_shop.map(product=>{
                          return (
                            <div key={product.id} className="col-6 col-lg-4">
                              <Product {...product} showStore={true} />
                            </div>
                          )
                        })
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
                    <h5>More products</h5>
                  </div>
              </div>

              <div className="">
                  <div>
                    <Link href={`/`}><a className="text-decoration-none nyeawo-btn nyeawo-btn-primary px-3">See more</a></Link>
                  </div>
              </div>

            </div>
              <div className="row">

                    {
                        props.related_products.map(product=>{
                          return (
                            <div key={product.id} className="col-6 col-lg-3">
                              <Product {...product} showStore={true} />
                            </div>
                          )
                        })
                      }

              </div>
          </div>
        </section>

        <div> 
        </div>

        
    </div>
}


export async function getStaticPaths(){

    const resp = await fetch(`https://nyeawo.com/apis/products.php?limit=10`)
    const {all_products} = await resp.json()

    // console.log(all_products);

    let paths = all_products.map(product=>{
        return {
            params: {
                category: product.folder_slug,
                productId: product.slug.toString()
            }
        }
    }) 

    // console.log('The paths',paths);


    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(ctx){
    const {params} = ctx
    // console.log('Params',params);

    const resp = await fetch(`https://nyeawo.com/apis/products.php`)
    const {all_products} = await resp.json()

    // const request = await fetch("https://nyeawo.com/apis/products.php")
    // const request_data = await request.json();

    // console.log('All products',all_products);

    const product = all_products ? all_products.find((o)=>{
        return o.slug === params.productId && o.folder_slug === params.category
    }) : []

    // console.log('The product',product);

    const {store: {id: store_id, name: store_name, store_link, store_description, store_logo, store_location, slug: store_slug, store_contact_number, store_whatsapp_number}} = product

    // const  = product.store.store_description;
    // const store_logo = product.store.store_logo;

    const more_from_shop = all_products.filter(function(item) {
        return item.store.id === product.store.id;
    }); 

    const related_products = all_products.filter(function(item) {
      return item.folder_id === product.folder_id;
  }); 

  // console.log(store_slug);

    // console.log('Filter',related_products.slice(0,3));

    if(product.length === 0){
        return {
            notFound: true,
        }
    }

    return {
        props: {
            product,
            more_from_shop: more_from_shop.length ? more_from_shop.slice(0,3) : [],
            related_products: related_products.length ? related_products.slice(0,4) : [],
            store_id,
            store_link,
            store_description,
            store_logo,
            store_name,
            store_location,
            store_slug,
            store_contact_number,
            store_whatsapp_number
        },
        revalidate: 5,
    }
}