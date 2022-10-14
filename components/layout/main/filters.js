import { useEffect, useState } from "react";
import Link from "next/link"
import { SelectPicker, MultiCascader, Radio, RadioGroup, Form, RangeSlider } from 'rsuite';
import 'rsuite/dist/rsuite.css';
import { useRouter } from "next/router"
import useGetProducts from "../../../hooks/getProducts";
import {map, size, includes, debounce} from "lodash"
import GooglePlacesAutocomplete,{ geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { BiCheck } from 'react-icons/bi'

const budget = [
    {
        id: "price_1",
        name: "price",
        min_price: 0,
        max_price: 100
    },
    {
        id: "price_2",
        name: "price",
        min_price: 100,
        max_price: 500
    },
    {
        id: "price_3",
        name: "price",
        min_price: 500,
        max_price: 1000
    }
]

// let timer;
// const Cdebounce = function(fn, d) {
//     if (timer) {
//       clearTimeout(timer);
//     }
  
//     timer = setTimeout(fn, d);

//   }


export default function Filters(){
    const router = useRouter()
    const [minPrice, setMinPrice] = useState(router.query.min_price || '')
    const [isDeliverable, setIsDeliverable] = useState(false)
    const [SliderValue, setValue] = useState({min:0,max:5000});

    const filterProducts = debounce((e,params)=>{

        const filter_input_type = e.target.type
        let updated_query_after_param_removed = undefined

        if(size(router.query) === 2 && includes(Object.keys(router.query), 'filter')){
            delete router.query['filter'];
        }

        if(filter_input_type === 'checkbox' && !e.target.checked ) {

            delete router.query[e.target.name]
            updated_query_after_param_removed = router.query

        } else if(filter_input_type === 'radio' && e.target.checked) {

            if(e.target.value === 'show_all_prices'){

                if((size(router.query) === 3) && includes(Object.keys(router.query), 'filter')) {
                
                    console.log('Show all so remove filter');
                    delete router.query['filter'];
                    
                }

                ['min_price', 'max_price'].forEach(function (k) {
                    delete router.query[k];
                });

                updated_query_after_param_removed = router.query

            }   
            
            setMinPrice(params.min_price)


        }

        router.push({
          pathname: router.pathname,
          query: updated_query_after_param_removed !== undefined ? updated_query_after_param_removed : { ...router.query, ...params }}, undefined, {shallow:true})        

        
    },0)

    const getCoordinates = (location)=>{
        geocodeByAddress(location)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) =>
            {

            router.push({
                pathname: router.pathname,
                query: {...router.query,location: location.split(',',1)[0],lat,lng,filter:1}
            },undefined,{shallow: true})
            }
        );

    }

    useEffect(()=>{        

        if(router.isReady){
        setMinPrice(router.query.min_price)

        if(router.query.delivery) {
            setIsDeliverable(true)
        } else {
            setIsDeliverable(false)
        }
    }

        
      },[router.query, router.isReady])


   
    return (
        <div>
            <ul className='list-unstyled'>
                <li className="border-bottom pb-4 mb-4">
                    <h6 className="mb-3 fw-semibold text-dark">Budget</h6>
                    <ul className='list-unstyled'>

                        <li>
                        <div className="form-check mb-2 position-relative">
                                        <input className="form-check-input" type="radio" name="price" id='show_all_prices' value='show_all_prices' onChange={(e)=>filterProducts(e,{})} defaultChecked={(router.query.min_price === undefined && router.query.max_price === undefined )} />
                                        <label className="form-check-label pointer" htmlFor="show_all_prices" >
                                            Show all
                                        </label>
                                        <span className={`custom_radio_btn ${((router.query.min_price === undefined) && (router.query.max_price === undefined) ) ? 'is-checked' : ''}`}></span>
                        </div>
                       


                            {
                                budget.map(price=>{
                                    return (
                                    <div key={price.id} className="form-check mb-2 position-relative">
                                        <input className="form-check-input d-none" type="radio" name={`${price.name}`} id={price.id} onChange={(e)=>filterProducts(e,{min_price:price.min_price,max_price:price.max_price,filter: 1})} defaultChecked={(+router.query.min_price === +price.min_price) ? true : false} defaultValue={price.min_price} />
                                        <label className="form-check-label pointer" htmlFor={price.id} >
                                            GHS{price.min_price} - GHS{price.max_price}
                                        </label>
                                    <span className={`custom_radio_btn ${(+router.query.min_price === +price.min_price) ? 'is-checked' : ''}`}></span>
                                    </div>
                                    )
                                })
                            }
                        </li>

                        {/* <li>
                            {JSON.stringify(SliderValue)}
                        <RangeSlider
                            progress
                            style={{ marginTop: 16 }}
                            value={[SliderValue.min,SliderValue.max]}
                            max = {5000}
                            onChange={(value,e) => {
                                setValue(prev=>{
                                    return {min:value[0],max:value[1]}
                                });

                                // console.log(filterProducts)

                                // Cdebounce(console.log(value[1]), 2000);
                                
                                filterProducts(e,{min_price:value[0],max_price:value[1],filter: 1})

                                // console.log('On change',e,value);
                            }}
                            />
                        {SliderValue.min} - {SliderValue.max}
                        </li> */}
                    </ul>
                </li>

                <li className="border-bottom pb-4 mb-4">
                    <h6 className="mb-3 fw-semibold text-dark">Deliverable products</h6>
                    <ul className='list-unstyled'>                        

                    <li>
                            <div className="form-check position-relative">
                                <input className="form-check-input d-none" type="checkbox" name="delivery" id="deliveryAvailable" onChange={(e)=>filterProducts(e,{delivery: 1, filter: 1})} defaultChecked={isDeliverable} defaultValue="1" />
                                <label className="form-check-label fs-6 pointer" htmlFor="deliveryAvailable" >
                                    Delivery
                                </label>
                                <p className={`mb-0 custom_checkbox ${isDeliverable ? 'is-checked' : ''}`}><BiCheck className="position-absolute top-50 start-50 translate-middle" /></p>
                            </div>
                        </li>

                    </ul>
                </li>

                {/* {
                    (locations !== undefined) ? (
                        <li className="">
                    <h6 className="mb-3">Filter by location</h6>
                    <ul className='list-unstyled'>

                        <li>
                        <SelectPicker placeholder="Select location" data={storeLocations} block label="Location" groupBy="role" onChange={(e) => {getCoordinates(e)}} onClean={(e)=>{
            console.log(e,'Clean',size(router.query),includes(Object.keys(router.query), 'filter') );

            if((size(router.query) === 2) && includes(Object.keys(router.query), 'filter') || (size(router.query) === 3) && includes(Object.keys(router.query), 'category') ) {
                
                console.log('Show all so remove filter');
                delete router.query['filter'];
                
            }

            delete router.query['location']; 

            router.push({
                pathname: router.pathname,
                query: router.query
            },undefined, {shallow: true})
        
            }
            } value={router.query.location ? router.query.location : ''} placement='auto' />

                       
                        </li>
                    </ul>
                </li>
                    ) : ''
                } */}
                
                <li>
                <h6 className="mb-3 fw-semibold text-dark">Filter by location</h6>
                    <ul className='list-unstyled'>
                        <li>
                            <div className="">
                                {/* <span className="material-icons-outlined input-group-text">search</span> */}
                                {/* <input type="text" aria-label="First name" className="form-control" placeholder="Enter location"/> */}
                                <GooglePlacesAutocomplete apiKey="AIzaSyCVPy4OvXyq9bGgTy6vbU7QQN6fRgvjZRY" selectProps={{
                                onChange: ({label,value},e)=>{
                                    // console.log(value.structured_formatting.main_text);
                                    label !== undefined ? getCoordinates(label) : clearValue()
                                },
                                placeholder: 'Search locations',
                                styles: { singleValue: (base, state) => ({ ...base, color: state.selectProps.menuIsOpen ? "#DCDCDC" : base.color }) },
                                menuPlacement: 'auto',
                                instanceId: 'places_autocomplete',
                                }}
                                autocompletionRequest={{
                                    componentRestrictions: {
                                    country: ['gh'],
                                    }
                                }}
                                />
                            </div>
                        </li>

                    </ul>
                </li>
            </ul>
        </div>
    )
}