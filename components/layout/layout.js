// import TopNav from "./nav/top-nav/top-nav"
import Nav from "./nav/nav"
import Footer from "./footer"
import LayoutStyles from '../styles/layout.module.css'

export default function Layout({children}){

    return <div>
        <Nav />
        <main className={`${LayoutStyles.mainWrap}`} style={{minHeight: '720px'}} >
            {children}
        </main>

        <Footer />
    </div>

}