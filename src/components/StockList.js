import React, { useContext, useEffect, useState } from 'react'
import finnHub from '../apis/finnHub';
import { BsFillCaretUpFill, BsFillCaretDownFill } from "react-icons/bs";
import { WatchListContext } from '../context/watchListContext';
import { useNavigate } from 'react-router-dom';

const StockList = () => {
    // let isMounted = true
    const [stock, setStock] = useState([]);
    // const [watchlist, setWatchList] = useState(["GOOGL", "MSFT", "AMZN", "ANET"]);
    const {watchlist, deleteStock} = useContext(WatchListContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    watchlist.map((stock) => {
                        return finnHub.get("/quote", {
                            params: {
                                symbol: stock
                            }
                        })
                    })
                )
                //console.log(responses);
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                // console.log(data);
                // if (isMounted) {
                setStock(data);
                // }
            } catch (error) {

            }
        }
        fetchData();
        //return () => (isMounted = false)
    }, [watchlist]);

    const changeColor = (value) => {
        return value > 0 ? "success" : "danger";
    }

    const renderIcon = (value) => {
        return value > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
    }

    const handleStockClick = (symbol) => {
        navigate(`detail/${symbol}`);
    }

    return (
        <div>
            <table className='table hover mt-5'>
                <thead style={{ color: "rgb(79,89,102)" }}>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Last</th>
                        <th scope='col'>Chg</th>
                        <th scope='col'>Chg%</th>
                        <th scope='col'>High</th>
                        <th scope='col'>Low</th>
                        <th scope='col'>Open</th>
                        <th scope='col'>Close</th>
                    </tr>
                </thead>
                <tbody>

                    {stock.map((stockData) => {
                        return (
                            <tr style={{cursor: "pointer"}} onClick={() => handleStockClick(stockData.symbol)} className='table-row' key={stockData.symbol}>
                                <th scope='row'>{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td className={`text-${changeColor(stockData.data.d)}`} >{stockData.data.d}{renderIcon(stockData.data.d)}</td>
                                <td className={`text-${changeColor(stockData.data.dp)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>
                                    {stockData.data.pc}
                                    <button className='btn btn-danger btn-sm ml-3 d-inline-block delete-button' onClick={(e) => {
                                        e.stopPropagation()
                                        deleteStock(stockData.symbol)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default StockList
