import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Context } from '../../context/context';
import { FaArrowLeft } from 'react-icons/fa';

const OwnerSidebar = () => {

  const { visible, setVisible, ownerAllHotels } = useContext(Context);

  const location = useLocation();
  if (location.pathname === '/owner-login') {
    return null
  }

  return (
    <section className='h-screen'>
      {/* desktop sidebar */}
      <aside className='hidden sm:block sm:w-52 p-5 fixed h-[calc(100vh-60px)] top-14 left-0 overflow-y-auto bg-slate-800'>
        <nav className='flex flex-col gap-3 text-white ownerSidebar'>
          <NavLink to='/' className='hover:bg-[#dec29a]/30 px-1 py-0.75 border-none outline-none transition-all duration-300 cursor-pointer'>Add Hotel</NavLink>
          <NavLink to='/all-hotels' className='hover:bg-[#dec29a]/30 px-1 py-0.75 transition-all duration-300 cursor-pointer'>All Hotels</NavLink>
          {ownerAllHotels.length > 0 && (
            <NavLink to='/add-room' className='hover:bg-[#dec29a]/30 px-1 py-0.75 transition-all duration-300 cursor-pointer'>Add Room</NavLink>
          )}
          {ownerAllHotels.length > 0 && (
          <NavLink to='/all-rooms' className='hover:bg-[#dec29a]/30 px-1 py-0.75 transition-all duration-300 cursor-pointer'>All Room</NavLink>
          )}
          <NavLink to='/all-bookings' className='hover:bg-[#dec29a]/30 px-1 py-0.75 transition-all duration-300 cursor-pointer'>All Bookings</NavLink>
        </nav>
      </aside>
      {/* side bar for mobile */}
      <nav className={`fixed z-60 top-0 right-0 w-full h-screen bg-slate-900 flex flex-col gap-3 backdrop-blur-xl ownerSidebar transition-all duration-200 ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='p-4 w-full flex justify-start items-center gap-2 border-b-2 text-white'>
          <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setVisible(false)} />
          <p className='text-xl' onClick={() => setVisible(false)}>Back</p>
        </div>
        <NavLink to='/' onClick={() => setVisible(false)} className='hover:bg-[#dec29a]/30 text-center text-gray-300 hover:text-white px-1 py-0.75 border-none outline-none transition-all duration-300 cursor-pointer'>Add Hotel</NavLink>
        <NavLink to='/all-hotels' onClick={() => setVisible(false)} className='hover:bg-[#dec29a]/30 text-center text-gray-300 hover:text-white px-1 py-0.75 transition-all duration-300 cursor-pointer'>All Hotels</NavLink>
        {ownerAllHotels.length > 0 && (
          <NavLink to='/add-room' onClick={() => setVisible(false)} className='hover:bg-[#dec29a]/30 text-center text-gray-300 hover:text-white px-1 py-0.75 transition-all duration-300 cursor-pointer'>Add Room</NavLink>
        )}
        {ownerAllHotels.length > 0 && (
          <NavLink to='/all-rooms' onClick={() => setVisible(false)} className='hover:bg-[#dec29a]/30 text-center text-gray-300 hover:text-white px-1 py-0.75 transition-all duration-300 cursor-pointer'>All Room</NavLink>
        )}
        <NavLink to='/all-bookings' onClick={() => setVisible(false)} className='hover:bg-[#dec29a]/30 text-center text-gray-300 hover:text-white px-1 py-0.75 transition-all duration-300 cursor-pointer'>All bookings</NavLink>
      </nav>
    </section>
  )
}

export default OwnerSidebar
