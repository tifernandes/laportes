import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import LayoutAdmin from '../components/admin/LayoutAdmin'

function MyApp({ Component, pageProps, router }){

  if (router.pathname.includes('/admin')) {
    return (
      <LayoutAdmin>
        <Component {...pageProps} />
      </LayoutAdmin>
    )
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
