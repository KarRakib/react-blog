
import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGithub, FaHtml5, FaInstagram, FaTwitter } from 'react-icons/fa'
import { FiDatabase } from 'react-icons/fi'
import { TbBrandNextjs } from 'react-icons/tb'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'
const Tags = () => {
    const [loading, setLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [perPage] = React.useState(5)
    const [blog, setBlog] = React.useState([])
    const navigate = useNavigate();
    const location = useLocation();
  
    const pathname = location.pathname;
    const tags = pathname.split('/').pop();
    console.log(tags);

    useEffect(() => {
        const fetchBlogData = async () => {
            if (!tags) {
                navigate('/404');
                return;
              }
        
              try {
                const response = await fetch(`http://localhost:5000/blogs?tags=${tags}`);
                const data = await response.json();
                console.log(data);
                setBlog(data);
              } catch (error) {
                console.error('Error fetching blog data:', error);
                // navigate('/404');
              } finally {
                setLoading(false);
              }
            };
        
            fetchBlogData();
    }, [tags, ]);

// const res = await axios.get(`api/getblog?tags=${tags}`);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const indexOfLastBlog = currentPage * perPage;
    const indexOfFirstBlog = indexOfLastBlog - perPage;
    const currentBlogs = blog?.slice(indexOfFirstBlog, indexOfLastBlog);
    const allBlog = blog?.length;

    const pageNumbers = [];
    for (let index = 1; index < Math.ceil(allBlog / perPage); index++) {
        pageNumbers.push(index);
    }
    const publishedBlogs = blog.filter(item => item.status === 'publish')
    const extractFirstImageUrl = (markdownContent) => {
        if (!markdownContent || typeof markdownContent !== 'string') {
            return null;
        }
        const regex = /!\[.*?\]\((.*?)\)/;
        const match = markdownContent.match(regex);
        return match ? match[1] : null;
    }
    return (
        
        <section className='main_blog_section'>
        <div className="conatiner flex flex-sb flex-left flex-wrap">
            <div className="leftblog_sec">
                <div className="category_title">
                    <div className="flex gap-1">
                        <h1>{loading ? <div> loading ...</div> : publishedBlogs ?
                            publishedBlogs && publishedBlogs[0]?.tags : publishedBlogs &&
                            publishedBlogs.tags}</h1>
                        <span>{loading ? <div>0</div> : publishedBlogs.filter(blog => blog.tags).length}</span>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores velit eos pariatur itaque, expedita animi, ullam molestias natus, voluptatum aliquam atque.</p>
                </div>
                <div className="blogs_sec">
                    {loading ? <div className='wh_100 flex flex-center mt-2 pb-5'>
                        <div className='loader'></div>
                    </div> : <>  {
                        publishedBlogs?.map((blog) => {
                            const firstImagUrl = extractFirstImageUrl(blog.description);
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
    )
}

export default Tags