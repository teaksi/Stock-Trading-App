import { createContext, useEffect, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
    // const [watchlist, setWatchList] = useState(["GOOGL", "MSFT", "AMZN", "ANET"]);

    const [watchlist, setWatchList] = useState(
        localStorage.getItem("watchlist")?.split(",") || ["GOOGL", "MSFT", "AMZN"]
    )

    useEffect(() => {
        localStorage.setItem("watchlist", watchlist)
    }, [watchlist])
    

    const addStock = (stock) => {
        if (watchlist.indexOf(stock) === -1) {
            setWatchList([...watchlist, stock])
        }
    }

    const deleteStock = (stock) => {
        setWatchList(watchlist.filter((e) => {
            return e !== stock
        }))
    }

    return <WatchListContext.Provider value={{ watchlist, addStock, deleteStock }}>
        {props.children}
    </WatchListContext.Provider>
}