import Layout from '../components/Layout';
import '../styles/globals.css';
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log('start');
      setLoading(true);
    };
    const end = () => {
      console.log('findished');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return <Layout>{loading ? <Loader /> : <Component {...pageProps} />}</Layout>;
}

export default MyApp;
