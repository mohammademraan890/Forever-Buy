import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets.js'
import { ShopContext } from '../context/ShopContextProvider.jsx'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const {setShowSearch} = useContext(ShopContext)
    return (
        <div>
            <div className='flex items-center justify-between py-5 font-medium'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>

                    <img src={assets.logo} className='w-36' alt="" />
                </NavLink>

                <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

                    <NavLink to='/' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>Home</p>
                        <hr className='w-2/4 hidden border-none h-[1.5px] bg-gray-700' />
                    </NavLink>
                    <NavLink to='/about' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>About</p>
                        <hr className='w-2/4 hidden border-none h-[1.5px] bg-gray-700' />
                    </NavLink>
                    <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>Collection</p>
                        <hr className='w-2/4 hidden border-none h-[1.5px] bg-gray-700' />
                    </NavLink>
                    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                        <p className='uppercase'>Contact</p>
                        <hr className='w-2/4 hidden border-none h-[1.5px] bg-gray-700' />
                    </NavLink>

                </ul>
                <div className='flex items-center gap-6'>
                    <img src={assets.search_icon} onClick={() => {setShowSearch(true), navigate('/collection')}} className='w-5 cursor-pointer' alt="" />

                    <div className='group relative'>
                        <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p className='cursor-pointer hover:text-black'>Orders</p>
                                <p className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    </div>
                    <Link to='/cart' className='relative'>
                        <img src={assets.cart_icon} className='w-5 min-w-5 cursor-pointer' alt="" />
                        <p className='absolute top-4 -right-2 text-[11px] w-4 h-4 rounded-full bg-black text-white aspect-square flex items-center justify-center'>3</p>
                    </Link>
                    <img onClick={() => setVisible(!visible)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
                </div>
            </div>

            <div className="absolute top-0 right-0 bottom-0 overflow-hidden bg-white w-0 transition-all duration-500 ease-in-out" style={{ width: visible ? '100%' : '0%' }} id="mobile-menu">
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-collapse' to='/'>HOME</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-collapse' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-collapse' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border border-collapse' to='/contact'>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar