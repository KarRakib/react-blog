
import axios from 'axios';
;
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../Context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Blog from './Blog';
import Loader from './Loader';
import { BsPostcard } from 'react-icons/bs';

const EditBlog = () => {
    const { user, loading } = useContext(UserContext);
    const parmas = useParams()
    console.log(parmas.id);
    const id = parmas.id
    const navigate = useNavigate();
    useEffect(() => {
        if (!user?.email) {
            navigate('/login');
        }
    }, [user?.email, navigate]);
    if (loading) {
        return (
            <div className='loadingdata flex flex-col flex-center wh_100'>
                <Loader/>
            </div>
        );
    }

    const [productInfo, setProductInfo] = React.useState([])
    console.log('proedit ===', productInfo);
    useEffect(() => {
      if(!id){
        return;
      }else{
        axios.get(`http://localhost:5000/blogs?id=${id}`).then(res=>(
            setProductInfo(res.data)
        ))
      }
    }, [id])
    
    if (user) {
        return (
            <>
            <div>
              <title>Update Blog</title>
            </div>
            <div className="blogpage relative max-w-[1750px] mx-auto h-full mt-[120px] ml-[150px] p-8">
              <div className="titledashboard flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Edit <span className="text-indigo-600">Blogs</span></h2>
                  <h3 className="text-xl font-medium">Admin PANEl</h3>
                </div>
                <div className="breadcrumb flex items-center gap-1">
                  <BsPostcard className="text-lg" /> <span>/</span> <span>Edit Page</span>
                </div>
              </div>
              <div className="mt-3">
                {productInfo && <Blog {...productInfo} />}
              </div>
            </div>
          </>
          
        )
    }
}

export default EditBlog