import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import styles from "../styles/HomeComnponent.module.css"
import { FaSearch } from "react-icons/fa"
import logo from "../assets/nav-logo.svg"
import Image from "next/image"
import Select from 'react-select';
import { AiFillDollarCircle, AiOutlineStar, AiFillDelete } from "react-icons/ai"
import { RxCrossCircled, RxCross1 } from "react-icons/rx"
import { FiTrendingDown } from "react-icons/fi"
import { FiTrendingUp } from "react-icons/fi"
import { AiFillCaretDown } from "react-icons/ai"
import { AiOutlineDollarCircle, AiFillStar } from "react-icons/ai"
import { BiRupee } from "react-icons/bi"
import { useToast } from '@chakra-ui/react'
import { favouritesActions } from "../ReduxStore/FavouritesSlice";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { HiOutlineArrowsUpDown } from "react-icons/hi2"
import { Tooltip } from '@chakra-ui/react'
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa"

type topCoinObj = {
    coinName: string,
    image: string,
    percentChange: number,
    current_price: number,
    id: string,
    symbol: string,
    price_change_percentage_24h: number,
    market_cap: number,
}

const HomeComnponent = () => {

    const [cryptoData, setCryptoData] = useState<topCoinObj[]>([]);  // all coins
    const [filteredArray, setFilteredArray] = useState<topCoinObj[]>([]); // all coins
    const [seacrhTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState<number>(1);
    const [active, setActive] = useState(1);
    const [currencyModal, setCurrecnyModal] = useState(false);
    const [currency, setCurrency] = useState("usd");
    const [metaverseCoins, setMetavserseCoins] = useState<topCoinObj[]>([]) // metaverse coins
    const [metaverseFilter, setMetaverseFilter] = useState<topCoinObj[]>([]); // metaverse coins

    const [gamingCoins, setGamingCoins] = useState<topCoinObj[]>([]) // gaimng
    const [gamingFilter, setGamingFilter] = useState<topCoinObj[]>([]) // gaimng

    const [originalARR, setOriginalARR] = useState([]);
    const [tabState, setTabState] = useState("all coins");


    const pages = [1, 2, 3, 4];

    const reduxFavouritesARR = useSelector((state: any) => state.favourites.list);
    const toast = useToast();
    const dispacth = useDispatch();


    //fecthnig data
    useEffect(() => {
        // all coins
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setCryptoData(data)
                setOriginalARR(data);
                setFilteredArray(data);
            });

        // metaverse

        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&category=metaverse&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setMetavserseCoins(data)
                setMetaverseFilter(data)
            });


        //gaming
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&category=gaming&order=market_cap_desc&per_page=80&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => {
                setGamingCoins(data)
                setGamingFilter(data)
            });


    }, [currency]);



    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);

        // search for all coins
        if (tabState === "all coins") {

            if (filteredArray.length > 0) {
                const mutateArr = filteredArray.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }

        // search for metaverse

        else if (tabState === "metaverse") {

            if (metaverseFilter.length > 0) {
                const mutateArr = metaverseFilter.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }

        // search for gaming


        else if (tabState === "gaming") {

            if (gamingFilter.length > 0) {
                const mutateArr = gamingFilter.filter((item) => {
                    const coinName = item.id.toLowerCase().includes(searchTerm.toLowerCase());
                    const coinSymbol = item.symbol.toLowerCase().includes(searchTerm.toLowerCase());

                    return coinName || coinSymbol
                });

                setCryptoData(mutateArr);

                // Reset the active page to the first page
                setActive(1);
                setPage(1);
            }
        }



    };


    // redux methods
    const addToFavouritesHandler = (coin: topCoinObj) => {

        dispacth(favouritesActions.addToFavourites(coin));

        toast({
            title: "",
            description: "Added Successfully",
            status: "success",
            duration: 1500,
            isClosable: true,
        });
    }

    const removeFromFavHandler = (coin: topCoinObj) => {
        dispacth(favouritesActions.removeFromFavourites(coin))
    }



    // currecny modal
    const currencyModalToggle = () => {
        setCurrecnyModal(!currencyModal)
    }


    // tabs change 
    const metaVerseCategrotyHandler = () => {
        setCryptoData(metaverseCoins)
        setTabState("metaverse")
    }

    const gamingCoinsCategoryHandler = () => {
        setCryptoData(gamingCoins)
        setTabState("gaming")
    }

    const allCoinsHandler = () => {
        setCryptoData(originalARR)
        setTabState("all coins")
    }

    // add to favourites drawer 
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sortOrder, setSortOrder] = useState('none');


    const lowTOhighHanler = () => {

        const sortedData = [...cryptoData].sort((a, b) => a.current_price - b.current_price);
        setCryptoData(sortedData);
    }

    const highTOlowHandler = () => {
        const sortedData = [...cryptoData].sort((a, b) => b.current_price - a.current_price);
        setCryptoData(sortedData);
    }


    return (

        <div>
            { /*OPTIONS HEADER */}

            {  /* SEARCH BAR */}
            <div className={"flex gap-8 flex-wrap items-center justify-center"}>

                <div className="w-28  sm:w-28 mb-4 ml-1">
                    <Image src={logo} alt="" width="180" />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        value={seacrhTerm}
                        onChange={searchHandler}
                        className="px-4 py-2 pl-7 boxsh rounded-md relative z-50 bg-transparent border-2 border-gray-200 text-gray-600 focus:outline-none"
                    />
                    <FaSearch className="search-icon relative -top-7 ml-2 text-gray-400 text-sm w-3 -z-1" />
                </div>

                <div onClick={currencyModalToggle} className="flex items-center gap-2 cursor-pointer border rounded w-32 justify-center h-10">
                    <p>Currency</p>
                    <AiFillCaretDown className='' />
                </div>

            </div>

            {  /* CUURRECYY */}

            <div className={"flex justify-end w38rem"}>
                {currencyModal && <div className={styles.currencyModalHold}>
                    <div>

                        <div className=' flex font-semibold gap-3 items-center cursor-pointer mb-7'>
                            <AiOutlineDollarCircle className='text-xl font-semibold' />
                            <p onClick={() => setCurrency("usd")}> USD </p>
                        </div>

                        <div className=' flex font-semibold gap-3 items-center cursor-pointer'>
                            <BiRupee className='text-xl font-semibold' />
                            <p onClick={() => setCurrency("inr")}> INR </p>
                        </div>
                    </div>

                </div>

                }
            </div>

            <br />
            { /* FLTER TABS */}

            <div className='flex gap-8 flex-wrap items-center ml-2 justify-center'>
                <p className='flex justify-center items-center w-24 h-9 rounded-md purpleBg scalee' onClick={allCoinsHandler}> All Coins </p>
                <p className='flex justify-center items-center w-24 h-9 rounded-md purpleBg scalee' onClick={metaVerseCategrotyHandler}> Metaverse </p>
                <p className='flex justify-center items-center w-24 h-9 rounded-md purpleBg scalee' onClick={gamingCoinsCategoryHandler}> Gaming </p>
                <p className='flex justify-center items-center w-32 h-9 rounded-md purpleBg scalee gap-2' onClick={onOpen}>  <AiOutlineStar className='text-xl' /> Favourites </p>
            </div>

            <br />
            <br />
            <br />


            {  /* MAIN CRYPTO TABLE  */}

            {cryptoData.length > 0 ?
                <div className="overflow-x-auto">
                    {cryptoData.length === 0 ?
                        <p className=' font-semibold flex justify-center items-center mb-4 gap-2'>
                            No Results Found  <RxCrossCircled className=' font-bold align-middle text-2xl text-red-600' />
                        </p>
                        :
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='metaverse-table'>Coin</th>
                                    <th>
                                        <Tooltip label='Low To High'>
                                            <span id='lowTOhigh' className='flex items-center gap-1 cursor-pointer' onClick={lowTOhighHanler}>Price
                                                <HiOutlineArrowsUpDown className='text-xl' />
                                            </span>
                                        </Tooltip>
                                    </th>

                                    <th>
                                        <Tooltip label='High To Low'>
                                            <span id='highTOlow' className='flex items-center gap-1 cursor-pointer' onClick={highTOlowHandler}>Market Cap
                                                <HiOutlineArrowsUpDown className='text-xl rotate-180' />
                                            </span>
                                        </Tooltip>
                                    </th>
                                    <th>Price Change</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* rows */}
                                {cryptoData.slice(page * 20 - 20, page * 20).map((coin, index) => (
                                    <tr key={coin.id} className="cursor-pointer">
                                        <th>
                                            <div className='w-8 h-8'>
                                                <AiOutlineStar className='sm:text-xl text-xl text-gray-500 hover:text-yellow-500 transition-all ease-in'
                                                    onClick={() => addToFavouritesHandler(coin)}
                                                />
                                            </div>
                                        </th>
                                        <td className='py-6'>
                                            <img src={coin.image} className="sm:w-12 sm:h-12 w-9 h-9 inline-block mr-2" />
                                            <span className='font-semibold inline-block align-middle uppercase sm:text-base text-sm mr-4'>{coin.id.substring(0, 18)}</span>
                                        </td>
                                        <td className=' font-semibold py-6 sm:text-base text-sm'> {currency == "usd" ? "$" : <BiRupee className=' inline-block'></BiRupee>} {coin.current_price.toLocaleString()}</td>
                                        <td className=' font-semibold text-gray-500 py-6 sm:text-base text-sm'> {currency == "usd" ? "$" : <BiRupee className=' inline-block'></BiRupee>} {coin.market_cap.toLocaleString()}</td>
                                        <td className={coin.price_change_percentage_24h > 0 ? "text-green-600 sm:text-base text-sm font-semibold py-6 inline-block align-middle" : "text-red-600 font-semibold py-6 inline-block align-middle"}> <span className=' inline-block align-middle'> {coin.price_change_percentage_24h > 0 ? <FiTrendingUp className='text-semibold text-xl text-green-600' /> : <FiTrendingDown className='text-semibold text-xl text-red-600' />} </span>  {coin.price_change_percentage_24h.toFixed(2)}%</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    }
                </div>

                :
                <p> Loading.... </p>

            }



            <hr />
            <br />

            {  /* PAGES */}
            <div className='flex gap-4 flex-wrap justify-center'>
                {pages.map((item) => {

                    return (
                        <p key={item} className={active == item ? "bg-black text-white indivitualPage2 font-semibold cursor-pointer" : "indivitualPage font-semibold cursor-pointer"} onClick={(e) => {
                            if (e.target instanceof HTMLParagraphElement) {
                                setPage(parseInt(e.target.innerText) || 0);
                                setActive(parseInt(e.target.innerText) || 0);

                            }

                        }}>
                            {item}
                        </p>
                    )

                })}
            </div>
            <br />
            <br />
            <br />


            {  /*  FAVOURITES DRAWER */}

            <Drawer onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'> <div className='flex gap-2'>  <span className='font-semibold'>Favourites</span> <AiFillStar className='golden font-bold text-3xl' /> </div> </DrawerHeader>
                    <DrawerBody>
                        <br />

                        <div className='flex flex-col gap-12'>

                            {reduxFavouritesARR.length === 0 ? <p className=' font-semibold'> Nothing Here Yet </p> :
                                reduxFavouritesARR.map((item: any) => {
                                    return (
                                        <div key={item}>
                                            {reduxFavouritesARR.length === 0 ? <p> Nothing Here Yet </p> :
                                                <>
                                                    <div className='flex gap-2 items-center'>
                                                        <img src={item.image} className="w-12 h-12" />
                                                        <div className='flex flex-col'>
                                                            <p className='font-semibold text-sm sm:text-base uppercase'> {item.name} </p>

                                                            <div className='flex gap-4 flex-wrap items-center'>
                                                                <p className=' text-sm text-gray-600 font-semibold'> ${item.price.toLocaleString()} </p>
                                                                <RxCrossCircled className='text-lg cursor-pointer' onClick={() => removeFromFavHandler(item)} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {   /* FOOTER ICONS */}


            <div className='flex justify-between flex-wrap items-center ml-4 mr-4 footerIcons'>
                <div className='w-20 sm:w-32 h-20'>
                    <Image alt='' src={logo} className="w-20 sm:w-32 h-20" />
                </div>

                <div className='flex flex-wrap gap-6'>
                    <FaLinkedin className=' text-xl' />
                    <FaFacebook className=' text-xl' />
                    <FaTwitter className=' text-xl' />
                </div>
            </div>

            <br />
            <br />

        </div>
    )
}

export default HomeComnponent