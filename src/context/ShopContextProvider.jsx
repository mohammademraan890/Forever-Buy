import { createContext, useState } from 'react'
import { products } from '../assets/frontend_assets/assets';
export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {
    const currencySymbol = '₹';
    const shippingCost = 100;
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("")
    const contextValue = { products, currencySymbol, shippingCost, showSearch, setShowSearch, search, setSearch }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider