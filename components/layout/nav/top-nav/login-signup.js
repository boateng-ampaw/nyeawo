import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Link from 'next/link';
import useAuthUser from "../../../../hooks/auth";
import 'material-icons/iconfont/outlined.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Modal, Loader, useToaster } from 'rsuite';
import { useForm } from "react-hook-form";
import { FiUser } from 'react-icons/fi'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import { RiAccountPinCircleFill } from 'react-icons/ri'
import { FcAdvertising, FcPackage, FcShop, FcSettings, FcDownRight } from 'react-icons/fc'


const loginURL = 'https://nyeawo.com/apis/login-api.php?next_login=1'

export default function LoginSignup({styles}){
    const {data,loading,loginError,mutate, isLoggedIn, user} = useAuthUser()
    const router = useRouter()
    const [showLoginForm, setShowLoginForm] = useState(false)
    
    const [signInIsLoading, setSignInIsLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const toaster = useToaster();

    const {TopNavStyles} = styles

    
    const handleOpen = () => setShowLoginForm(true);
    const handleClose = () => setShowLoginForm(false);

    const onSubmit = async (formData) => {
        setSignInIsLoading(true)


        let fd = new FormData(); //Create a new form data instance

        // console.log(formData);

        for(const name in formData) {
            fd.append(name, formData[name]); //Append all form data from the react hook form to the form data instance
        }

        let hiddenInputsResp = await fetch(`${loginURL}`,{
            method: 'GET',
            credentials: 'include',
            redirect: 'follow'
          })
    let hiddenInputsData = await hiddenInputsResp.text()
    var parser = new DOMParser();
    var doc = parser.parseFromString(hiddenInputsData, "text/html");

    const  hiddenElems = doc.querySelectorAll('input[type="hidden"]') // Use a GET request to get all hidden form input from the login API

    // console.log('Hidden elems',hiddenElems);

    for(const hiddenInput of hiddenElems) {
        fd.append(hiddenInput['name'], hiddenInput['value']); // Append the hidden input values returned from the GET request to the form data instance
    }

    let loginResp = await fetch(`${loginURL}`,{
            method: 'POST',
            body: fd,
            'credentials': 'include',
            redirect: 'follow'
        })
        let loginData = await loginResp.json()

        // console.log(loginData)

        setSignInIsLoading(false)

        if(loginData.isLoggedIn){
            reset()
            handleClose()
            mutate(null)
        }

        

    }


    const logout = async (e,logoutLink,redirectPg)=>{
        e.preventDefault()
        // console.log('Logout link',logoutLink,redirectPg);

        let resp = await fetch(`${logoutLink}`,{
        'credentials': 'include',
        'redirect': 'follow'
        })
        let logoutData = await resp.json()

    // console.log(logoutData.isLoggedIn);

    if(!logoutData.isLoggedIn){
        // router.push(redirectPg)
        mutate(null)
    }


    }

    if(loading){
         return <>
         <div>
         <Skeleton className='' count={1} height={10} width={`120px`} />
         </div>
         </>
    }

    return (
    <div>

        {/* Test */}
        <div className={`d-flex align-items-center ${TopNavStyles.mobileUserNav} border rounded-pill ms-2 ps-1`}>

                <div className={`${TopNavStyles.mobileUserIcon} bg-light rounded-pill px-2 ps-2 py-1 me-1`}><FiUser className='fs-6 me-1 text-secondary' />
                
                    {
                        isLoggedIn ? (
                            <span className='d-lg-inline-block'>{data.user.user_type === 'merchant' ? 'Dashboard' : 'Account'}</span>
                            ) : (
                            <span className='d-lg-inline-block'>Login</span>
                            )
                    }
                    
                </div>


                <div className={`dropdown`}>
                    <a className="btn rounded-circle dropdown-toggle p-1 position-relative" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <MdOutlineArrowDropDown className='text-dark position-absolute top-50 start-50 translate-middle' size='1.8em' title='Dashboard' />
                    </a>

                    <ul className="dropdown-menu pt-4 shadow pb-3" style={{minWidth: '350px', maxHeight: '480px',overflowY: 'auto'}}>

                        {
                            isLoggedIn ? <>
                                
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
                                
                            </> : (
                                <div className='px-3'>
                                    <li><a role='button' className="dropdown-item fs-5 text-decoration-none nyeawo-btn-secondary mb-2" href="#" onClick={handleOpen}>Login</a>
                                    </li>
                                    <li><a className="dropdown-item fs-5 text-decoration-none nyeawo-btn-secondary " href={data.signUpLink}>Create Account</a></li>
                                </div>
                            )
                        }

                        

                        


                        {/* <li className='pb-3 border-bottom px-4'>
                            <h5 className='text-dark mb-1 fw-semibold'>Nana Ampaw</h5>
                            <p className='mb-1 small fw-light'>{`data.user.email`}</p>
                            <p className='mb-0 small fw-light mt-0'>Customer #: 56456464645</p>
                        </li>
                                <li className='py-3 border-bottom'>
                                    <h6 className='px-4 fw-semibold mb-2'>Create</h6>
                                    <div className='px-3'>
                                         <Link href={`data.createStoreLink`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcShop className='me-2' size='1.3em' /> Store</a></Link>
                                             <Link href={`data.createProductLink`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcPackage className='me-2' size='1.3em' /> <span>Product</span></a></Link>
                                        
                                            <Link href={`data.advertiseLink`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcAdvertising className='me-2' size='1.3em' /> Advert</a></Link>
                                        
                                        
                                        
                                    </div>
                                </li>
                        
                        <li className='py-3 border-bottom'>
                            <h6 className='px-4 fw-semibold mb-2'>Account</h6>
                            <div className='px-3'>
                                
                                        <Link href={`data.merchantDashboardLink`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><RiAccountPinCircleFill className='me-2' size='1.3em' style={{fill: 'rgb(63, 81, 181)'}} /> My Dashboard</a></Link>
                                    
                                        <Link href={`data.userAccountLink`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><RiAccountPinCircleFill className='me-2' size='1.3em' style={{fill: 'rgb(63, 81, 181)'}} /> My Account</a></Link>
                                       
                                <Link href={`data.accountSettings`}><a className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal'><FcSettings className='me-2' size='1.3em' /> Account Settings</a></Link>
                            </div>
                        </li> 

                        <li className='px-3 pt-3'>
                            <p className='nyeawo-btn-secondary d-block d-flex align-items-center fs-6 fw-normal pointer' onClick={(e)=>logout(e,data.logoutLink,router.asPath)}><FcDownRight className='me-2' size='1.3em' /> Logout</p>
                        </li>
                        */}
                        
                    </ul>
                </div>
            </div>

        {/* Test End */}

        {/* <div className='row gx-2 align-items-center'>
            {
                isLoggedIn ? "" : <>
                <div className='col-lg mb-3 mb-lg-0 h-100'>
                    <a role='button' className={`btn btn-lg me-1 px-3 w-100 text-decoration-none btn-outline-secondary fs-6`} onClick={handleOpen}>Login</a>
                </div>
                <div className='col-lg'>
                    <Link href={data.signUpLink}><a className='btn btn-primary px-3 w-100 text-decoration-none btn-lg fs-6'>Signup</a></Link>
                </div>
                </>
            }
            
        </div> */}

        <Modal open={showLoginForm} onClose={handleClose} size="xs">
        <Modal.Header>
          <Modal.Title><span className="fw-semibold text-dark fs-4">Login</span></Modal.Title>
        </Modal.Header>
          {/* <Placeholder.Paragraph /> */}
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
        <Modal.Body>
          <div className="py-1 px-1">
          
            <div className="form-floating mb-3">
                <input type="email" className={`form-control ${errors?.k_user_name ? 'is-invalid' : ''}`} name="k_user_name" id="userEmail" placeholder="name@example.com" {...register('k_user_name',{ required: "Username is required"})} />
                <label htmlFor="userEmail">Email address</label>
                {errors?.k_user_name && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.k_user_name.message}`}</p>}
            </div>
            <div className="form-floating">
                <input type="password" name="k_user_pwd" autoComplete="new-password" className={`form-control ${errors?.k_user_pwd ? 'is-invalid' : ''}`} id="userPassword" placeholder="Password" {...register('k_user_pwd',{ required: "Your password is required" })} />
                <label htmlFor="userPassword">Password</label>
                {errors?.k_user_pwd && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.k_user_pwd.message}`}</p>}
                <div className="mt-3 text-end">
                <a href={`/`}>Forgot password?</a>
                </div>
            </div>
            <div className="form-check mt-4 d-flex align-items-center d-none">
            <input className="form-check-input me-2" name="k_user_remember" type="checkbox" defaultValue="1" id="rememberPwd" {...register('k_user_remember')} />
            <label className="form-check-label pointer fs-6 text-dark" htmlFor="rememberPwd">
            Remember me
            </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
            <div className="d-flex align-items-center">
            <button type="button" className="btn btn-secondary flex-fill me-3" onClick={handleClose} >Cancel</button>
            { signInIsLoading ? <div className="w-75 text-center d-flex align-items-center justify-content-center"><Loader speed='fast' /></div> : <button type="submit" className="btn btn-primary w-75">Login</button>}
            </div>     
        </Modal.Footer> 
        <div className="text-center mt-4">
            {/* <a href={`/`}>Forgot password</a> */}
            <a href={`/`} className="nyeawo-btn-primary text-decoration-none" >Join Nyeawo</a>
        </div>  
        </form>
      </Modal>
         
    </div>
    )
}