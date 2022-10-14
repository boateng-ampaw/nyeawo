
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader, Notification, useToaster, Placeholder, Message } from 'rsuite';

const reportFormURL = `https://nyeawo.com/apis/report-product-api.php`

export default function ReportProductForm({productId, productTitle}){
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const toaster = useToaster();


    const message = (
        <Notification type="success" duration={5000} header={`Informational`} closable>
          <Placeholder.Paragraph style={{ width: 320 }} rows={3} />
          <hr />
        </Notification>
      );
  
    const resetInputFields = () => {        
        reset()
     }

      // handle form submit
   const onSubmit = async (formData) => {
    setIsLoading(true)
    let fd = new FormData();

    // console.log(productId);


        let resp = await fetch(`${reportFormURL}?productId=${productId}`,{
                method: 'GET',
                credentials: 'include',
                redirect: 'follow'
              })
        let data = await resp.text()
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, "text/html");

        const  hiddenElems = doc.querySelectorAll('input[type="hidden"]')

        // console.log(doc.querySelector('#k_hid_kformname0').value);

        // console.log(hiddenElems);
        for(const hiddenInput of hiddenElems) {
            fd.append(hiddenInput['name'], hiddenInput['value']);
        }

    // console.log(formData, fd);

    for(const name in formData) {
      fd.append(name, formData[name]);
   }

  //   for (var pair of fd.entries()) {
  //     console.log('The form data pair', pair[0]+ ', ' + pair[1]); 
  // }

    let resp2 = await fetch(`${reportFormURL}?productId=${productId}`,{
            method: 'POST',
            body: fd,
            credentials: 'include',
            redirect: 'follow'
        })

        let data2 = await resp2.json()

        // console.log(data2.status, data2.statusText);

        if(data2.status === 'ok') {   
            resetInputFields()

            setIsLoading(false)

            toaster.push(<Message showIcon type="success" header={data2.statusText} closable style={{maxWidth: '450px'}}><p className="mb-0 lh-base text-dark">Your report on this product has been submitted for further action. We will get back to you as soon as a resolution has been met. Thank you!</p></Message>, {
               placement: 'topEnd'
             });
        } else {

        }
   }


    return <>    
        <p className="mb-0 text-center text-danger medium pointer"  data-bs-toggle="modal" data-bs-target="#reportProduct">Report this product</p>


        <div className="modal fade" id="reportProduct" tabIndex="-1" aria-labelledby="reportProductLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-4 fw-semibold text-dark" id="modalTitle">{`Reporting ${productTitle}`}</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className={`test`} onSubmit={handleSubmit(onSubmit)} autoComplete='on' >
                        <div className="modal-body pt-5 px-4">
                          <div className="">

                            <div  className="form-group mb-3">
                              <div className="form-floating">
                                <input type="text" name="fullname" className={`form-control ${errors?.fullname ? 'is-invalid' : ''}`} id="fullname" placeholder="Your full name"  {...register('fullname',{
                                                required: "Your full name is required",
                                                min: 5                                              
                                                })} />
                                <label htmlFor="fullname">Your full name</label>
                              </div>
                              {errors?.fullname && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.fullname.message}`}</p>}
                            </div>

                            <div  className="form-group mb-3">
                            <div className="form-floating">
                                <input type="text" className={`form-control ${errors?.contact_number ? 'is-invalid' : ''}`} id="phoneNumber" placeholder="Phone number"  {...register('contact_number',{
                                required: "Your phone number is required",
                                pattern: {
                                    value: /^([0|\+[0-9]{1,5})?([0-9]{10})$/,
                                    message: "Please enter a valid phone"
                                }
                                                
                                })} />
                                <label htmlFor="phoneNumber">Your phone number</label>
                            </div>
                            {errors?.contact_number && <p className={`mb-0 mt-2 text-danger small`}  id="validationServer04Feedback" >{`${errors.contact_number.message}`}</p>}
                            </div>
                            
                            <div  className="form-group mb-3">
                              <div className="form-floating">
                                <textarea className={`form-control ${errors?.message ? 'is-invalid' : ''}`} name="message" placeholder="Enter details of your report" id="reportDetail" style={{height: '100px'}} {...register('message',{
                                                required: "You forgot to enter your message"             
                                                })}></textarea>
                                <label htmlFor="reportDetail">Details of your report</label>
                              </div>
                              {errors?.message && <p className={`mb-0 mt-2 text-danger small`} >{`${errors.message.message}`}</p>}
                            </div>




                              
                          </div>
                        <div className="px-3 pb-2 small text-secondary lh-sm"> Reporting a product is subject to investigations before any action will be taken.</div>
                        </div>
                        
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary flex-fill" data-bs-dismiss="modal">Cancel</button>
                          { isLoading ? <div className="w-75 text-center"><Loader speed='fast' /></div> : <button type="submit" className="btn btn-primary w-75">Send</button>}
                          
                        </div>
                        </form>
                      </div>
                    </div>
                  </div>
    
    </>
}