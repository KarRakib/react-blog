import React, { useContext, useState } from 'react'
import { RiBarChartHorizontalLine } from 'react-icons/ri'
import { GoScreenFull } from 'react-icons/go'
import { BiExitFullscreen } from 'react-icons/bi'
import { IoIosNotifications } from "react-icons/io";
import { UserContext } from '../Context/AuthContext';

const Header = ({ navOpen, handleNav }) => {
    const { user } = useContext(UserContext)
    const [isFullScreen, setIsFullScreen] = useState(false)

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => {
                    setIsFullScreen(true)
                })
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                    .then(() => {
                        setIsFullScreen(false)
                    })
            }
        }
    }

    return (
        <header className="admin_header flex justify-between items-center w-full h-[80px] bg-white p-8 fixed top-0 z-50 shadow-md">
            <div className="logo flex gap-2 items-center">
                <h1 className="relative font-black text-black">
                    Admin
                    <span className="absolute -left-[2px] top-0 bg-red-500 rounded-bl-md rounded-tr-md w-5 h-5 -z-10"></span>
                </h1>
                <div onClick={handleNav} className="headerham flex justify-center items-center w-10 h-10 bg-[#eee8fa] text-[#5f22db] text-xl rounded-full cursor-pointer">
                    <RiBarChartHorizontalLine />
                </div>
            </div>
            <div className="rightnav flex gap-2 items-center">
                <div onClick={toggleFullScreen} className="text-xl cursor-pointer">
                    {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
                </div>
                <div className="notification text-xl cursor-pointer">
                    <IoIosNotifications />
                </div>
                <div className="profilenav">
                    {user ? (
                        <img src={user?.phtoURL} alt={user?.displayName} className="w-[120px] cursor-pointer" />
                    ) : (
                        <img
                            src="Kar_Rakib.png"
                            alt="kar_rakib"
                            className="w-8 h-8 rounded-lg cursor-pointer"
                        />
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
