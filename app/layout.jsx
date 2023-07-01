

import { CheckoutProvider } from '@/context/CheckoutContext'
import './globals.css'

import Provider from '@/components/Provider'

export const metadata = {
  title: 'Game Store',
  description: 'E-Commerce platform for Games',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <CheckoutProvider>
            {children}
          </CheckoutProvider>
        </Provider>
      </body>
    </html>
  )
}
