import React, { useContext, useEffect, useState } from 'react'
import finnHub from '../apis/finnHub'
import { WatchListContext } from '../context/watchListContext'

const AutoComplete = () => {
    const [search, setSearch] = useState("")
    const [result, setResults] = useState([])
    const { addStock } = useContext(WatchListContext);

    const renderDropdown = () => {
        const dropDownCls = search ? "show" : "";
        return (
            <ul style={{
                height: "500px",
                overflowY: "scroll",
                overflowX: "hidden",
                cursor: "pointer"
            }} className={`dropdown-menu ${dropDownCls}`}>
                {result.map((result) => {
                    return (
                        <li onClick={() => {
                            addStock(result.symbol)
                            setSearch("")
                        }} key={result.symbol} className='dropdown-item'>{result.description} ({result.symbol})</li>
                    )
                })}

            </ul>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                // console.log(response);
                setResults(response.data.result)
            } catch (error) {

            }
        }
        if (search.length > 0) {
            fetchData()
        } else {
            setResults([])
        }
    }, [search])
    return (
        <div className='w-50 p-5 rounded mx-auto'>
            <div className="form-floating dropdown">
                <input type="text" name="" id="search" className='form-control' placeholder='search' style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }} autoComplete="off" value={search} onChange={(e) => setSearch(e.target.value)} />
                <label htmlFor="search">Search</label>
                {renderDropdown()}
            </div>
        </div>
    )
}

export default AutoComplete
