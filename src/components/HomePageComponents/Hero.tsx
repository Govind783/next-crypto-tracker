import React from 'react'
import heroImgae from "../assets/gr2.png"
import Image from 'next/image'
import heroCarouselImage from "../../assets/heroMobile.png"
import heroCarouselImage2 from "../../assets/heroCarouseLImage1.png"
import heroCarouselImage3 from "../../assets/herocarouseLImage2.png"
import heroCarouselImage4 from "../../assets/heroCarouselImage3.png"
import heroCarouselImage5 from "../../assets/heroCarouselImage4.png"
import heroCarouselImage6 from "../../assets/heroCarouselIMage5.png"
import Marquee from 'react-fast-marquee';



const Hero = () => {

    return (
        <div className=''>

            <div className='heroTopBackgroundHold flex'>
                <div className="herobg1 w-full bg-white h-24">

                </div>

                <div className="herobg2 w-full h-24">

                </div>

            </div>
            <div className="flex HeroParenTHold flex-wrap md:flex-nowrap justify-evenly items-center">


                <div className="heroChildOneHold flex-col flex justify-center items-center">
                    <div className="heroChild1">

                        <div className="heroInnerChild1 flex flex-col gap-4">
                            <div>
                                <p className='text-4xl interFont font-normal'>
                                    Middle East Leadger <br />
                                    in Market and OTC <br />
                                    transactions
                                </p>
                            </div>

                            <p className=' font-semibold'>Track your favputite CryptoCoins on the go all <br />
                                at one place with  a wide variety of exachanges <br />
                            </p>

                            <button className='flex justify-center items-center mt-8 w-36 h-10 rounded bg-black text-white font-semibold transition-all ease-in-out duration-500 hover:bg-transparent hover:border hover:text-black border-black' onClick={() => window.scrollTo({
                                behavior: "smooth",
                                top : 1100
                            })}>Learn More</button>
                        </div>


                    </div>

                    <div className="heroStatsHold bg-white text-black flex justify-center items-center lg:gap-20 gap-12 md:gap-8 w-full h-28 mt-16 sm:pl-0 sm:pr-0 pl-3 pr-3">
                        <div className='heroStat1 pt-3 pb-3 font-semibold flex flex-col'>
                            <p className='md:text-2xl text-xl font-normal interFont'>10K+</p>
                            <p className='text-gray-500 font-normal text-xs md:text-sm lg:text-base interFont'> Total</p>
                            <p className='interFont text-gray-500 text-xs md:text-sm lg:text-base font-medium'>Digital Assets</p>
                        </div>

                        <div className='heroStat1 pt-3 pb-3 font-semibold flex flex-col'>
                            <p className='md:text-2xl text-xl font-normal interFont'>150+</p>
                            <p className='text-gray-500 font-normal text-xs md:text-sm lg:text-base interFont'>International Exchanges</p>
                            <p className='interFont text-gray-500 text-xs md:text-sm lg:text-base font-medium'>All Over The World</p>
                        </div>

                        <div className='heroStat1 pt-3 pb-3 font-semibold flex flex-col'>
                            <p className='md:text-2xl text-xl font-normal interFont'>$5B+</p>
                            <p className='text-gray-500 font-normal text-xs md:text-sm lg:text-base interFont'>Total Number Of Funds</p>
                            <p className='interFont text-gray-500 text-xs md:text-sm lg:text-base font-medium'>Secured With Us</p>
                        </div>
                    </div>


                </div>



                <div className="heroChildHold2 flex justify-center items-center">

                    <div className="heroCarouselHold flex items-center">
                        <Marquee play={true} speed={80} pauseOnHover={true} gradient={false}>
                            <Image src={heroCarouselImage} quality={100} priority className='heroCaroImage w-48' alt='Carousel image' />
                            <Image src={heroCarouselImage2} quality={100} priority className='heroCaroImage w-48' alt='Carousel image' />
                            <Image src={heroCarouselImage3} quality={100} priority className='heroCaroImage w-48' alt='Carousel image' />
                            <Image src={heroCarouselImage4} quality={100} priority className='heroCaroImage w-48' alt='Carousel image' />
                            <Image src={heroCarouselImage5} quality={100} priority className='heroCaroImage w-48' alt='Carousel image' />
                            <Image src={heroCarouselImage6} quality={100} priority className='heroCaroImage w-48' alt='Carousel image' />
                        </Marquee>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Hero
      
