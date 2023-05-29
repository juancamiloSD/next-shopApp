import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';
import type { AppProps } from 'next/app'
import { UiProvider } from '../context/ui';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        refreshInterval: 500,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <UiProvider>
        <ThemeProvider theme={ lightTheme }>
          <CssBaseline />
          <Component { ...pageProps }/>
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  )
}
