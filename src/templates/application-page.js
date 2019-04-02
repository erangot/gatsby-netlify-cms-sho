import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

export default ({ pageContext: { application } }) => (
  <Layout>
  <div>
  <div className="videos">
    
    <div className="container text-center">
      <h2 className="jumbo text-search">Search Results</h2>        
      <span className="text-right videos-number">{ application.videos.length } videos</span>        
    </div>
    
    <ul className="video-links">
      {
        application.videos.map((video, i) => 
          <li key={i}>
            <div className="video-thumb">
              <Link to={'/'+video.shortId || ''}>
                <img src={video.thumbnail || ''} alt={video.title || ''}/>
              </Link>
                {/* <span className="video-length">{video.timeInSeconds || ''}</span> */}
                  <div className="video-info">              
                  <p className="upload-info">Created with 
                    <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                    by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                  </p>                     
                  </div>
            </div>
          </li>
        )
      }
    </ul>
  
    <span className="icwrap4">
      <span className="ic1"></span>
      <span className="ic2"></span>
      <span className="ic3"></span>
    </span>
  </div>
  </div>
  </Layout>
)