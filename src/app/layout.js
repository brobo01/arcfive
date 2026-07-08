import "./globals.css"

export const metadata = {
  title: "The Arc Five — Case #001: The Last Corner",
  description:
    "A five-day investigation into the death of Ayrton Senna at Imola, 1994.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
