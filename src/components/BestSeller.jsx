import { useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import Title from "./Includes/Title";
import ProductItem from "./Includes/ProductItem";

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const bestProducts = products.filter((product)=> product.bestseller).slice(0,5);

  return (
    <div className='my-10'>
    <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsu
        </p>
    </div>

    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestProducts.map((item, index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
        }
    </div>
</div>
  )
}

export default BestSeller