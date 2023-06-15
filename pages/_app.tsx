import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import { lightTheme } from '@/themes'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';
import { CartProvider, UiProvider } from '@/context';
import { AuthProvider } from '../context/auth/AuthProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig 
        value={{
          refreshInterval: 500,
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={ lightTheme }>
                <CssBaseline />
                <Component { ...pageProps }/>
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  )
}
