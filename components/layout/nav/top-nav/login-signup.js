import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Link from 'next/link';
import useAuthUser from "../../../../hooks/auth";
import 'material-icons/iconfont/outlined.css';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Modal, Button, ButtonToolbar, Placeholder, Loader, Notification, useToaster, Message } from 'rsuite';
import { useForm } from "react-hook-form";


const loginURL = 'https://nyeawo.com/apis/login-api.php?next_login=1'

export default function LoginSignup(){
    const {data,loading,loginError,mutate, isLoggedIn, user} = useAuthUser()
    const router = useRouter()
    const [showLoginForm, setShowLoginForm] = useState(false)
    
    const [signInIsLoading, setSignInIsLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const toaster = useToaster();

    
    const handleOpen = () => setShowLoginForm(true);
    const handleClose = () => setShowLoginForm(false);

    const onSubmit = async (formData) => {
        setSignInIsLoading(true)


        let fd = new FormData(); //Create a new form data instance

        console.log(formData);

        for(const name in formData) {
            fd.append(name, formData[name]); //Append all form data from teh react hook form to the form data instance
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

    console.log('Hidden elems',hiddenElems);

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

        console.log(loginData)

        setSignInIsLoading(false)

        if(loginData.isLoggedIn){
            reset()
            handleClose()
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
        <div className='row gx-2 align-items-center'>
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
            
        </div>

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