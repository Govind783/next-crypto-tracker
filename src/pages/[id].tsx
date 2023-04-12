import React from 'react'
import { useRouter } from 'next/router'
import Navbar2 from '@/components/HomePageComponents/Navbar2';
import CoinDetailHero from '@/components/CoinDetailPageComponents/CoinDetailHero';
import Footer from '@/components/HomePageComponents/Footer';
import CoinDetailChart from '@/components/CoinDetailPageComponents/CoinDetailChart';

const Coindetail = () => {

  const router = useRouter();
  const coinName = router.query.id;

  return (
    <div>
      <div className="h-28">
        <Navbar2 />
      </div>

      <CoinDetailHero cryptoName={coinName} />

      <br />
      <br />
      <br />
      <br />

      <div>
      </div>

      <br />
      <br />
      <br />

      <Footer />

    </div>
  )
}

export default Coindetail

/**
   <div className="coinDetailTagsHold flex flex-col w40Percent items-center">

        <p className=' font-semibold text-lg flex justify-start w40Percent'>Tags</p>
        <div className='flex items-center gap-4 justify-start flex-wrap mt-3'>
          {coinDetailData.categories && coinDetailData.categories[0] && <p className="bg-gray-300 w-auto pl-3 pr-3 flex justify-center items-center rounded h-8"> {coinDetailData.categories[0]} </p>}
          {coinDetailData.categories && coinDetailData.categories[1] && <p className="bg-gray-300 w-auto pl-3 pr-3 flex justify-center items-center rounded h-8"> {coinDetailData.categories[1]} </p>}
          {coinDetailData.categories && coinDetailData.categories[2] && <p className="bg-gray-300 w-auto pl-3 pr-3 flex justify-center items-center rounded h-8"> {coinDetailData.categories[2]} </p>}
          {coinDetailData.categories && coinDetailData.categories[3] && <p className="bg-gray-300 w-auto pl-3 pr-3 flex justify-center items-center rounded h-8"> {coinDetailData.categories[3]} </p>}
        </div>

      </div>




                  {coinDetailData.maket_data && coinDetailData.market_data.market_cap_change_percentage_24h && <p className={`${coinDetailData.market_data.market_cap_change_percentage_24h > 0 ? "mt-1 text-sm font-semibold text-green-500 interFont" : "mt-1 text-sm font-semibold text-red-500 interFont"}`}> <span> {coinDetailData.market_data.market_cap_change_percentage_24h > 0 ? <span>+</span> : <span>-</span>} </span> {coinDetailData.market_data.market_cap_change_percentage_24h.toFixed(2)} </p>}
            {coinDetailData.maket_data && coinDetailData.market_data.price_change_percentage_24h && <p className={`${coinDetailData.market_data.price_change_percentage_24h > 0 ? "mt-1 text-sm font-semibold text-green-500 interFont" : "mt-1 text-sm font-semibold text-red-500 interFont"}`}> <span> {coinDetailData.market_data.price_change_percentage_24h > 0 ? <span>+</span> : <span>-</span>} </span> {coinDetailData.market_data.price_change_percentage_24h.toFixed(2)} </p>}


 */