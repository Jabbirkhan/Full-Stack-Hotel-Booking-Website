import React from 'react'
import { Outlet } from 'react-router-dom'
import OwnerNavbar from '../../components/ownerComponents/ownerNavbar'
import OwnerSidebar from '../../components/ownerComponents/ownerSideBar'
// import OwnerFooter from '../../components/ownerComponents/ownerFooter'

const OwnerHome = () => {
    return (
        <div className='bg-slate-900 md:pt-14'>
            <OwnerNavbar />
            <section className='flex'>
                <OwnerSidebar />
                <main className='flex-1 sm:ml-52'>
                    <Outlet />
                    {/* <OwnerFooter /> */}
                </main>
            </section>
        </div>
    )
}

export default OwnerHome
