import Link from 'next/link';
import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    console.log(currentYear);
  return (
    <div className='footer'>
        <div className="container flex flex-sh flex-wrap flex-left">
            <div className="footer_logo">
                <h2>Programming Blog</h2>
                <h4>&copy;{currentYear} All Rights Reserved.  </h4>
                <h3>Coded By @Programmer</h3>
            </div>
            <div className="q_links">
              <h3>Quick Links</h3>
              <ul> 
                <li><Link to='/'>Advertise with us</Link> </li>
                <li><Link to='/'>About us</Link> </li>
                <li><Link to='/'>Contact us</Link> </li>
              </ul>
            </div>
            <div className="q_links">
              <h3>Legal Stauff Links</h3>
              <ul> 
                <li><Link to='/'>Privacy Notice</Link> </li>
                <li><Link to='/'>Cookie Policy</Link> </li>
                <li><Link to='/'>Terms us</Link> </li>
              </ul>
            </div>
            <div className="q_links">
              <h3>Social</h3>
              <ul> 
                <li><Link to='/'>Github</Link> </li>
                <li><Link to='/'>FaceBook</Link> </li>
                <li><Link to='/'>Youtube</Link> </li>
              </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer