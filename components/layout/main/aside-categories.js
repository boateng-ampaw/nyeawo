import { useContext } from "react"
// import { useGetCategories } from "../../../hooks/categories"
import Link from "next/link"

export default function AsideCategories(props){
    const {categories, category_type, sub_category_title} = props
    // const {categories:test,isLoading,isError} = useGetCategories()

    // if(isLoading) return 'Loading...'

    // console.log('Aside categories',test,isLoading,isError);

    return (
        <div className="mb-5">
            <h6 className='mb-3 fw-semibold'><Link href={`/`}><a className='text-dark text-decoration-none'>All Products</a></Link></h6>
            <ul className='list-unstyled'>
                {
                    category_type === 'top_level_categories' ? categories.map(category=>{
                        return <li key={category.id} className='mb-3'><Link href={`/c/${category.slug}`} ><a className='text-dark text-decoration-none fs-6' dangerouslySetInnerHTML={{__html: category.title}} ></a></Link></li>
                    }) : <>
                    
                    <li className='mb-2'><Link href={`/`}><a className='text-dark text-decoration-none' dangerouslySetInnerHTML={{__html: sub_category_title.length ? sub_category_title : '' }}></a></Link></li>
                    {
                        categories.map(category=>{
                            return <li key={category.id} className='mb-3'><Link href={`/c/${category.slug}`}><a className='text-dark text-decoration-none fs-6'><span className='pe-2 text-dark small'>↳</span><span dangerouslySetInnerHTML={{__html: category.title}} className='fw-light'></span></a></Link></li>
                        })
                    }
                    </>
                }
                
            </ul>
            </div>
    )
}