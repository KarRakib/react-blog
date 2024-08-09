

import React, { useContext, useEffect, useState } from 'react'
import { BsPostcard } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBackFill } from 'react-icons/ri'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';
import Loader from './Loader';
import DataLoader from './DataLoader';
import toast from 'react-hot-toast';

const AllBlogs = () => {
  const { user, } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('')
  console.log(searchQuery);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
          const res = await axios.get(`http://localhost:5000/blog?email=${user.email}`);
        // const res = await axios.get('http://localhost:5000/blog');
        const allData = res.data;
        setAllData(allData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [user?.email])

  // const [allData, loading] = useFetchData('/api/blogapi');
  // const { data: allData, loading, error } = useFetchData(true, 'api/blogapi');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlog = allData.slice(indexOfFirstBlog, indexOfLastBlog);
  const publishBlogs = currentBlog.filter(item => item.status === 'publish')
  const allBlog = allData.length;
  const pageNumbers = [];
  for (let index = 1; index <= Math.ceil(allBlog / perPage); index++) {
    pageNumbers.push(index);

  }

  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!session) {
  //     router.push('/login');
  //   }
  // }, [session, router]);
  const handleDelete = (id) => {
    console.log('delete id', id);
    const comfirmDelete = window.confirm('Do you want delete ')

    if (comfirmDelete) {
      try {
        axios.delete(`http://localhost:5000/blog?id=${id}`)
        console.log('delete successfull');
        toast.success("Delete Success")
        setAllData((pre)=> pre.filter((blog)=> blog._id !==id))
      } catch (error) {
        console.error('Error Deleting blog:', error);
      }
    }

  }


  if (status === 'loading') {
    return (
      <div className='loadingdata flex flex-col flex-center wh_100'>
        <Loader />
      </div>
    );
  }


  if (user) {
    return (
      <>
        <div className=" px-14 py-0 relative max-w-[1750px] mx-auto h-full mt-28 ml-16 p-8">
          <div className=" flex justify-between">
            <div data-aos="fade-right">
              <h2 className=" font-[#7e37d8] font-extrabold  text-md md:text-2xl">All Published <span className=''>Blogs</span></h2>
              <h3 className=" uppercase text-lg">Admin PANEl</h3>
            </div>
            <div className=" text-[#571f9e] flex items-center" data-aos="fade-left">
              <BsPostcard /> <span className="mx-2">/</span> <span>Blogs</span>
            </div>
          </div>
          <div className="blogstable w-full h-full py-16" data-aos="fade-up">
            <div className="flex gap-2 mb-4">
              <h2 className="text-sm md:text-xl">Search Blogs:</h2>
              <input
                value={searchQuery}
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search by title ..."
                className="w-32 p-2 md:w-[450px] outline-1 md:p-2.5 border border-gray-400 text-lg outline-none focus:shadow-[0_0_10px_#9674c3] rounded-md"
              />
            </div>
            <table className="  w-full text-left text-sm md:text-lg">
              <thead>
                <tr className='text-sm p-1 md:p-3 md:text-2xl'>
                  <th className="bg-blue-200 text-sm p-1 md:p-3 md:text-2xl">#</th>
                  <th className="bg-blue-200 text-sm p-1 md:p-3 md:text-2xl">title</th>
                  <th className="bg-blue-200 text-sm p-1 md:p-3 md:text-2xl">Slug</th>
                  <th className="bg-blue-200 text-sm p-1 md:p-3 md:text-2xl">Edit / Delete</th>
                </tr>
              </thead>
              <tbody className="border border-black bg-gray-200">
                {loading ? (
                  <tr>
                    <td>
                      <DataLoader />
                    </td>
                  </tr>
                ) : (
                  <>
                    {publishBlogs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No Publish Blog
                        </td>
                      </tr>
                    ) : (
                      publishBlogs.map((blog, i) => (
                        <tr key={blog._id}>
                          <td className="p-4">{indexOfFirstBlog + i + 1}</td>
                          <td className="p-4">{blog.title}</td>
                          <td className="p-4">{blog.slug}</td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-center">
                              <Link to={`/admin/edit/${blog._id}`}>
                                <button
                                  title="edit"
                                  className="text-base inline-flex gap-2 p-2 rounded-md font-bold border border-gray-600 text-gray-600 transition duration-300 hover:bg-red-500 hover:border-red-500 hover:text-white"
                                >
                                  <FaEdit />
                                </button>
                              </Link>
                              
                                <button
                                onClick={()=> handleDelete(blog._id)}
                                  title="delete"
                                  className="text-base inline-flex gap-2 p-2 rounded-md font-bold border border-gray-600 text-gray-600 transition duration-300 hover:bg-green-500 hover:border-green-500 hover:text-white"
                                >
                                  <RiDeleteBackFill />
                                </button>
                           
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </>
                )}
              </tbody>
            </table>
         
             {publishBlogs.length === 0 ? (
              ""
            ) : (
              <div className="blogpagination flex items-center justify-center my-12 text-black">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-gray-200 p-4 font-semibold mr-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 hover:text-white"
                >
                  Previous
                </button>
                {pageNumbers
                  .slice(
                    Math.max(currentPage - 3, 0),
                    Math.min(currentPage + 2, pageNumbers.length)
                  )
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`bg-gray-200 p-4 font-semibold mr-2 rounded-md ${currentPage === number ? "bg-indigo-600 text-white" : ""
                        } hover:bg-indigo-600 hover:text-white`}
                    >
                      {number}
                    </button>
                  ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentBlog.length < perPage}
                  className="bg-gray-200 p-4 font-semibold mr-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 hover:text-white"
                >
                  Next
                </button>
              </div>
            )} 
          </div>
        </div>

      </>
    )
  }

}

export default AllBlogs;