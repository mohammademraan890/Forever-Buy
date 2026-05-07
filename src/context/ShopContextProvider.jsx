import { createContext } from 'react'
import { products } from '../assets/frontend_assets/assets';
export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {
    const currencySymbol = '₹';
    const shippingCost = 100;
    const contextValue = { products, currencySymbol, shippingCost }
    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider