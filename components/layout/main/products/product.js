import Link from 'next/link'
import Image from 'next/future/image'
import ProductStyles from '../../../styles/product.module.css'

export default function Product(props){

    // console.log(props);

    return (
            <div className={`${ProductStyles.productWrap} h-100 border d-flex flex-column rounded`}>
                    <div className={`${ProductStyles.productImgWrap}`}>
                        <Link href={`/${props.folder_slug}/${props.slug}`}>
                            <a  className={`d-block text-decoration-none ${ProductStyles.productImgWrap}`}>
                                <Image className='img-fluid w-100' src={props.images.square ? props.images.square : `/images/img-placeholder.png`} width={730} height={730} alt={props.title} placeholder="blur" blurDataURL="/images/img-placeholder.png" />
                            </a>
                        </Link>
                    </div>
                    <div className={`${ProductStyles.productDetail} p-3`}>
                        <Link href={`/${props.folder_slug}/${props.slug}`}>
                            <a className='d-block text-decoration-none text-dark mb-2'>
                                <h6 className='lh-base mb-0 fw-semibold' dangerouslySetInnerHTML={{__html: props.title}}></h6>
                            </a>
                        </Link> 
                        <p className='text-dark medium mb-0'>GHS{props.regular_price}</p> 

                        {props.is_promoted ? <span className='badge text-primary rounded-pill px-2 mt-4 me-2 fw-normal' style={{backgroundColor: '#d5eeff'}}>Promoted</span> : ''}                    
                    </div>
                    {
                       props.showStore ? (
                        <div className='seller px-3 py-3 mt-auto border-top'>
                            <small className='text-secondary fw-light d-block'>Sold by</small>
                            <a href={props.store.store_link} className='medium text-decoration-none text-dark' dangerouslySetInnerHTML={{__html: props.store.name}}></a>
                        </div>
                       ) : '' 
                    }                  
                    
            </div>
    )
}