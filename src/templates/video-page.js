import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

export default ({ pageContext: { video } }) => (
    <Layout>
        <div className="videoPage">
            <div className="intro">
                <img src={video.videoThumbnailURL} alt={video.shortId} />
                <span className="icwrap2">
                    <span className="ic3"></span>
                    <span className="ic2"></span>
                    <span className="ic1"></span>
                </span>
            </div>
            <div className="search">
                <div className="container text-left">
                    <p class="upload-info">Created with 
                    <Link to={"/app/"+video.applicationName}> {video.applicationDisplayName} </Link>
                    by <Link to={"/user/"+video.ownerId}> {video.ownerName} </Link>
                    <span class="upload-date">2 months ago</span></p>                     
                </div>
                <span className="icwrap3">
                    <span className="ic1"></span>
                    <span className="ic2"></span>
                    <span className="ic3"></span>
                </span>
            </div>
            <div class="videos">
                <div class="text-center">
                <p>You must <Link to="/">log in</Link> or <Link to="/">sign up</Link> to comment on this video</p>
                <h2>0 comments</h2>
                </div>
            </div>
        </div>
    </Layout>
)