import React from 'react'
import Layout from '../components/Layout'
import 'isomorphic-fetch';
import { Link, navigate } from 'gatsby'

class IndexPageTemplate extends React.Component {

  constructor() {
    super();
    this.state = {
      videos: [],
      table: [],
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentWillMount() {
    fetch("https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getGlobalStats")
    .then(response => response.json())
    .then(data => {
      this.setState({table: data[0]});
    })

    fetch("https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getBestInSho")
    .then(response => response.json())
    .then(data => {
      this.setState({videos: data[0]});
    })
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
 }

  keyPress(e){

      if(e.keyCode === 13){
        e.preventDefault();
        navigate(`/${e.target.value.toUpperCase()}`);
      }
  }

  render() {
    let videos = this.state.videos;
    let table = this.state.table;
    
    return (
      <div>
        <div className="intro">
          <div className="container text-center">
            <img src="https://sho.co/assets/images/engagement_wheel.png" alt="Sho.co engagment wheel" className="img-padding img-responsive">
            </img>
            <h1 className="jumbo">Share your Sparkol videos</h1>
          </div>
          <span className="icwrap2">
            <span className="ic3"></span>
            <span className="ic2"></span>
            <span className="ic1"></span>
          </span>
        </div>
    
        <div className="search">
          <div className="container text-center">
            <h1 className="jumbo text-padding">Find a video</h1>
            <form className="search-box">
                <label className="search-label">sho.co/</label>
                <input className="search-input" type="text" placeholder="shortcode" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange}>
                </input>
            </form>      
          </div>

          <span className="icwrap3">
            <span className="ic1"></span>
            <span className="ic2"></span>
            <span className="ic3"></span>
          </span>
        </div>
    
        <div className="videos">
          <div className="text-center">
            <ul className="container stats-table">
              <li>{table.videos}
                <span className="stat-font">
                  Videos
                </span>
              </li>
              <li>{table.views}
                <span className="stat-font">
                  Views
                </span>
              </li>
              <li>{table.comments}
                <span className="stat-font">
                  Comments
                </span>
              </li>
              <li>{table.creators}
                <span className="stat-font">
                  Creators
                </span>
              </li>
              <li className="last">{table.likes}
                <span className="stat-font">
                  Likes
                </span>
              </li>
            </ul>
          </div>
          
          
          <div className="container text-center">
            <h1 className="jumbo text-padding">Best in sho</h1>        
          </div>
          
          <ul className="video-links">
            {
              videos.map((video, i) => 
                <li key={video.shortId}>
                  <div className="video-thumb">
                    <Link to={'/'+video.shortId}>
                      <img src={video.path+'/5_640x360.png'} alt={video.title}/>
                    </Link>
                      <span className="video-length">{video.timeInSeconds}</span>
                        <div className="video-info">              
                          <p className="upload-info">Created with 
                            <Link to={"/application/"+video.application || ''}> {video.applicationDisplayName || ''} </Link>
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
