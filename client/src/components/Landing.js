import React from 'react';
import classes from './Landing.css';

import { Link } from 'react-router-dom';
import Background from './UI/Background/Background';

const landing = props => (
    <div className={classes.Landing}>
        <Background />
        <div className={classes.TextBox}>
            <h1 className={classes.HeaderText__brand}>Zeitlichkeit</h1>
            <h2 className={classes.Tagline}>Be Timely</h2>
            <Link className={classes.Link} to="/dashboard">Register</Link><br />
            <Link className={classes.Link} to="/dashboard">Login</Link>
        </div>
        <div className={classes.Footer}>
            <div style={{textAlign: 'left', width: '50%', display: 'inline-block'}}>
                <span>&copy; {new Date().getFullYear()} by Tucker McKinney</span>
            </div>
            <div style={{textAlign: 'right', width: '50%', display: 'inline-block'}}>
                <a style={{backgroundColor:'black', color:'white', textDecoration:'none', padding:'4px 6px', fontFamily:'-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif', fontSize:'12px', fontWeight:'bold', lineHeight:'1.2', display:'inline-block', borderRadius:'3px'}} href="https://unsplash.com/@petradr?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from petradr"><span style={{display:'inline-block', padding: '2px 3px'}}><svg xmlns="http://www.w3.org/2000/svg" style={{height:'12px', width:' auto', position:'relative', verticalAlign: 'middle', top:'-1px', fill: 'white'}} viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style={{display:'inline-block', padding: '2px 3px'}}>petradr</span></a>        
            </div>
        </div>
    </div>
)

export default landing;