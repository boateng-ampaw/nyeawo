import Link from 'next/link';
import Image from 'next/future/image'
import { Dropdown } from 'rsuite';
import 'rsuite/dist/rsuite.css';

export default function Footer(){
    return <>   

        <footer>
            <div className='container pb-5 mt-5'>
                <div className="row justify-content-center">
                    <div className='col-lg-auto mb-2 mb-lg-0'>
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-outline-primary dropdown-toggle w-100 py-2 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Products
                                </button>
                                <ul className="dropdown-menu px-2">
                                    <li><Link href='/'><a className="dropdown-item text-decoration-none rounded py-2">Products</a></Link></li>
                                    <li><a href="https://nyeawo.com/all-categories.php" className="dropdown-item text-decoration-none rounded py-2">Categories</a></li>
                                    <li><a href="https://nyeawo.com/stores.php" className="dropdown-item text-decoration-none rounded py-2">Stores</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-auto mb-2 mb-lg-0">
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-outline-primary dropdown-toggle w-100 py-2 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sell
                                </button>
                                <ul className="dropdown-menu px-2">
                                <li><a href="https://nyeawo.com/start-selling.php" className="dropdown-item text-decoration-none rounded py-2">Sell on Nyeawo</a></li>
                                <li><a href="https://nyeawo.com/info-center.php?p=195#info-center-page-content" className="dropdown-item text-decoration-none rounded py-2">Learn to sell</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-auto mb-2 mb-lg-0">
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-outline-primary dropdown-toggle w-100 py-2 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                About us
                                </button>
                                <ul className="dropdown-menu px-2">
                                <li><a href="https://nyeawo.com/about-nyeawo.php" className="dropdown-item text-decoration-none rounded py-2">Our Business</a></li>
                                <li><a href="https://nyeawo.com/forum.php" className="dropdown-item text-decoration-none rounded py-2">Our Community</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-auto">
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-outline-primary dropdown-toggle w-100 py-2 d-flex align-items-center justify-content-between" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Support
                                </button>
                                <ul className="dropdown-menu px-2">
                                {/* <li><a href="/" className="dropdown-item text-decoration-none rounded py-2">Products</a></li> */}
                                <li><a href="https://nyeawo.com/info-center.php" className="dropdown-item text-decoration-none rounded py-2">Help</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='pt-5 text-center'>
                    <Link href={`/`}><a><Image src={`https://nyeawo.com/images/fav.svg`} width={30} height={30} className={`img-fluid`} alt='Nyeawo brand logo' /></a></Link>
                    <p className='mb-0 medium pt-2'><span className="pe-1">Ⓒ</span>Nyeawo {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>

    </>
}