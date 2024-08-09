
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from 'react-icons/fa'
import { FiDatabase } from 'react-icons/fi'
import { TbBrandNextjs } from 'react-icons/tb'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'


const Home = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(5)

  const { data: allData, loading, error } = useFetchData(true, 'http://localhost:5000/blog');
 
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const indexOfLastBlog = currentPage * perPage;
  const indexOfFirstBlog = indexOfLastBlog - perPage;
  const currentBlogs = allData?.slice(indexOfFirstBlog, indexOfLastBlog);
  const allBlog = allData?.length;

  const publishedBlogs = currentBlogs?.filter(item => item.status === 'publish');
  console.log(publishedBlogs);
  const pageNumbers = [];
  for (let index = 1; index < Math.ceil(allBlog / perPage); index++) {
    pageNumbers.push(index);

  }
  const extractFirstImageUrl = (markdownContent) => {
    if (!markdownContent || typeof markdownContent !== 'string') {
      return null;
    }
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = markdownContent.match(regex);
    return match ? match[1] : null;
  }
  return (
    <>
      <section className='header_data_section'>
        <div className="container flex flex-sb w-100">
          <div className="leftheader_info">
            <h1>Hi, I'm  <span> Kar Rakib</span>. <br />
              Web-Developer & Programmer
            </h1>
            <h3> Specialized in JavaScript and TypeScript</h3>
            <div className="flex gap-2">
              <Link to='/contact'> <button>Contact Me</button> </Link>
              <Link to='/about'><button> About Me </button> </Link>
            </div>
          </div>
          <div className="rightheader_img">
            <div className="image_bg_top"></div>
            <div className="image_bg_top2"></div>
            <img src="/Kar_Rakib.png" alt="/kar_rakib" />
          </div>
        </div>

      </section>
      <section className='main_blog_section'>
        <div className="conatiner flex flex-sb flex-left flex-wrap">
          <div className="leftblog_sec">
            <h2>Recently Published</h2>
            <div className="blogs_sec">
              {loading ? <div className='loader-container'>
                <div className='loader'></div>
              </div> : <>  {
                publishedBlogs?.map((blog) => {
                  const firstImagUrl = extractFirstImageUrl(blog.description);
                  console.log(firstImagUrl);
                  return <div className='card_container' key={blog._id}>
                    <div className="card">
                     <Link to={`/blog/${blog.slug}`}>
                       <img src={firstImagUrl || "/Kar_Rakib.png"} alt={blog.title} />
                     </Link>
                     
                  <div className="card-content">
                      <h2 className="card-title">{blog.title}</h2>
                      <p className="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu
                        sapien porttitor, blandit velit ac, vehicula elit. Nunc et ex at
                        turpis rutrum viverra.
                      </p>
                      <div className="card-footer">
                        <div className="author">
                          <img
                            src="/Kar_Rakib.png"
                            alt="Avatar"
                          />
                          <span className="author-name">John Doe</span>
                        </div>
                        <span className="timestamp">{new Date(blog.createdAt).toLocaleDateString('eng-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                     </div>
              </div>
                //   return <div className="card_container ">
                //   <div className="card">
                //     <img
                //       src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606"
                //       alt="Mountain"
                //     />
                //     <div className="card-content">
                //       <h2 className="card-title">Beautiful Mountain View</h2>
                //       <p className="card-text">
                //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu
                //         sapien porttitor, blandit velit ac, vehicula elit. Nunc et ex at
                //         turpis rutrum viverra.
                //       </p>
                //       <div className="card-footer">
                //         <div className="author">
                //           <img
                //             src="https://randomuser.me/api/portraits/men/32.jpg"
                //             alt="Avatar"
                //           />
                //           <span className="author-name">John Doe</span>
                //         </div>
                //         <span className="timestamp">2 hours ago</span>
                //       </div>
                //     </div>
                //   </div>
                // </div>
                })
              }
              </>
              }
            </div>
            <div className="blogpagination">
              <div className="blogpagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(
                  number => (
                    <button key={number} onClick={() => paginate(number)}
                      className={currentPage === number ? 'active' : ''}
                    > {number} </button>
                  )
                )}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage.length < perPage}>Next</button>
              </div>

            </div>
          </div>
          <div className="rightblog_info">
            <div className="topics_sec">
              <h2> Topics</h2>
              <div className="topics_list">
                <Link to='/topics/htmlcssjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FaHtml5 />
                    </div>
                    <h3> Html, Css & JavaScript</h3>
                  </div>
                </Link>
                <Link to='/topics/nextjs'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <TbBrandNextjs />
                    </div>
                    <h3> Next Js,React Js</h3>
                  </div>
                </Link>
                <Link to='/topics/database'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <FiDatabase />
                    </div>
                    <h3> Database</h3>
                  </div>
                </Link>
                <Link to='/topics/deployment'>
                  <div className="topics">
                    <div className="flex flex-center topics_svg">
                      <AiOutlineDeploymentUnit />
                    </div>
                    <h3> Deployment</h3>
                  </div>
                </Link>

              </div>
            </div>
            <div className="tags_sec mt-3">
              <h2>Tags</h2>
              <div className="tags_list">
                <Link to='/tags/html'> #html </Link>
                <Link to='/tags/css'> #css </Link>
                <Link to='/tags/javascript'> #javaScript </Link>
                <Link to='/tags/nextjs'> #nextjs </Link>
                <Link to='/tags/reactjs'> #reactjs </Link>
                <Link to='/tags/database'> #html </Link>
              </div>
            </div>
            <div className="letstalk_sec mt-3">
              <h2>Let's Talk</h2>
              <div className="talk_sec">
                <h4> Want to find out how i can solve problems specific to your business?  let't talk</h4>
                <div className="social_talk flex flex-center gap-1 mt-2">
                  <div className="st_icon">
                    <FaGithub />
                  </div>
                  <div className="st_icon">
                    <FaTwitter />
                  </div>
                  <div className="st_icon">
                    <FaInstagram />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home;