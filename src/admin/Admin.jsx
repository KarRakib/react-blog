

import { useContext, useEffect, useState } from 'react';
import { IoHome } from 'react-icons/io5';
import {
  Chart as ChartJs,
  CategoryScale,
  LineController,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';

// Register Chart.js components
ChartJs.register(CategoryScale, LineController, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Admin() {
  const { user, loading } = useContext(UserContext);
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);
  const [blogsData, setBlogsData] = useState([]);
  // State to hold blog data
  console.log(blogsData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/blog');
        const data = await res.json();

        setBlogsData(data);
      } catch (error) {
        console.log('Error Fetching Data', error);
      }
    };

    fetchData();
  }, []);

  // Display a loader while user data is being fetched
  if (loading) {
    return (
      <div className='loadingdata flex flex-col flex-center wh_100'>
        <Loader />
      </div>
    );
  }

  // Redirect to login if not authenticated



  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly By Year'
      }
    }
  };

  // Process blog data for chart
  const monthlyData = blogsData
    .filter(item => item.status === 'publish')
    .reduce((acc, blog) => {
      const year = new Date(blog.createdAt).getFullYear();
      const month = new Date(blog.createdAt).getMonth();
      acc[year] = acc[year] || Array(12).fill(0);
      acc[year][month]++;
      return acc;
    }, {});

  const years = Object.keys(monthlyData);
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`
  }));

  const data = {
    labels,
    datasets
  };

  if (user) {
    return (
      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div date-aos='fade-right'>
            <h2>Blogs <span>Dashboard</span></h2>
            <h3>Admin Panel</h3>
          </div>
          <div className="breadcrumb" date-aos='fade-left'>
            <IoHome /> <span>/</span> <span>Dashboard</span>
          </div>
        </div>
        {/* Dashboard cards */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 py-4">
          <div className="relative w-[265px] h-[230px] bg-gradient-to-br from-[#9358e0] to-[#571f9e] shadow-[2px_12px_26px_3px_rgba(126,55,216,0.3)] text-white flex items-center flex-col justify-center rounded-[50px]" date-aos='fade-right'>
            <h2 className='text-2xl md:text-4xl'>Total Blogs</h2>
            <span className='absolute text-xl md:text-2xl p-4 bg-[#5d66bda7] w-32 text-center bottom-0'>{blogsData.filter(item => item.status === 'publish').length}</span>
          </div>
          <div className="relative w-[265px] h-[230px] bg-gradient-to-br from-[#ff9cc3] to-[#fd3484] shadow-[2px_12px_26px_3px_rgba(254, 128, 178, .3)] text-white flex items-center flex-col justify-center rounded-[50px]" date-aos='fade-right'>
            <h2 className='text-2xl md:text-4xl'>Total Topics</h2>
            <span className='absolute text-xl md:text-2xl p-4 bg-[#5d66bda7] w-32 text-center bottom-0'>{blogsData.filter(item => item.status === 'publish').length}</span>
          </div>
          <div className="relative w-[265px] h-[230px] bg-gradient-to-br from-[#ffd85d] to-[#ffc200] shadow-[2px_12px_26px_3px_rgba(255, 199, 23, .3)] text-white flex items-center flex-col justify-center rounded-[50px]" date-aos='fade-right'>
            <h2 className='text-2xl md:text-4xl'>Total Tags</h2>
            <span className='absolute text-xl md:text-2xl p-4 bg-[#5d66bda7] w-32 text-center bottom-0'>{blogsData.filter(item => item.status === 'publish').length}</span>
          </div>
          <div className="relative w-[265px] h-[230px] bg-gradient-to-br from-[#00d2d7] to-[#07b2dd] shadow-[2px_12px_26px_3px_rgba(6, 181, 221, .3)] text-white flex items-center flex-col justify-center rounded-[50px]" date-aos='fade-right'>
            <h2 className='text-2xl md:text-4xl'>Total Draft</h2>
            <span className='absolute text-xl md:text-2xl p-4 bg-[#5d66bda7] w-32 text-center bottom-0'>{blogsData.filter(item => item.status === 'draft').length}</span>
          </div>

        </div>
        {/* Years overview */}
        {/* <div className="gird grid-cols-1 md:grid-cols-2 lg:grid-cols-2   "> */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-4">
          <div className="relative h-[600px] md:w-full w-96 col-span-2 bg-white shadow-md rounded-[50px] overflow-hidden py-5 md:py-10 px-5 md:px-16 " date-aos='fade-up'>
            {/* <div className="leftyearoverview col-span-2 " date-aos='fade-up'></div> */}
            <div className="flex  w-[950px] md:w-full justify-between">
              <h3 >Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-center"> 10 / 365 <br /> <span>Total Publish</span></h3>
            </div>
            <Bar data={data} options={options} />
          </div>
          {/* Chart pending doing letter */}
          <div className="blogscategory relative md:w-full w-80 rounded-lg md:rounded-[50px] p-4 md:p-16 shadow-[0_0_10px_#d4d4d4] overflow-hidden" date-aos='fade-up'>
            <div>
              <h3 className='text-lg md:text-2xl py-2'>Blogs By Category</h3>
              <hr />
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className=" flex flex-center">
              <table>
                <thead>
                  <tr>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>Topics</td>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>Data</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>Html, Css & JavaScript</td>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>10</td>
                  </tr>
                  <tr>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>Next JS, React JS</td>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>10</td>
                  </tr>
                  <tr>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>Database</td>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>10</td>
                  </tr>
                  <tr>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>Deployment</td>
                    <td className='p-3 md:p-5 text-lg md:text-2xl'>10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return null or some fallback UI if not authenticated
  return null;
}
