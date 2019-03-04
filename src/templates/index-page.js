import React from 'react'
import Layout from '../components/Layout'
import 'isomorphic-fetch';

class IndexPageTemplate extends React.Component {

  constructor() {
    super();
    this.state = {
      videos: [
        {
          link: 'https://sho.co/1B9A6',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2019/1/4/e2d5e8ed138546528b62cc25c3d32066/5_640x360.jpg',
          author: 'Lisa Wiles'
        },
        {
          link: 'https://sho.co/19G41',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2017/10/3/4139dde6b72348c7b79340323a0a5f9b/5_640x360.jpg',
          author: 'Benoit Raucent'
        },
        {
          link: 'https://sho.co/18F5Z',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2017/2/10/65373c343c0f4185a0287df93e340343/5_640x360.jpg',
          author: 'Eva Zamora'
        },
        {
          link: 'https://sho.co/18FD9',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2017/2/11/b69bdf7a53bb403fb0947603f32a996b/5_640x360.jpg',
          author: 'Eva Zamora'
        },
        {
          link: 'https://sho.co/19GQ3',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2017/10/8/c24314d97c0744f0a363eb5c52da4131/5_640x360.jpg',
          author: 'Benoit Raucent'
        },
        {
          link: 'https://sho.co/1B4NS',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2018/11/26/3489d925591242edab92b79f3bcdcada/5_640x360.jpg',
          author: 'Yonnie Chyung'
        },
        {
          link: 'https://sho.co/17CTR',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2016/4/1/f50e04549cdb43ddb11a22d3633cfcb2/5_640x360.jpg',
          author: 'Debbie Camozzi'
        },
        {
          link: 'https://sho.co/17CTR',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2017/2/11/0aa43fc86fff4ac79954746d1ad8ea01/5_640x360.jpg',
          author: 'Eva Zamora'
        },
        {
          link: 'https://sho.co/1B6NQ',
          videoThumbnailURL: 'https://d11oz1xo3vrzp6.cloudfront.net/publish/2018/12/10/80b654d9bc4c4927bff61cfaab71a742/5_640x360.jpg',
          author: 'Marc Stoof'
        },  
      ],
      table: [
        {
          videos: '193,441'
          
        },
        {
          views: '902,131'
          
        },
        {
          comments: '383'
          
        },
        {
          creators: '71,883'
          
        },
        {
          likes: '1,947'
          
        },
      ]
    }
  }

  componentWillMount(){
    fetch("/.netlify/functions/api/?path=/api/globalstats")
    .then(response => response.json())
    .then(data => {
      this.setState({table: data});
    })

    fetch("/.netlify/functions/api/?path=/api/bestinsho")
    .then(response => response.json())
    .then(data => {
      this.setState({videos: data});
    })
    }

  render() {
    let videos = this.state.videos;
    let table = this.state.table;

    return (
      <div>
        <div class="intro">
          <div class="container text-center">
            <img src="https://sho.co/assets/images/engagement_wheel.png" alt="Sho.co engagment wheel" class="img-padding img-responsive">
            </img>
            <h1 class="jumbo">Share your Sparkol videos</h1>
          </div>
          <span class="icwrap2">
            <span class="ic3"></span>
            <span class="ic2"></span>
            <span class="ic1"></span>
          </span>
        </div>
    
        <div class="search">
          <div class="container text-center">
            <h1 class="jumbo text-padding">Find a video</h1>
            <form class="search-box">
                <label class="search-label">sho.co/</label>
                <input class="search-input" type="text" placeholder="shortcode">
                </input>
            </form>      
          </div>

          <span class="icwrap3">
            <span class="ic1"></span>
            <span class="ic2"></span>
            <span class="ic3"></span>
          </span>
        </div>
    
        <div class="videos">
          <div class="text-center">
            <ul class="container stats-table">
              <li>{table.videos}
                <span class="stat-font">
                  Videos
                </span>
              </li>
              <li>{table.views}
                <span class="stat-font">
                  Views
                </span>
              </li>
              <li>{table.comments}
                <span class="stat-font">
                  Comments
                </span>
              </li>
              <li>{table.creators}
                <span class="stat-font">
                  Creators
                </span>
              </li>
              <li class="last">{table.likes}
                <span class="stat-font">
                  Likes
                </span>
              </li>
            </ul>
          </div>
          
          
          <div class="container text-center">
            <h1 class="jumbo text-padding">Best in sho</h1>        
          </div>
          
          <ul class="video-links">
            {
              videos.map((video, i) => 
                <li>
                  <a href={video} class="video-thumb">
                  <img src={video.videoThumbnailURL} alt="ThumbnailVideo"/>
                    <span class="video-length">{video.duration}</span>
                      <div class="video-info">              
                        <span class="video-owner">Created with <a href="/app/videoscribe">{video.applicationDisplayName}</a> by <a href="/user/3143123">{video.ownerName}</a>
                        </span>
                      </div>
                  </a>
                </li>
              )
            }
          </ul>
    
          <span class="icwrap4">
            <span class="ic1"></span>
            <span class="ic2"></span>
            <span class="ic3"></span>
          </span>
        </div>
      </div>
    )
  }
}

const IndexPage = () => {

  return (
    <Layout>
      <IndexPageTemplate/>
    </Layout>
  )
}

export default IndexPage
