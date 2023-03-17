import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import styles from "../styles/TrendingCoins.module.css"
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { FaSearch } from "react-icons/fa"
import logo from "../assets/nav-logo.svg"
import Image from "next/image"
import Select from 'react-select';
import { AiOutlineStar } from "react-icons/ai"




type topCoinObj = {
  coinName: string,
  image: string,
  percentChange: number,
  current_price: number,
  id: number,
  symbol: string,
  price_change_percentage_24h: number
}

const TrendingCoins = () => {

  const [topCoins, setTopCoins] = useState<topCoinObj[]>([]);

  const fecthCoinData = async () => {

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
    setTopCoins(response.data)

    // fetch("https://api.coingecko.com/api/v3/coins/bitcoin").then(res => res.json()).then(data => console.log(data))
  }


  useEffect(() => {
    fecthCoinData();
  }, []);


  const responsive = {
    0: {
      items: 2,
      stagePadding: {
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
    768: {
      items: 4,
      stagePadding: {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  };



  return (
    <div className={"relative top-6 mr-2"}>
      <p className="text-2xl font-semibold text-center mb-8 relative -top-2">Top Coins </p>

      <div className={styles.trendingHold}>

        {topCoins.length > 0 ?
          <AliceCarousel autoPlay={true} autoPlayInterval={1050} animationDuration={800} mouseTracking infinite={true} disableButtonsControls={true} disableDotsControls={true} responsive={responsive}>
            {topCoins.map((item, index) => {
              return (
                <div key={item.id + index} className="w-28">
                  <img src={item.image} className="w-20 h-20" />
                  <div className='flex gap-2 text-sm'>
                    <p className='font-semibold uppercase'> {item.symbol} </p>
                    <p className={item.price_change_percentage_24h > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{item.price_change_percentage_24h.toFixed(2)}%</p>
                  </div>

                  <p className='w-20 mt-2 text-center font-semibold text-sm'>$ {item.current_price.toLocaleString()} </p>

                </div>
              )
            })}
          </AliceCarousel>
          :
          <p> LOADING... </p>
        }
      </div>

      <br />
      <br />
      <br />
      <br />





    </div>
  );
};

export default TrendingCoins;
