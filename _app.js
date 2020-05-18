import HoneySuckle from './games/honeysuckle.js'
import { useEffect } from 'react'
import './app.css'
export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
if(Component === HoneySuckle)import('./games/honeysuckle.css')

    },[Component]);
  return <Component {...pageProps} />
}