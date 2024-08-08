

import React, { useContext, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/AuthContext';
import Loader from '../components/Loader';



const LogIn = () => {

    const {user,googleSignIn,loading} = useContext(UserContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        navigate('/admin');
    }
  }, [user?.email, navigate]);

  

//   if (loading) {
//     return (
//       <div className='loadingdata flex flex-col flex-center wh_100'>
//         <Loader/>
//       </div>
//     );
//   }

  if (!user?.name) {
    return (
      <div className='loginfront flex flex-center flex-col full-w'>
        <img src="/kar_rakib.png" width={250} height={250} alt='karrakib' />
        <h1>Welcome Admin of the blog LogIn 🤝</h1>
        <p>Visit our main website <a to="www.kar.com">rakib</a></p>
        <button onClick={googleSignIn} className='bg-white px-8 py-8 flex gap-2 items-center'>
          <FcGoogle size={30} /> Sign In with Google
        </button>
      </div>
    );
  }

  // You can return null or any other component if the session is present
  // since the user will be redirected to the home LogIn anyway
  return null;
}

export default LogIn;