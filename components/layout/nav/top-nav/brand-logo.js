import Link from 'next/link'
import Image from 'next/future/image'

export default function BrandLogo({styles}){

    const {TopNavStyles: {brandLogo}} = styles
    // https://cdn.shopify.com/shopifycloud/handshake-web/production/assets/64979aae47c4420aa30531730ba3d340.svg
    // https://nyeawo.com/images/fav.svg

    return <div>
        <Link href={`/`}><a><Image src={`https://nyeawo.com/images/logo.svg`} width={397} height={140} className={`${brandLogo} img-fluid d-none d-lg-block`} alt='Nyeawo brand logo' /><Image src={`https://nyeawo.com/images/fav.svg`} width={38} height={38} className={`${brandLogo} img-fluid d-lg-none`} alt='Nyeawo brand logo' /></a></Link>
    </div>
}