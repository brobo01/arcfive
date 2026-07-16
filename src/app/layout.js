import Script from "next/script"
import "./globals.css"

export const metadata = {
  title: "The Arc Five — Case #001: The Last Corner",
  description:
    "A five-day investigation into the death of Ayrton Senna at Imola, 1994.",
}

const GA_MEASUREMENT_ID = "GTM-K5Z429SJ"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-ABCDEFGH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  )
}
