
import React from 'react'
import { IoHome,IoSettingsOutline } from 'react-icons/io5'
import { BsPostcard } from 'react-icons/bs'
import { MdOutlineAddPhotoAlternate ,MdOutlinePending} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { BiPauseCircle } from 'react-icons/bi'


const SideBar = () => {
    return (
        <aside className='asideleft'>
            <ul>
                <Link to="/admin">
                    <li className='navactive'>
                        <IoHome />
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link to="/admin/blogs">
                    <li className='navactive'>
                        <BsPostcard />
                        <span>Blogs</span>
                    </li>
                </Link>
                <Link to="/admin/addblog">
                    <li className='navactive'>
                        <MdOutlineAddPhotoAlternate />
                        <span>AddBlog</span>
                    </li>
                </Link>
                <Link to="/admin/pending">
                    <li className='navactive'>
                        <MdOutlinePending />
                        <span>Pending</span>
                    </li>
                </Link>
                <Link to="/admin/setting">
                    <li className='navactive'>
                        <IoSettingsOutline />
                        <span>Setings</span>
                    </li>
                </Link>
                <Link to="/login">
                    <li className='navactive'>
                        <BiPauseCircle />
                        <span>Setings</span>
                    </li>
                </Link>
            </ul>
        </aside>
    )
}

export default SideBar