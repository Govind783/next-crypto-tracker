import React from 'react'
import Link from 'next/link'
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay } from "swiper"
import Loading from './Loading';
import { IoHome } from "react-icons/io5"
import { FaGithub, FaReddit } from "react-icons/fa"
import CoinDetailChart from '@/components/CoinDetailPageComponents/CoinDetailChart';



interface CoinDetailDataType {
    image: {
        large: string;
    },

    market_data: {
        current_price: {
            usd: number
        },
        price_change_24h: number,
        market_cap: {
            usd: number
        },
        fully_diluted_valuation: {
            usd: number
        },
        total_volume: {
            usd: number
        },
        circulating_supply: number
    },

    id: string,
    market_cap_rank: number,
    categories: string[],
    symbol: string,
    links: {
        homepage: string[],
        repos_url: {
            github: string[]
        },
        subreddit_url: string,
    }

}


type CoinData = {
    item: {
        id: number;
        name: string;
        price: number;
        symbol: string;
        market_cap_rank: number;
        small: string
        // add other properties as needed
    };
};



const CoinDetailHero = (props: any) => {

    const [coinDetailData, setCoinDetailData] = useState<CoinDetailDataType>({
        image: {
            large: ''
        },

        market_data: {
            current_price: {
                usd: 0
            },
            price_change_24h: 0,
            market_cap: {
                usd: 0
            },
            fully_diluted_valuation: {
                usd: 0
            },
            total_volume: {
                usd: 0
            },
            circulating_supply: 0
        },

        id: '',
        market_cap_rank: 0,
        categories: [],
        symbol: '',
        links: {
            homepage: [""],
            repos_url: {
                github: [""]
            },
            subreddit_url: "",
        }
    })
    const [trendingCoinsData, setTrendingCoinsData] = useState<CoinData[]>([])
    const [coinName, setCoinName] = useState<string>("")


    const fetchDataHandler = async () => {
        try {
            const response1 = await fetch(
                `https://api.coingecko.com/api/v3/coins/${props.cryptoName}?tickers=false&community_data=false&developer_data=false`
            );
            if (!response1.ok) {
                throw new Error(`Error fetching coin detail data: ${response1.status} ${response1.statusText}`);
            }
            const data1 = await response1.json();
            setCoinDetailData(data1);
            setCoinName(data1.id);

        } catch (error) {
            console.error('Error fetching coin detail data:', error);
        }

        try {
            const response2 = await fetch('https://api.coingecko.com/api/v3/search/trending');
            if (!response2.ok) {
                throw new Error(`Error fetching trending coins data: ${response2.status} ${response2.statusText}`);
            }
            const data2 = await response2.json();
            setTrendingCoinsData(data2.coins);
        } catch (error) {
            console.error('Error fetching trending coins data:', error);
        }
    };


    useEffect(() => {
        fetchDataHandler();
    }, [])




    return (
        <div>
            {coinDetailData && coinDetailData.market_data ? <div>

                {coinDetailData && coinDetailData.market_data && <>

                    <nav className="container interFont lg:ml-20">
                        <ol className="list-reset py-4 pl-1 rounded flex bg-grey-light text-grey">
                            <li className="px-2 text-gray-400"><a className="no-underline text-indigo">Cryptocurrencies</a></li>
                            <li>/</li>
                            <li className="px-2 text-gray-400"><a className="no-underline text-indigo">Coins</a></li>
                            <li>/</li>
                            <li className="px-2 capitalize">{props.cryptoName}</li>
                            <li>/</li>
                            <li className="px-2 text-gray-400"><Link href={"/"} className="no-underline text-indigo hover:underline">Home</Link></li>
                        </ol>
                    </nav>

                    <div className="coinDetailHeaderParentHold interFont flex justify-start ml-4 md:ml-0 mt-8 md:mt-0 md:justify-evenly gap-8 flex-wrap items-center">

                        <div className="coinDetailParentOne mb-9 md:mb-0">
                            <div className='flex items-center gap-6'>
                                {<img src={coinDetailData.image.large} className=' md:w-28 w-24 rounded-full boxsh2' alt='ada' />}
                                <div className="flex flex-col gap-8 items-center -ml-4">
                                    <p className=' font-normal text-xl uppercase'> {coinDetailData.id} <span className=' text-gray-400 font-normal text-sm relative -top-4'> #{coinDetailData.market_cap_rank} </span> </p>
                                    <p className=' font-semibold text-2xl'> ${coinDetailData.market_data.current_price.usd.toLocaleString()}


                                        <span className={coinDetailData.market_data.price_change_24h < 0 ? 'text-red-500' : 'text-green-500'}>
                                            {coinDetailData.market_data.price_change_24h < 0 ?
                                                <div className="flex items-center justify-end relative -top-14 left-5">
                                                    <span className='text-sm'>
                                                        {coinDetailData.market_data.price_change_24h.toFixed(0)}$
                                                    </span>
                                                </div>
                                                :
                                                <div className="flex items-center justify-end relative -top-14 left-5">
                                                    <span className='text-sm'>
                                                        +${coinDetailData.market_data.price_change_24h.toFixed(0)}
                                                    </span>
                                                </div>}
                                        </span>


                                    </p>
                                </div>
                            </div>

                        </div>

                        {  /* CHILD2 TRENDING COINS */}

                        {trendingCoinsData.length > 0 && (
                            <div className='flex justify-center items-center gap-10 coinDetailCarouselHold mb-9 md:mb-0 boxsh rounded-md'>
                                <Swiper spaceBetween={5} slidesPerView={5} loop={true} parallax={true} modules={[Autoplay]} autoplay={{ delay: 1000 }} breakpoints={{ 300: { slidesPerView: 2 }, 700: { slidesPerView: 3 }, 1280: { slidesPerView: 5 } }} className='swiperCaro' >
                                    {trendingCoinsData.map((coin, index) => {
                                        return (
                                            <div key={index}>
                                                <SwiperSlide>
                                                    <div >
                                                        <div className="flex gap-6 flex-wrap">
                                                            <img src={coin.item.small} alt="" className='bg-white rounded-full w-16 boxsh2' />
                                                            <p className='text-gray-400 font-semibold text-sm'> #{coin.item.market_cap_rank} </p>
                                                        </div>
                                                        <br />
                                                        <div className="flex flex-col gap-4">
                                                            <p className='text-base font-semibold'>{coin.item.name.substring(0, 8)}</p>
                                                            <p className='text-gray-400 font-normal text-sm'> {coin.item.symbol} </p>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>

                                            </div>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        )}
                    </div>

                </>}

                {trendingCoinsData.length > 0 && <div className="coinDetailTagsHold ml-4 md:flex-col flex-row flex w37percent items-center lg:flex">

                    <div className='flex items-center gap-4 justify-start w48percent w-full flex-wrap mt-3'>
                        {coinDetailData.categories && coinDetailData.categories[0] && <p className="bg-gray-200 w-auto pl-3 pr-3 flex justify-center boxsh items-center rounded h-auto pt-2 pb-1"> {coinDetailData.categories[0]} </p>}
                        {coinDetailData.categories && coinDetailData.categories[1] && <p className="bg-gray-200 w-auto pl-3 pr-3 flex justify-center boxsh items-center rounded h-auto pt-2 pb-1"> {coinDetailData.categories[1]} </p>}
                    </div>

                </div>}

                <br />

                {trendingCoinsData.length > 0 && <div className="coinDetailTagsHold ml-4 md:flex-col flex-row flex w37percent items-center lg:flex">

                    <div className='flex items-center gap-4 justify-start w48percent w-full flex-wrap mt-3'>
                        {coinDetailData.links && coinDetailData.links.homepage[0] && <Link href={`${coinDetailData.links.homepage[0]}`} target="_blank" className="bg-gray-200 w-auto pl-3 pr-3 flex justify-center items-center rounded-full h-9 boxsh">  <IoHome /> </Link>}
                        {coinDetailData.links && coinDetailData.links.repos_url.github[0] && <Link href={`${coinDetailData.links.repos_url.github[0]}`} target='_blank' className="bg-gray-200 w-auto pl-3 pr-3 flex justify-center items-center rounded-full h-9 boxsh"> <FaGithub /> </Link>}
                        {coinDetailData.links && coinDetailData.links.subreddit_url && <Link href={`${coinDetailData.links.subreddit_url}`} target='_blank' className="bg-gray-200 w-auto pl-3 pr-3 flex justify-center items-center rounded-full h-9 boxsh"> <FaReddit /> </Link>}

                    </div>

                </div>}


                <br />
                <br />
                <br />

                {trendingCoinsData.length > 0 && <div className="coindDetailStats1Hold pr-4 pl-4 hidden lg:flex items-center justify-evenly flex-wrap gap-10">

                    <div className="coinDetailStat1Hold items-center flex flex-col gap-8">
                        <p className='text-xl font-semibold w-full pl-4'>Market Cap</p>
                        <div className="pl-3">
                            <div className="flex items-center gap-2">
                                <span className='text-2xl font-semibold text-gray-400 interFont'>$</span>
                                {coinDetailData.market_data && coinDetailData.market_data.market_cap.usd && <p className=' font-semibold statHeading interFont'>  {coinDetailData.market_data.market_cap.usd.toLocaleString()} </p>}
                            </div>
                        </div>
                    </div>

                    <p className='bg-gray-100 coinDetailDivider h-28'></p>

                    <div className="coinDetailStat1Hold items-center flex flex-col gap-8">
                        <p className='text-xl font-semibold w-full pl-4'>Fully Diluted</p>
                        <div className="">
                            <div className="flex items-center gap-2">
                                <span className='text-2xl font-semibold text-gray-400 interFont'>$</span>
                                {coinDetailData.market_data && coinDetailData.market_data.fully_diluted_valuation.usd && <p className=' font-semibold statHeading interFont'>  {coinDetailData.market_data.fully_diluted_valuation.usd.toLocaleString()} </p>}
                            </div>
                        </div>
                    </div>

                    <p className='bg-gray-100 coinDetailDivider h-28'></p>

                    <div className="coinDetailStat1Hold items-center flex flex-col gap-8">
                        <p className='text-xl font-semibold w-full pl-4'>Volume</p>
                        <div className="pl-3">
                            <div className="flex items-center gap-2">
                                <span className='text-2xl font-semibold text-gray-400 interFont'>$</span>
                                {coinDetailData.market_data && coinDetailData.market_data.total_volume.usd && <p className=' font-semibold statHeading interFont'>  {coinDetailData.market_data.total_volume.usd.toLocaleString()} </p>}
                            </div>
                        </div>
                    </div>

                    <p className='bg-gray-100 coinDetailDivider h-28'></p>

                    <div className="coinDetailStat1Hold items-center flex flex-col gap-8">
                        <p className='text-xl font-semibold w-full pl-4'>Circulating Supply</p>
                        <div className="pl-3">
                            <div className="flex items-center gap-2">
                                <span className='text-2xl font-semibold text-gray-400 interFont'>$</span>
                                {coinDetailData.market_data && coinDetailData.market_data.circulating_supply && coinDetailData.symbol && <p className=' font-semibold statHeading interFont'>  {Math.floor(coinDetailData.market_data.circulating_supply).toLocaleString()}<span className=' text-gray-300 font-normal uppercase'> {coinDetailData.symbol} </span> </p>}
                            </div>
                        </div>
                    </div>

                </div>}

                <br />
                <br />
                <br />
                <br>
                </br>

                {trendingCoinsData.length > 0 && <CoinDetailChart cryptoName={coinName} specificCoinDetails={coinDetailData} />}

            </div>
                :
                <div className='flex justify-center items-center'>
                    <Loading />
                </div>

            }
        </div>
    )
}

export default CoinDetailHero