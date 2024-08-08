import React, { useState } from 'react'


import axios from 'axios'
import MarkdownEditor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css';
import { useNavigate } from 'react-router-dom';
const Blog = ({
  _id,
  title: existingTitle,
  slug: existingSlug,
  blogCategory: existingBlogCategory,
  description: existingDescription,
  tags: existingTags,
  status: existingStatus
}) => {
  console.log('18', _id, existingTitle, existingBlogCategory, existingSlug);

  const [redirect, setRedirect] = useState(false)

  const [title, setTitle] = useState(existingTitle || '');
  const [blogCategory, setBlogCategory] = useState(existingBlogCategory || '');
  const [slug, setSlug] = useState(existingSlug || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [tags, setTags] = useState(existingTags || '');
  const [status, setStatus] = useState(existingStatus || '');
  React.useEffect(() => {
    setTitle(existingTitle || '');
    setBlogCategory(existingBlogCategory || '');
    setSlug(existingSlug || '');
    setDescription(existingDescription || '');
    setTags(existingTags || '');
    setStatus(existingStatus || '');
  }, [existingTitle, existingBlogCategory, existingSlug, existingDescription, existingTags, existingStatus]);
  console.log('eitd form', title, blogCategory, slug, description, tags, status);

  const navigate = useNavigate();

  const createProduct = async (e) => {
    const data = { _id, title, tags, blogCategory, slug, status, description }
    console.log('check data', data);
    e.preventDefault()
    // return;
    try {
      if (data._id) {
        console.log('data_id', { ...data });
        await axios.put(`http://localhost:5000/blog?id=${data._id}`, { ...data });
      } else {
        await axios.post('http://localhost:5000/blog', data);
      }
      setRedirect(true);
    } catch (error) {
      console.error('Error creating or updating blog:', error);
    }
  };
  if (redirect) {
    navigate('/admin/blogs')
    return null;
  }
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, '-')
    setSlug(newSlug)
  }
  return (
    <>
      <form onSubmit={createProduct} className='addwebsiteform'>
        {/* // title  */}
        <div className='w-full d-flex flex-col flex-left mb-2' date-aos='fade-up'>
          <label htmlFor="title">Title :  </label>
          <input
            className=' text-center border-solid border-2 border-indigo-600'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text" placeholder='Enter small title' />

        </div>
     
        {/* slug */}
        <div className='w-full d-flex flex-col flex-left mb-2 gap-4' date-aos='fade-up'>
          <label htmlFor="slug">Slug : </label>
          <input
            className=' text-center border-solid border-2 border-indigo-600'
            value={slug}
            onChange={handleSlugChange}
            type="text" id='slug' placeholder='Enter slug url' required />
        </div>
        {/* blog category */}
        <div className="w-100 flex flex-col flex-left mb-2" date-aos='fade-up'>
          <label htmlFor="category">Category</label>
          <select
          className=' text-center border-solid border-2 border-indigo-600'
            value={blogCategory}
            onChange={(e) => setBlogCategory(Array.from(e.target.selectedOptions, option => option.value))}
            name="category" id="category" multiple>
            <option value="htmlcssjs">Html,Css & JavaScript  </option>
            <option value="nextjs">Next js, React Js  </option>
            <option value="database">Database </option>
            <option value="deployment">Deployment </option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1"  >
            Seletcted: <span>{blogCategory}</span>
          </p>
        </div>
        {/*  mark down description content */}
        <div className="description w-100 flex flex-col flex-left mb-2"  >
          <label htmlFor="description">Blog Content</label>
          <MarkdownEditor
            value={description}
            onChange={(ev) => setDescription(ev.text)}
            style={{ width: '100%', height: '400px' }}
            renderHTML={(text) => (
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className);
                    if (inline) {
                      return <code>{children}</code>;
                    } else if (match) {
                      return (
                        <div style={{ position: 'relative' }}>
                          <pre
                            style={{
                              padding: '0',
                              borderRadius: '5px',
                              overflowX: 'auto',
                              whiteSpace: 'pre-wrap',
                            }}
                            {...props}
                          >
                            <code>{children}</code>
                          </pre>
                          <button
                            onClick={() => navigator.clipboard.writeText(children)}
                            style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }}
                          >
                            Copy Code
                          </button>
                        </div>
                      );
                    } else {
                      return <code {...props}>{children}</code>;
                    }
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          />

        </div>

        {/* tags */}
        <div className="w-100 flex flex-col flex-left mb-2" date-aos='fade-up'>
          <label htmlFor="tags">Tags</label>
          <select
          className=' text-center border-solid border-2 border-indigo-600'
            value={tags}
            onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))}
            name="tags" id="tags" multiple>
            <option value="html">Html</option>
            <option value="css">CSS </option>
            <option value="javascript">JavaScript </option>
            <option value="reactjs">React js </option>
            <option value="nextjs">Next js </option>
            <option value="database">Database </option>
            <option value="reactjs">React js </option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1" date-aos='fade-up'>
            Seletcted: <span>{tags}</span>
          </p>
        </div>
        {/* status */}
        <div className="w-full flex flex-col flex-left mb-2"  >
          <label htmlFor="status">Status</label>
          <select
            value={status}
            className=' text-center border-solid border-2 border-indigo-600'
            onChange={(e) => setStatus(e.target.value)}
            name="status" id="status" >
            <option value="">No Selected</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish </option>
          </select>
          <p className="existingcategory flex gap-1 mt-1 mb-1" >
            Seletcted: <span>{status}</span>
          </p>
        </div>
        {/* button for save */}
        <div className='w-full justify-items-center mb-2'>
        <button className="w-[110px] h-10 flex items-center justify-start gap-2.5 bg-[#a1ff14] rounded-[30px] text-[#131313] font-semibold border-none relative cursor-pointer transition-all shadow-md pl-2 hover:bg-[#c0ff14] active:scale-95">
  <svg className="h-[25px] transition-transform duration-[1.5s]" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
  </svg>
 Save 
</button>

        </div>
      </form>
    </>
  )
}

export default Blog