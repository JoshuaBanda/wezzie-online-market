"use client";
import ClipMaskImages from "./ClipMaskImages";
import styles from "./styles/mobileLandingPageHeader.module.css";


const MobileLandingPageHeader = () => {
    return (
        <div className={styles.container}>
            <section>
                <div>

                <ClipMaskImages/>
                </div>
            </section>
            <section className={styles.brandImages}>
            </section>
        </div>
    );
}
 
export default MobileLandingPageHeader;