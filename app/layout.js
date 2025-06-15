import "./globals.css";
import BottomMenuWrapper from "@/components/BottomMenuWrapper";
import { ToastProvider } from "@/components/ToastProvider";
import { UserProvider } from "./userContext";

import Analytics from "./analytics/page";
import Script from "next/script";

export const metadata = {
  title: "Wezzie Market Online",
  description: "Online Market",
};


export default function RootLayout({ children }) {
  const GA_ID = 'G-TVXW0YJ4QY'; // Replace with your actual GA4 ID

  return (
    <html
      lang="en"
    >
      <head>
        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <UserProvider>
        <Analytics/>
          <div className="blur-wrapper">{children}
          
          </div>
          <BottomMenuWrapper />
        </UserProvider>
        <ToastProvider />
       {/* <FadedColor />*/}
      </body>
    </html>
  );
}
