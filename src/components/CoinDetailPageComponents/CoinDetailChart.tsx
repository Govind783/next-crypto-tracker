import React from 'react'
import Chart from 'chart.js/auto';
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';


interface CoinDetailDataType {
    image: {
        large: string;
    },

    description: {
        en: string
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
        ath: {
            usd: number
        },

        atl: {
            usd: number,
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

const CoinDetailChart = (props: any) => {

    const chartRef = useRef<any>(null);
    const specificCrytpCoinData: CoinDetailDataType = props.specificCoinDetails;
    console.log(specificCrytpCoinData)

    const [chartDataState, setChartDataState] = useState<any[]>([])

    const fetchDataHandler = async () => {
        try {
            const response1 = await fetch(
                `https://api.coingecko.com/api/v3/coins/${props.cryptoName}/market_chart?vs_currency=usd&days=10`
            );
            if (!response1.ok) {
                throw new Error(`Error fetching the coins chart: ${response1.status} ${response1.statusText}`);
            }
            const data1 = await response1.json();
            setChartDataState(data1.prices);
            // Parse relevant data for chart

            // Destroy previous chart instance if exists
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }



            const coinPrices = data1.prices;
            const chartLabels = coinPrices.map((price: (string | number | Date)[]) => new Date(price[0]).toLocaleDateString());
            const chartData = coinPrices.map((price: [string, number]) => price[1]);

            // Create chart using Chart.js
            const chartCanvas: CanvasRenderingContext2D = chartRef.current?.getContext('2d');
            const chartInstance = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: chartLabels,
                    datasets: [{
                        label: 'Coin Price',
                        data: chartData,
                        borderColor: 'red',
                        fill: false,
                        pointHitRadius: 10

                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Disable aspect ratio to fit container
                    scales: {
                        x: {
                            display: false,
                            title: {
                                display: false,
                                text: ''
                            },
                            grid: {
                                display: false, // Set display to false to disable x-axis grid lines
                            },
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: ''
                            },
                            grid: {
                                display: false, // Set display to false to disable x-axis grid lines
                            },
                        }
                    },

                    elements: {
                        point: {
                            radius: 0, // Set the radius of the data points to 5 pixels
                            backgroundColor: "red", // Set the background color of the data points
                            borderWidth: 0, // Set the border width of the data points to 2 pixels
                        },
                    },
                }
            })
            chartRef.current.chart = chartInstance

        } catch (error) {
            throw new Error('Error fetching gaming coins: ' + error);
        }


    };


    useEffect(() => {
        fetchDataHandler();
    }, [])


    return (
        <div className='flex justify-evenly flex-wrap items-center'>
            <div className='w-full  cooinDetailChartHold'>
                <canvas ref={chartRef}></canvas>
            </div>


            <div className="statsCardHold boxsh2 rounded">

                <div className="flex flex-col gap-2 items-center pt-8 pb-8 justify-center">

                    <div className='flex items-center gap-2 mb-5'>
                        <img src={specificCrytpCoinData.image.large} alt="logo" className='w-10 bg-white rounded-full boxsh2' />
                        <div className="flex-col items-center flex gap-2">
                            <p> Price statisticts </p>
                        </div>
                    </div>

                    <div className='bg-gray-100 height1 w99 mx-auto'></div>

                    <div className='flex justify-between w80Perc gap-2'>
                        <p className='text-gray-400'>Price</p>
                        <p className='font-semibold'> ${specificCrytpCoinData.market_data.current_price.usd.toLocaleString()} </p>
                    </div>

                    <div className='bg-gray-100 height1 w99 mx-auto'></div>

                    <div className='flex justify-between w80Perc gap-2'>
                        <p className='text-gray-400'>Price Change</p>
                        <p className={`${specificCrytpCoinData.market_data.price_change_24h > 0 ? "text-green-500 text-lg font-semibold" : "text-red-500 text-lg font-semibold"}`}> ${Math.floor(specificCrytpCoinData.market_data.price_change_24h).toLocaleString()} </p>
                    </div>

                    <div className='bg-gray-100 height1 w99 mx-auto'></div>

                    <div className='flex justify-between w80Perc gap-2'>
                        <p className='text-gray-400'>All Time High</p>
                        <p className='font-semibold'> ${specificCrytpCoinData.market_data.ath.usd.toLocaleString()} </p>
                    </div>

                    <div className='bg-gray-100 height1 w99 mx-auto'></div>

                    <div className='flex justify-between w80Perc gap-2'>
                        <p className='text-gray-400'>All Time Low</p>
                        <p className='font-semibold'> ${specificCrytpCoinData.market_data.atl.usd.toLocaleString()} </p>
                    </div>

                    <div className='bg-gray-100 height1 w99 mx-auto'></div>

                    <div className='flex justify-between w80Perc gap-2'>
                        <p className='text-gray-400'>Volume</p>
                        <p className='font-semibold'> ${specificCrytpCoinData.market_data.total_volume.usd.toLocaleString()} </p>
                    </div>

                    <div className='bg-gray-100 height1 w99 mx-auto'></div>


                    <div className='flex justify-between w80Perc gap-2'>
                        <p className='text-gray-400'>Rank</p>
                        <p className='font-semibold'> #{specificCrytpCoinData.market_cap_rank} </p>
                    </div>

                    <div className='bg-gray-100 height1 w99 mx-auto'></div>

                    {specificCrytpCoinData.description.en.length > 20 &&
                        <div className='flex justify-between w80Perc mt-5 gap-2'>
                            <p className='font-semibold'> {specificCrytpCoinData.description.en.substring(0, 250)} <Link target="_blank" href={`${specificCrytpCoinData.links.homepage[0]}`} className='text-yellow-500 hover:underline'>Read More</Link> </p>
                        </div>}
                </div>

            </div>

        </div>
    )
}

export default CoinDetailChart