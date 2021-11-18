import { useState, useContext } from 'react';
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import LayoutAdmin from '../components/admin/LayoutAdmin'
import AuthContext from '../context/authContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { AuthProvider } from '../context/authContext';

function MyApp({ Component, pageProps, router }){

  const LoadingCmp = () => {
    const { loading } = useContext(AuthContext);

    if(loading){
      return (
        <div style={{display: 'flex', height: '65vh', justifyContent: 'center', alignItems: 'center'}}>
          <Spin size='large' indicator={<LoadingOutlined style={{ fontSize: 35, color: '#c07e20' }} spin />} />
        </div>
      )
    }

    if (router.pathname.includes('/admin')) {
      return (
        <LayoutAdmin>
          <Component {...pageProps} />
        </LayoutAdmin>
      )
    }

    if(router.pathname.includes('/login')){
      return (
        <Component {...pageProps} />
      )
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )

  }
  
  return (
    <AuthProvider>
        <LoadingCmp />
    </AuthProvider>
  )
}

export default MyApp
