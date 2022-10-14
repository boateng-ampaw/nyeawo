// import useCategories from "../../../utils/hooks/categories"
import Link from "next/link"
import BottomNavStyles from '../../../styles/bottom-nav-styles.module.css'
import { useGetCategories } from "../../../../hooks/categories"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function BottomNav({visibility}){

    const {categories=[],isLoading,isError} = useGetCategories()

    // console.log('The data',categories,isLoading,isError);

    
    
    return <div className={`${visibility} bg-white`}>
        <div className="container-fluid container-xl">
            <ul className={`${BottomNavStyles.bottomNavWrap} d-lg-flex align-items-lg-center justify-content-center list-unstyled mb-0`}>
                {
                isLoading ? <div className="flex-fill px-lg-5"><Skeleton height={10} width={`100%`} /></div> : categories.map(category=>{
                        return <li key={category.id} className="mb-3 mb-lg-0"><Link href={`/${category.slug}`}><a className="text-dark text-decoration-none fs-6" dangerouslySetInnerHTML={{__html: category.title }}></a></Link></li>
                    }) 
                }
                
            </ul>
        </div>
    </div>
}