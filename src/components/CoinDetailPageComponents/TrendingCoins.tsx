import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import styles from "../../styles/TrendingCoins.module.css"
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { BsArrowUpRight } from "react-icons/bs"
import { FiTrendingDown } from "react-icons/fi"
import { FiTrendingUp } from "react-icons/fi"
import Link from 'next/link';

type topCoinObj = {
  coinName: string,
  image: string,
  percentChange: number,
  current_price: number,
  id: number,
  symbol: string,
  price_change_percentage_24h: number,
  high_24h: number,
  low_24h: number

}

const TrendingCoins = () => {

  const [topCoins, setTopCoins] = useState<topCoinObj[]>([]);

  const fecthCoinData = async () => {

    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    )
    setTopCoins(response.data)

  }


  useEffect(() => {
    fecthCoinData();
  }, []);


  const responsive = {
    0: {
      items: 1,
      stagePadding: {
        paddingLeft: 20,
        paddingRight: 20,
      },
    },
    768: {
      items: 2,
      stagePadding: {
        paddingLeft: 10,
        paddingRight: 10,
      },
    },

    1150: {
      items: 4,
      stagePadding: {
        paddingLeft: 40,
        paddingRight: 40,
      },
    },
  };



  return (
    <div className={"relative top-6 sm:mr-4"}> {   /* agar mobile pe center nahi hora toh remove this margin right  */}
      <p className="text-2xl font-medium lg:left-36 md:left-24 mb-8 relative -top-2 interFont ml-6">Market Trend </p>

      <div className={styles.trendingHold}>

        {topCoins.length > 0 ?
          <AliceCarousel autoPlay={true} autoPlayInterval={1050} animationDuration={800} mouseTracking infinite={true} disableButtonsControls={true} disableDotsControls={true} responsive={responsive}>
            {topCoins.map((item, index) => {
              return (
                <div key={item.id + index} className="boxshDark w-80 h-44 rounded-md flex flex-col">

                  <div className="trendingUpperHold justify-between items-center flex gap-4 pl-4 mt-4">

                    <Link href={`/${item.id}`}>
                      <div className='trendingUpper-1 flex items-center gap-2'>
                        <img src={item.image} className="w-10 h-10" alt='ada' />
                        <p className='font-semibold uppercase'> {item.symbol.substring(0, 8)} </p>
                        <p className='bg-gray-100 whitespace-nowrap capitalize rounded font-normal w-auto pr-2 pl-2 h-7'> {item.id.toString().substring(0, 11)} </p>
                      </div>
                    </Link>

                    <BsArrowUpRight className=' font-semibold text-gray-400 text-xl mr-5' />

                  </div>

                  <br />
                  <hr className='pr-4 pl-4 mb-3' />

                  <div className="flex text-sm items-center justify-between pl-3 pr-8 mb-3">
                    <p className='mt-2 text-center'><span className='text-black font-semibold'>price:</span> $ {item.current_price.toLocaleString()} </p>
                    <p className={item.price_change_percentage_24h > 0 ? "text-green-600" : "text-red-600"}> <span className='text-black font-semibold'>change:</span> {item.price_change_percentage_24h.toFixed(2)}%</p>
                  </div>

                  <div className='flex items-center text-sm justify-between gap-4 pr-0 pl-0'>
                    <div className='flex text-sm items-center gap-1 pl-3 pr-2'>
                      <p className='font-semibold whitespace-nowrap text-xs text-black '>24H High:</p>
                      <p className='whitespace-nowrap  text-green-500 text-sm flex items-center gap-1'> {item.high_24h.toLocaleString()} <FiTrendingUp className='text-green-500 font-semibold text-lg' /> </p>
                    </div>

                    <div className='flex text-sm items-center gap-1 pl-3 pr-2'>
                      <p className='font-semibold whitespace-nowrap text-xs text-black '>24H Low:</p>
                      <p className='whitespace-nowrap  text-red-500 text-sm flex items-center gap-1'>{item.low_24h.toLocaleString()} <FiTrendingDown className='text-red-500 font-semibold text-lg' /> </p>
                    </div>
                  </div>

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

/*

                  <div className='flex gap-2 text-sm'>
                  </div>


*/