import TopNav from "./top-nav/top-nav"
import BottomNav from "./bottom-nav/bottom-nav"

export default function Nav(){
    return (
    <nav className={`mainNavWrap position-fixed`}>
        <TopNav />        
        <BottomNav visibility={`d-none d-lg-block border-bottom`} />
    </nav>
    )
}