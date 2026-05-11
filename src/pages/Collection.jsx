import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Includes/Title";
import ProductItem from "../components/Includes/ProductItem";
const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [Filter, setFilter] = useState({
    categories: [],
    types: [],
  });

  
  function filterHandler(event) {
  const { name, value, checked } = event.target;

  if (name === "categories") {
    setFilter(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, value] 
        : prev.categories.filter(c => c !== value)
    }));
  } else if (name === "types") {
    setFilter(prev => ({
      ...prev,
      types: checked 
        ? [...prev.types, value] 
        : prev.types.filter(t => t !== value)
    }));
  }
}
 useEffect(() => {
  let tempProducts = [...products];

  if (Filter.categories.length > 0) {
    tempProducts = tempProducts.filter(item => Filter.categories.includes(item.category));
  }

  if (Filter.types.length > 0) {
    tempProducts = tempProducts.filter(item => Filter.types.includes(item.subCategory)); 
    // Note: Check if your data uses 'type' or 'subCategory'
  }

  setFilteredProducts(tempProducts);
}, [Filter, products]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            onClick={() => setShowFilter(!showFilter)}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value={"Men"} name={"categories"} onChange={filterHandler}/> Men
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value={"Women"} name={"categories"} onChange={filterHandler}/> Women
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value={"Kids"} name={"categories"} onChange={filterHandler}/> Kids
            </label>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value={"Topwear"} name={"types"} onChange={filterHandler}/>{" "}
              Topwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value={"Bottomwear"} name={"types"} onChange={filterHandler}/>{" "}
              Bottomwear
            </label>
            <label className="flex gap-2 cursor-pointer">
              <input className="w-3" type="checkbox" value={"Winterwear"} name={"types"} onChange={filterHandler}/>{" "}
              Winterwear
            </label>
          </div>
        </div>
      </div>

      <div className='flex-1'>

  <div className='flex justify-between text-base sm:text-2xl mb-4'>
    <Title text1={'ALL'} text2={'COLLECTIONS'} />
    {/* Product Sort */}
    <select className='border-2 border-gray-300 text-sm px-3'>
      <option value="relavent">Sort by: Relavent</option>
      <option value="low-high">Sort by: Low to High</option>
      <option value="high-low">Sort by: High to Low</option>
    </select>
  </div>

  {/* Map Products */}
  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
    {
      filteredProducts.map((product, index) => {
        return (
          <ProductItem key={index} name={product.name} image={product.image} price={product.price} id={product._id}/>
        );
      })
    }
  </div>
</div>
      
    </div>
  );
};
export default Collection;
