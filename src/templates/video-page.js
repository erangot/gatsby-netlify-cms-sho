import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import TimeAgo from 'react-timeago'

export default ({ pageContext: { video } }) => (
    <Layout>
        <div className="videoPage">
            <div className="intro">
                {/* <img src={video.thumbnail || ''} alt={video.shortId || ''} /> */}
                <div className="container text-center">
                    <video width="640" height="480" controls>
                        <source src={video.videopath || ''} type="video/mp4"/>
                    Your browser does not support the video tag.
                    </video>
                </div>
                <span className="icwrap2">
                    <span className="ic3"></span>
                    <span className="ic2"></span>
                    <span className="ic1"></span>
                </span>
            </div>
            <div className="search">
                <div className="container text-left">

                    <p className="upload-info">Created with 
                    <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                    by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                    <span className="upload-date"><TimeAgo date={video.createdOn} /></span>
                    </p>                     

                </div>
                <span className="icwrap3">
                    <span className="ic1"></span>
                    <span className="ic2"></span>
                    <span className="ic3"></span>
                </span>
            </div>
            <div className="videos">
                <div className="text-center">
                <p>You must <Link to="/">log in</Link> or <Link to="/">sign up</Link> to comment on this video</p>
                <h2>0 comments</h2>
                </div>
            </div>
        </div>
    </Layout>
)