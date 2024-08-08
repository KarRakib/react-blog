import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'
import '../admin/admin.css'

const AdminLayout = () => {
  const [navOpen, setNavOpen] = React.useState(true)
  const handleNav = () => {
      setNavOpen(!navOpen)
  }
  return (
    <div className="admin-layout">
      <Header navOpen={navOpen} handleNav={handleNav} setNavOpen={setNavOpen}/>
      {navOpen && <SideBar />}
      <div className={`content ${navOpen ? 'content-with-sidebar' : ''}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
