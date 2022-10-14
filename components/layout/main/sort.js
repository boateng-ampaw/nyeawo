import { useRouter } from "next/router"

const sortParams = [
    {
        id: 1,
        label: 'Recommended',
        value: 'product_recommendation',
        order: 'desc'
    },
    {
        id: 2,
        label: 'Lowest prices first',
        value: 'pp_price',
        order: 'asc'
    },
    {
        id: 3,
        label: 'Highest prices first',
        value: 'pp_price',
        order: 'desc'
    }
]

// sort=pp_price&order=-o
// sort=product_recommendation

export default function SortProducts(){
    const router = useRouter()

    const sortProducts = (e,params)=>{

        // console.log(e,e.target.selectedIndex,params);
        var sortObject = e.target.options[e.target.selectedIndex].getAttribute('data-value');
        const sortObjectData = JSON.parse(sortObject)
        // console.log(JSON.parse(sortObject));

        router.push({
            pathname: router.pathname,
            query: {...router.query,...sortObjectData}
        },undefined,{shallow: true})

    }


    return (
        <select className="form-select" name="sort_by" defaultValue='Sort products' aria-label="Default select example" onChange={(e)=>sortProducts(e,{})}>
            <option>Sort products</option>
            {
                sortParams.map(sort=>{
                   return <option className="fw-light" key={sort.id} value={sort.value} data-value={JSON.stringify({sort:1,sort_by:sort.value,order:sort.order || undefined})} onChange={(e)=>sortProducts(e,{sort:sort.value})} >{sort.label}</option>
                })
            }
        </select>
    )
}