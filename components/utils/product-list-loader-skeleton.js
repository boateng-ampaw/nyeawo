import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function ProductListLoaderSkeleton ({count}){
    return <>
    {[...Array(count)].map((x, i) =>{
        return (
            <div key={i} className={`col-6 col-md-4 col-lg-3 mb-5`}>
                <Skeleton count={1} height={223} className="w-100" />
                <Skeleton className='mt-4' count={1} height={10} width={`100%`} />
                <Skeleton className='mt-2' count={1} height={10} width={50} />
                <Skeleton className='mt-5' count={1} height={10} width={65} />
                <Skeleton className='mt-2' count={1} height={10} width={`75%`} />
            </div>
        )
    }    
    )}
    
    </>
}