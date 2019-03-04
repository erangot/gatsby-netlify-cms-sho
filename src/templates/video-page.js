import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'

export default ({ pageContext: { video } }) => (
    <Layout>
        <div style={{ width: 960, margin: "4rem auto" }}>
            <h1>{video.title}</h1>            
            <h1>{video.duration}</h1>
            <h1>{video.applicationName}</h1>
            <h1>{video.applicationDisplayName}</h1>
            <h1>{video.ownerId}</h1>
            <h1>{video.ownerName}</h1>
            <img src={video.videoThumbnailURL} alt={video.shortId} />
            <Link to="/">Back to Home</Link>
        </div>
    </Layout>
)