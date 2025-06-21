import Image from "next/image";
import styles from "./styles/mobileLandingPageHeader.module.css";
const ClipMaskImages = () => {
    return (
        < div>
            <div className={styles.clipMaskImages}>
                <div className={styles.firstClipMaskImages}>
                    
                    <Image
                        src='/wezzie2.png'
                        alt='brand'
                        quality={100}
                        width="350"
                        height="600"
                        sizes='(max-width:768px)100vw, (max-width:1200px)50vw, 33vw'
                        priority
                    />
                </div>
                <div className={styles.secondClipMaskImages}>
                    
                    <Image
                        src='/wezzie4.png'
                        alt='brand'
                        quality={100}
                        width="150"
                        height="240"
                        sizes='(max-width:768px)100vw, (max-width:1200px)50vw, 33vw'
                        priority
                    />
                </div>
                <div className={styles.thirdClipMaskImages}>
                    
                    <Image
                        src='/wezzie3.png'
                        alt='brand'
                        quality={100}
                        width="150"
                        height="200"
                        sizes='(max-width:768px)100vw, (max-width:1200px)50vw, 33vw'
                        priority
                    />
                </div>
            </div>
        
                    
                <div className={styles.content}>
                    <span>The <span id="customizedColor">Fasion App</span> That Makes You Look Your Best</span>
                </div>
        </div>
    );
}
 
export default ClipMaskImages;