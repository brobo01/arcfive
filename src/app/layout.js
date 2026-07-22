import Script from "next/script"
import "./globals.css"

export const metadata = {
  title: "The Arc Five — Case #001: The Last Corner",
  description:
    "A five-day investigation into the death of Ayrton Senna at Imola, 1994.",
}

// Replace with your own GA4 Measurement ID (starts with "G-")
const GA_MEASUREMENT_ID = "G-FF2L1C01ZP"

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga4-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
