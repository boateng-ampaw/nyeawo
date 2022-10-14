import { useEffect } from "react"


export default function FixedGoogleAd(props){
    const { currentPath } = props

    const loadAds = () => {
        try {
          if (typeof window !== "undefined") {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (error) {
          console.log("adsense error", error.message);
        }
      };

    useEffect(()=>{
        console.log('Trigger Ad refresh',currentPath);
        loadAds();
    },[currentPath])

    return (
        <div>
               <ins class="adsbygoogle adbanner-customize"
                    style={{display:'inline-block',width:'728px',height:'100px'}}
                    data-ad-client="ca-pub-2277292020055346"
                    data-ad-slot={props.slot}>
                    
                    </ins>
        </div>
    )
}