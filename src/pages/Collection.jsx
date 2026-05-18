import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Includes/Title";
import ProductItem from "../components/Includes/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  console.log("search Query: ", search, "showSearch: ", showSearch)
  
  const [showFilter, setShowFilter] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);

  const [sortType, setSortType] = useState("relavent");

  const [Filter, setFilter] = useState({
    categories: [],
    types: [],
  });

  // Handle Filters categories and types
  function filterHandler(event) {
    const { name, value, checked } = event.target;
    if (name === "categories") {
      setFilter((prev) => ({
        ...prev,
        categories: checked
          ? [...prev.categories, value]
          : prev.categories.filter((c) => c !== value),
      }));
    }

    if (name === "types") {
      setFilter((prev) => ({
        ...prev,
        types: checked
          ? [...prev.types, value]
          : prev.types.filter((t) => t !== value),
      }));
    }
  }

  // Handle Sorting
  const SortHandler = (e) => {
    setSortType(e.target.value);
  };

  // Filter + Sort Logic
// Filter + Sort + Search Logic
  useEffect(() => {
    let tempProducts = [...products];

    // 1. Search Filter (Only applies if search bar is open AND search query is not empty)
    if (showSearch && search) {
      tempProducts = tempProducts?.filter((item) =>
        item?.name?.toLowerCase()?.includes(search?.toLowerCase())
      );
    }

    // 2. Category Filter
    if (Filter?.categories.length > 0) {
      tempProducts = tempProducts?.filter((item) =>
        Filter.categories?.includes(item?.category),
      );
    }

    // 3. Type Filter
    if (Filter.types.length > 0) {
      tempProducts = tempProducts.filter((item) =>
        Filter.types.includes(item.subCategory),
      );
    }

    // 4. Sorting
    switch (sortType) {
      case "low-high":
        tempProducts = tempProducts.toSorted(
          (a, b) => a.price - b.price,
        );
        break;

      case "high-low":
        tempProducts = tempProducts.toSorted(
          (a, b) => b.price - a.price,
        );
        break;

      default:
        // relavent -> original order
        break;
    }

    setFilteredProducts(tempProducts);
    
    // ADDED: 'search' and 'showSearch' to the dependency array
  }, [Filter, products, sortType, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filters Sidebar */}
      <div className="min-w-60 h-fit sticky top-15">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img
            className={`h-3 sm:hidden ${
              showFilter ? "rotate-90" : ""
            }`}
            onClick={() => setShowFilter(!showFilter)}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">
            CATEGORIES
          </p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Men"
                name="categories"
                onChange={filterHandler}
              />
              Men
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Women"
                name="categories"
                onChange={filterHandler}
              />
              Women
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Kids"
                name="categories"
                onChange={filterHandler}
              />
              Kids
            </label>
          </div>
        </div>

        {/* Type Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Topwear"
                name="types"
                onChange={filterHandler}
              />
              Topwear
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Bottomwear"
                name="types"
                onChange={filterHandler}
              />
              Bottomwear
            </label>

            <label className="flex gap-2 cursor-pointer">
              <input
                className="w-3"
                type="checkbox"
                value="Winterwear"
                name="types"
                onChange={filterHandler}
              />
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title
            text1={"ALL"}
            text2={"COLLECTIONS"}
          />

          {/* Sorting */}
          <select
            value={sortType}
            onChange={SortHandler}
            className="border-2 border-gray-300 text-sm px-3"
          >
            <option value="relavent">
              Sort by: Relavent
            </option>

            <option value="low-high">
              Sort by: Low to High
            </option>

            <option value="high-low">
              Sort by: High to Low
            </option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filteredProducts.map((product, index) => (
              <ProductItem
                key={index}
                name={product.name}
                image={product.image}
                price={product.price}
                id={product._id}
              />
            ))}
          </div>
        ) : (
          <h2 className="text-lg sm:text-3xl mt-20 flex justify-center items-center text-center">
            No products found
          </h2>
        )}
      </div>
    </div>
  );
};

export default Collection;
