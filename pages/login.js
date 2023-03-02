import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import useAuthUser from "../hooks/auth";
import { useForm } from "react-hook-form";
import { Modal, Loader, useToaster } from 'rsuite';

const loginURL = 'https://nyeawo.com/apis/login-api.php?next_login=1'

export default function LoginForm(){
    const {data,loading,loginError,mutate, isLoggedIn, user} = useAuthUser()
    const router = useRouter()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [signInIsLoading, setSignInIsLoading] = useState(false)
    const [loginResponse,setLoginResponse] = useState({})
    const toaster = useToaster();
    
    
    const onSubmit = async (formData) => {
        setSignInIsLoading(true)


        let fd = new FormData(); //Create a new form data instance

        // console.log(formData);

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

        if(loginData.isLoggedIn){

            console.log('Run follow store script and Redirect to', router.query.return);

            router.push(`${router.query.return}`)
            // reset()
            // handleClose()
            // mutate(null)
        } else if (loginData.loginErrors) {
            console.log('Login Error', loginError)
        }

        setLoginResponse(loginData)

        setSignInIsLoading(false)

        

    }

    useEffect(()=>{
        // console.log(router.query.return);
        if(isLoggedIn) {
            router.push(`${router.query.return || '/' }`)
        }
    },[router.isReady])

    return (

        <section className="pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mx-auto">
                        <div>
                            <h3 className="fw-semibold text-center text-dark mb-4">Login</h3>

                                {(!loginResponse.isLoggedIn && loginResponse.isLoginError && loginResponse.loginErrors.length) ? 
                                loginResponse.loginErrors.map((err,index)=>{
                                    return <p key={index} className="text-danger text-center mb-3">{err}</p>
                                }) : '' }
                        
                        
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                        
                        <div className="py-1 px-1 mb-3">
                        
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
                        
                            <div className="">
                            {/* <button type="button" className="btn btn-secondary flex-fill me-3 btn-lg" >Cancel</button> */}
                            { signInIsLoading ? <div className="w-100 text-center d-flex align-items-center justify-content-center py-3"><Loader speed='fast' /></div> : <button type="submit" className="btn btn-primary w-100 btn-lg">Login</button>}
                            </div>     
                        
                        <div className="text-center mt-4">
                            {/* <a href={`/`}>Forgot password</a> */}
                            <a href={`/`} className="nyeawo-btn-primary text-decoration-none" >Join Nyeawo</a>
                        </div>  
                        </form>
                        </div>

                        {/* <div>
                            {JSON.stringify(loginResponse)}
                        </div> */}
                    </div>
                </div>
            </div>

        </section>
    )
}