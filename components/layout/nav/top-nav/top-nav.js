import Link from 'next/link'
import Image from 'next/future/image'
import BrandLogo from './brand-logo'
import SearchBar from './search-bar'
import LoginSignup from './login-signup'
import BottomNav from '../bottom-nav/bottom-nav'
import TopNavStyles from '../../../styles/top-nav-styles.module.css'
import 'material-icons/iconfont/outlined.css';

export default function TopNav(){

    // console.log(TopNavStyles);
   
    return <>        
        <div className={`border-bottom ${TopNavStyles.topNavWrap}`}>
            <div className="container-fluid position-relative h-100">
                <div className={`d-flex px-lg-5 align-items-center h-100`}>
                    <div className="d-flex align-items-center pe-lg-5">
                    <button className="border-0 bg-transparent me-3 d-lg-none lh-1 p-0 m-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav" aria-controls="offcanvasNav"><span className="material-icons-outlined">menu</span></button>
                    <BrandLogo styles={{TopNavStyles}} />
                    </div>
                    <div className="ms-auto flex-grow-1 ps-lg-5">
                        <SearchBar styles={{TopNavStyles}} />
                    </div>
                    <div className="d-none d-lg-block">
                        <LoginSignup styles={{TopNavStyles}} />
                    </div>

                </div>
            </div>
        </div>

        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNav" aria-labelledby="offcanvasNavLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-dark fw-semibold" id="offcanvasNavLabel">Categories</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                <div className='mb-5'>
                    <BottomNav />
                </div>
                <LoginSignup styles={{TopNavStyles}} />
                
            </div>
        </div>
        </>
}