import { useEffect } from "react"
import { useRouter } from "next/router"

export default function VariableGoogleAd(props){
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
        <div key={currentPath}>
        <ins className="adsbygoogle adbanner-customize"
            style={{display:"block"}}
            data-ad-client="ca-pub-2277292020055346"
            data-ad-slot={props.slot}
            data-ad-format="auto"
            data-full-width-responsive="true">

        </ins>
        </div>
    )
}