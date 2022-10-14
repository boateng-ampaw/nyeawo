import Link from "next/link"
import { useRouter } from "next/router"
import {map, size, includes} from "lodash"


export default function SelectedFilters(){
    const router = useRouter()

    const {min_price,max_price, delivery, filter, location} = router.query

    const selectedFilters = {
        "budget" : (min_price !== undefined) && (max_price !== undefined) ? `Budget: GHS${min_price}-${max_price}` : undefined,
        "delivery" : delivery !== undefined ? `Deliverable` : delivery,
        "filter": filter !== undefined ? `filter` : filter,
        "location": location
    }

    // console.log('selected filters', selectedFilters);

    

    const removeFilter = (param)=>{
        console.log('Remove',param);

        // console.log('Check for size of queries',size(router.query), includes(Object.keys(router.query), 'filter'), (size(router.query) === 2 && includes(Object.keys(router.query), 'filter')) ? 'Remove filter param' : 'Leave it there');

        

        // const filter_input_type = e.target.type
        let updated_query_after_param_removed = undefined

        if(param === 'budget') {

            // console.log('Budget log',size(router.query));

            if(size(router.query) === 3 && includes(Object.keys(router.query), 'filter')){
                delete router.query['filter']
            }

            ['min_price', 'max_price'].forEach(function (k) {
                delete router.query[k];
            });

        // console.log('The new query in',router.query);
        updated_query_after_param_removed = router.query

        } else if (param === 'location'){

            // console.log('Delete locations params');

            if(size(router.query) === 4 && includes(Object.keys(router.query), 'filter')){
                delete router.query['filter']
            }

            ['lat', 'lng', 'location'].forEach(function (k) {
                delete router.query[k];
            });

            updated_query_after_param_removed = router.query

        } else {
            if(size(router.query) === 2 && includes(Object.keys(router.query), 'filter')){
                delete router.query['filter']
            }

            // console.log('Run this too');

            delete router.query[param];

            updated_query_after_param_removed = router.query
        }

        // console.log('The new query out',router.query);

        router.push({
          pathname: router.pathname,
          query: updated_query_after_param_removed !== undefined ? updated_query_after_param_removed : { ...router.query, ...param }}, undefined, {shallow:true}) 

        // if(filter_input_type === 'checkbox' && !e.target.checked ) {

        //     console.log('Remove checkbox item from router query object');
        //     delete router.query[e.target.name] //Delete object property from query param
        //     updated_query_after_param_removed = router.query

        // } else if(filter_input_type === 'radio' && e.target.checked) {
        //     if(e.target.value === 'show_all_prices'){
        //         console.log('Show all prices set. Remove price filters');
        //         ['min_price', 'max_price'].forEach(function (k) {
        //             delete router.query[k];
        //         });

        //         updated_query_after_param_removed = router.query
        //     }

        // }

        // console.log('AFter removal',updated_query_after_param_removed);
        // router.push({
        //   pathname: router.pathname,
        //   query: updated_query_after_param_removed !== undefined ? updated_query_after_param_removed : { ...router.query, ...params }}, undefined, {shallow:true})        

        
    }
    

    return (
        <>
            <style jsx>{`
                .selectedFilter {
                    background-color: rgba(229, 229, 229, 1)
                }

                .selectedFilter button {
                    width: 20px;
                    text-align: center
                }

                .selectedFilter button svg {
                    width: 15px;
                    fill: rgba(94, 94, 94, 1)
                }
            `}</style>

            <div> 
                <div className="row gx-2 justify-content-left">
                {
                    map(selectedFilters,(value,key)=>{
                        // console.log(value,key);

                        return( value !== undefined && value !== 'filter') ? (
                            <div key={key} className="col-auto">
                                <div className="selectedFilter h-100 rounded px-2 py-1 d-flex align-items-center">
                                    <span className="medium text-capitalize">{value}</span>
                                    <button className="bg-transparent border-0" onClick={()=>removeFilter(key)}>
                                        <span>
                                        <svg viewBox="0 0 20 20" className="" focusable="false" aria-hidden="true"><path d="m11.414 10 4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z"></path></svg>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ) : ''
                    })
                }
                    {/* <div className="col-auto">
                        <div className="selectedFilter h-100 rounded px-2">
                            <span className="medium">Minimum order $100</span>
                            <button className="bg-transparent border-0">
                                <span>
                                <svg viewBox="0 0 20 20" className="" focusable="false" aria-hidden="true"><path d="m11.414 10 4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10z"></path></svg>
                                </span>
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    )
}