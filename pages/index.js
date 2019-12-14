import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Ads from '../components/Ads';
import { getAds } from '../backend_interface/api_if';
import '../styles/styles.scss';
import 'normalize-scss/sass/_normalize.scss';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
const MapNoSSR = dynamic(() => import('../components/MkMap'), {
  ssr: false
});

const Home = () => {

  const [ads, setAds] = useState('')
  const loadAds = async () => {
    let ads = await getAds();


    setAds(ads);
  }

  useEffect(() => { loadAds() }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css" rel="stylesheet" />
        <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
      </Head>




      <div className="home_page">

        <Header />

        <div className="map_search">
          <div className="left_box">
            <Ads ads={ads} />

          </div>


          <MapNoSSR lat={45.527065} lon={-73.653534} ads={ads} />





        </div>
      </div>


    </div>
  )
}

export default Home;
