
import React, { useContext, useEffect } from 'react'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md';
import { UserContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Blog from './Blog';

const AddBlog = () => {
  
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (!user) {
        navigate('/login');
      }
    }, [user, navigate]);
    if (loading) {
        return (
          <div className='loadingdata flex flex-col flex-center wh_100'>
            <Loader />
          </div>
        );
      }
    
 if(user){
    return (
        <>
          <div className='addblogspage'>
          <div className="titledashboard flex flex-sb">
            <div date-aos='fade-right'>
              <h2>Add <span>Blog</span></h2>
              <h3>Admin PANEl</h3>
            </div>
            <div className="breadcrumb" date-aos='fade-left'>
              <MdOutlineAddPhotoAlternate /> <span>/</span> <span>Add Blog</span>
            </div>
          </div>
              <div className="blogsadd" >
                <Blog/>
              </div>
          </div>
        </>
        )
 }
}

export default AddBlog