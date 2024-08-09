
import React, { useContext, useEffect, useState } from 'react'
import { IoMoonSharp, IoSearch, IoSearchSharp } from 'react-icons/io5'
import { FaXmark } from 'react-icons/fa6'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { LuSun } from 'react-icons/lu'

import { Link } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import { UserContext } from '../Context/AuthContext'
const Navbar = () => {
    const { user } = useContext(UserContext)
    const [searchOpen, setSearchOpen] = useState(false)
    const openSearch = () => {
        setSearchOpen(!searchOpen)
    }
    const closeSearch = () => {
        setSearchOpen(false)
    }
    const [aside, setAside] = useState(false)
    const asideOpen = () => {
        setAside(true)
    }
    const asideClose = () => {
        setAside(false)
    }
    const handleLinkClick = () => {
        setAside(false)
    }

    // darkmode 

    const [darkMode, setDarkMode] = useState(true)
    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode)
    }, []);
    useEffect(() => {
        //apply darkmode style s 
        if (darkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('darkMode', true)
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('darkMode', false)
        }
    }, [darkMode])
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    // search data fetch 

    const { data: allData, loading, error } = useFetchData(true, 'http://localhost:5000/blog');
    console.log('nav data', allData);
    const publishedBlogs = allData?.filter(item => item.status === 'publish')
    console.log('pub nav', publishedBlogs);
    const [searchQuary, setSearchQuery] = useState('')
const handleQuery  = () =>{
    setSearchQuery('')
}
    const searchfiltered = searchQuary.trim() === '' ? publishedBlogs : publishedBlogs.filter(item => item.title.toLowerCase().includes(searchQuary.toLowerCase()));
    return (
        <>
            <div className='header_sec'>
                <div className="container header">
                    <div className='logo'>
                        <Link to='/' ><h1>Code Blog </h1> </Link>
                    </div>
                    <div className='searchbar'>
                        <IoSearchSharp />
                        <input onClick={openSearch}
                            value={searchQuary}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="search" placeholder='Discover new, articles and more' />
                    </div>
                    <div className="nav_list_dark">
                        <ul>
                            <li><Link to='/'> HOME</Link> </li>
                            {user?.email ? <> <li><Link to='/admin/addblog'> Add Blog</Link> </li> <li><Link to='/admin'> Dashboard</Link> </li></> : <><li><Link to='/login'> LogIn  </Link> </li>
                                <li><Link to='/signin'> SignIn </Link> </li></>}
                        </ul>
                        {/* for mobile device */}
                        <div className="navlist_mobile_ul">
                            <button onClick={toggleDarkMode}>{darkMode ? <IoMoonSharp /> : <LuSun />} </button>
                            <button onClick={openSearch}><IoSearch /> </button>
                            <button onClick={asideOpen}><HiBars3BottomRight /> </button>
                        </div>
                        <div className="darkmode">
                            <label className='switch'>
                                <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                                <span className='slider_header'></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={`search_click ${searchOpen ? 'open' : ''}`}>
                    <div className="searchab_input">
                        <IoSearchSharp />
                        <input type="search"
                            value={searchQuary}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Dicover news, articals' />
                    </div>
                    <div className="search_data text-center">
                        {
                            loading ? <div className='wh_100 flex flex-center mt-2 pb-5'>
                                <div className='loader'></div>

                            </div> :
                                <>
                                    {
                                        searchQuary ? <>
                                            {
                                                searchfiltered.slice(0, 3).map((blog) => (
                                                    <Link onClick={closeSearch} to={`/blog/${blog.slug}`} className='blog' key={blog._id}  >
                                                        <div onClick={handleQuery} className="bloginfo">
                                                            <h3> <h3>{blog.slug}</h3> </h3>
                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, perferendis est. Quo, quasi!</p>

                                                        </div>
                                                    </Link>
                                                )
                                                )
                                            }
                                        </> : <div> No Search Result </div>
                                    }
                                </>
                        }
                    </div>
                    <div className="exit_search" onClick={closeSearch}>
                        <div><FaXmark /> </div>
                        <h4>ESC</h4>
                    </div>
                </div>
                {/* // mobile  */}
                <div className={aside ? `navlist_mobile open` : 'navlist_mobile'}>
                    <div className="navlist_m_title flex flex-sb">
                        <h1>Programming Blog</h1>
                        <button onClick={asideClose}><FaXmark /> </button>
                    </div>
                    <hr />
                    <h3 className='mt-3'> Main Menu </h3>
                    <ul onClick={handleLinkClick}>
                        <li><Link to='/'> HOME</Link> </li>
                        <li><Link to='/'> ABOUT US</Link> </li>
                        <li><Link to='/'> CONTACT</Link> </li>
                    </ul>
                    <hr />
                    <h3 className="mt-3">Topics</h3>
                    <ul onClick={handleLinkClick}>
                        <li><Link to='/topics/htmlcssjs'>Html Css Js </Link> </li>
                        <li><Link to='/topics/nextjs'>Next Js </Link> </li>
                        <li><Link to='/topics/database'>Database </Link> </li>
                        <li><Link to='/topics/deployment'>Deployment </Link> </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar