import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import 'material-icons/iconfont/outlined.css';
// import 'material-icons/iconfont/round.css';
import { MdSecurity, MdOutlineArrowForwardIos, MdOutlineArrowBackIos, MdOutlineArrowDropDown, MdDeliveryDining, MdOutlineLocalOffer, MdFavoriteBorder, MdOutlineFavoriteBorder, IoMdClose, MdOutlineAccountCircle } from 'react-icons/md'
import { FiSearch, FiUser } from 'react-icons/fi'
import { FaStore, FaShoppingBag } from 'react-icons/fa'
import { BiUser } from 'react-icons/bi'
import { VscAccount } from 'react-icons/vsc'
import { HiShoppingBag } from 'react-icons/hi'
import { RiAccountPinCircleFill, RiAdvertisementFill } from 'react-icons/ri'
import { FcAdvertising, FcPackage, FcShop, FcSettings, FcDownRight } from 'react-icons/fc'
import useAuthUser from "../../../../hooks/auth";


export default function SearchBar({styles}){
    const [showSearchBar, setShowSearchBar] = useState(false)
    const {loading,loginError, isLoggedIn, data, mutate} = useAuthUser()
    const router = useRouter()

    const logout = async (e,logoutLink,redirectPg)=>{
        e.preventDefault()
        console.log('Logout link',logoutLink,redirectPg);

        let resp = await fetch(`${logoutLink}`,{
        'credentials': 'include',
        'redirect': 'follow'
        })
        let logoutData = await resp.json()

    console.log(logoutData.isLoggedIn);

    if(!logoutData.isLoggedIn){
        // router.push(redirectPg)
        mutate(null)
    }


    }


    // useEffect(()=>{
    //     console.log(router);
    // },[data])

const {TopNavStyles} = styles

    return <div className='d-flex justify-content-end align-items-center'>
        <div className={`${TopNavStyles.searchBarTrigger} text-end d-lg-none bg-white`}>
        <button className={`bg-transparent border-0`} onClick={()=>setShowSearchBar(!showSearchBar)}><span className="nyeawo-icon-bnt pointer fs-3 h-100"><FiSearch className={`text-dark fs-5`} /></span></button>
        </div>
        <div className={`${TopNavStyles.searchBarWrap} me-3 flex-grow-1 ${showSearchBar ? '' : 'd-none'} d-lg-block`} >
            <form action='/search' className={`d-flex align-items-center h-100`}>
                <div className='hide-search-input text-center d-lg-none pointer' onClick={()=>setShowSearchBar(!showSearchBar)}><MdOutlineArrowBackIos className='fs-6 text-secondary' /></div>
                <div className='flex-grow-1 me-2 me-lg-1'><input className={`w-100 form-control`} type='text' name='s' placeholder='Search for products' /></div>
                <button className='bg-white border-0 search-btn ms-auto'><span className="nyeawo-icon-bnt pointer fs-3 h-100 bg-white"><FiSearch className={`text-dark fs-5`} /></span></button>
            </form>
        </div>
        {
            isLoggedIn ? <>
            <div className={`d-flex align-items-center ${TopNavStyles.mobileUserNav} border rounded-pill ms-2 ps-1`}>
                <div className={`${TopNavStyles.mobileUserIcon} bg-light rounded-pill px-2 ps-2 py-1 me-1`}><FiUser className='fs-6 me-1 text-secondary' /><span>{data.user.user_type === 'merchant' ? 'Dashboard' : 'Account'}</span></div>
                <div className={`dropdown`}>
                    <a className="btn rounded-circle dropdown-toggle p-1 position-relative" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <MdOutlineArrowDropDown className='text-dark position-absolute top-50 start-50 translate-middle' size='1.8em' title='Dashboard' />
                    </a>

                    <ul className="dropdown-menu pt-4 shadow pb-3" style={{minWidth: '350px', maxHeight: '480px',overflowY: 'auto'}}>
                        <li className='pb-3 border-bottom px-4'>
                            <h5 className='text-dark mb-1 fw-semibold'>{data.user.fullname}</h5>
                            <p className='mb-1 small fw-light'>{data.user.email}</p>
                            <p className='mb-0 small fw-light mt-0'>Customer #: {data.user.user_id}</p>
                        </li>
                        {
                            data.user.user_type === 'merchant' ? (
                                <li className='py-3 border-bottom'>
                                    <h6 className='px-4 fw-semibold mb-2'>Create</h6>
                                    <div className='px-3'>
                                        {
                                            !data.hasStore ? <Link href={data.createStoreLink}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcShop className='me-2' size='1.3em' /> Store</a></Link> : <Link href={data.createProductLink}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcPackage className='me-2' size='1.3em' /> <span>Product</span></a></Link>
                                        }

                                        {
                                            data.hasProducts ? <Link href={data.advertiseLink}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcAdvertising className='me-2' size='1.3em' /> Advert</a></Link> : ''
                                        }
                                        
                                        
                                    </div>
                                </li>
                            ) : ''
                        }
                        
                        <li className='py-3 border-bottom'>
                            <h6 className='px-4 fw-semibold mb-2'>Account</h6>
                            <div className='px-3'>

                                {/* {
                                    (data.user.user_type === 'merchant' && data.hasStore ) ? <>
                                        <Link href={`/`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcShop className='me-2' size='1.3em' /> My Store</a></Link>
                                        <Link href={`/`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcPackage className='me-2' size='1.3em' /> My Products</a></Link>
                                    </> : ''
                                } */}
                                
                                {
                                    data.user.user_type === 'merchant' ? (
                                        <Link href={data.merchantDashboardLink}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><RiAccountPinCircleFill className='me-2' size='1.3em' style={{fill: 'rgb(63, 81, 181)'}} /> My Dashboard</a></Link>
                                    ) : (
                                        <Link href={data.userAccountLink}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><RiAccountPinCircleFill className='me-2' size='1.3em' style={{fill: 'rgb(63, 81, 181)'}} /> My Account</a></Link>
                                    )
                                }      
                                <Link href={data.accountSettings}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcSettings className='me-2' size='1.3em' /> Account Settings</a></Link>
                            </div>
                        </li>
                        <li className='px-3 pt-3'>
                            <p className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal pointer' onClick={(e)=>logout(e,data.logoutLink,router.asPath)}><FcDownRight className='me-2' size='1.3em' /> Logout</p>
                        </li>
                        
                    </ul>
                </div>
            </div>
            </> : ''
        }
        
        
    </div>
}