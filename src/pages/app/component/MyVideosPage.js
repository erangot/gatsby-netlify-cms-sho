import React from "react"
import { Auth } from 'aws-amplify';
// Get the aws resources configuration parameters
import {Link } from 'gatsby';
import Layout from '../../../components/Layout';


class MyVideosPage extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      value: '',
      videos: [],
      form: {
        short:'',
        visibility:'',
        path:'',
        bucketpath:''
      },
      user:{},
      isVideoDeleted: false
    }

    this.form = {

    };

    this.keyPress = this.keyPress.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {

    if(this.props.deleted) 
      this.setState({isVideoDeleted: true});
    
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
        this.setState({user: user});

        fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getMyVideos&createdBy=${user.attributes.sub}`)
        .then(response => response.json())
        .then(data => {
          console.log(data[0]);
          this.setState({videos: data[0]});
        })
    })
    .catch(err => {
        console.log(err);        
    });

  }


  async handleAdd () {
    console.log(this.state.user)
    var payload = {
      "renderRequestId": "123",
      "createdBy": `${this.state.user.attributes.sub}`,
      "username": `${this.state.user.username}`,
      "applicationName": `${this.form._application.value}`,
      "visibility": `public`,
      "video":  `${this.form._video.value}`,
      "format": "mp4",
      "thumbnail": `${this.form._thumbnail.value}`
    };

   const proxyurl = "https://cors-anywhere.herokuapp.com/";
   const rawResponse = await fetch(proxyurl+'https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const content = await rawResponse.json();
    
    this.setState({ videos: this.state.videos.concat({
      shortId: content.shorturl.shortId,
      path: this.form._thumbnail.value,
      bucketPath: content.media[0][0].bucketPath,
      format: content.media[0][0].format,
      formatDescription: "",
      owner: this.state.user.attributes.sub,
      application: this.form._application.value,
      applicationDisplayName: this.form._application.value,
      title: null,
      timeInSeconds: null,
      username: this.state.user.username,
      visibility: "public"
    }) })

    var els = document.getElementsByClassName('search-input');
    Array.from(els).forEach((el) => {
        el.value = '';
        el.placeholder = 'Video Page Added'
    });
    console.log(document.getElementsByClassName('search-input'));
    
    // console.log(content);
 }

  keyPress(e){

      if(e.keyCode === 13){

        alert(`/${e.target.value}`);
        
      }
  }

  render() {
    let videos = this.state.videos;

    return (
      <Layout>
        <div>
          {/* <div className="search">
            <div className="container text-center">
              <h1 className="jumbo text-padding">My Videos</h1>
              <form className="search-box">
                  <label className="search-label">Add a video</label>
                  <input className="search-input" type="text" placeholder="shortcode" value={this.state.value} onKeyDown={this.keyPress} onChange={this.handleChange}>
                  </input>
              </form>      
            </div>
          </div> */}


          <div className="videos">
            <div className="text-center">
              { (this.state.isVideoDeleted) ? 
                <h3 className="video-deleted-banner">Your video has been deleted.</h3> :
                <div></div>
              }
              <div className="container text-center">
                <h1 className="jumbo text-padding">My Videos</h1>
                {/* <form className="search-box"> */}
                    <label className="">Add a video</label><br/>                   
                    <input className="search-input" type="text" placeholder="application"   ref={input => this.form._application = input}/><br/>
                    <input className="search-input" type="text" placeholder="video" ref={input => this.form._video = input}/><br/>
                    <input className="search-input" type="text" placeholder="thumbnail" ref={input => this.form._thumbnail = input}/><br/>
                    <button className="addButton-video" onClick={this.handleAdd}>Submit</button>
                {/* </form>            */}
              </div>

              <ul className="video-links">
              {
                videos.map((video, i) => 
                  <li key={video.shortId}>
                    <div className="video-thumb">
                      <Link to={'/'+video.shortId}>
                        <img src={
                          (video.path === 'samplepath' || video.path === 'sample' ) ? (
                            'https://via.placeholder.com/250x100.png?text=Placeholder+Sho.Co+Under+Development'
                          ) : (
                            video.path
                          )
                           } alt={video.title}/>
                      </Link>
                        <span className="video-length">{video.duration}</span>
                          <div className="video-info">              
                            <span className="video-owner">Created with 
                            <Link to={"/application/"+video.application || ''}> {video.applicationDisplayName || ''} </Link>
                            Short URL: <Link to={'/app/'+video.shortId}>{video.shortId}</Link>
                            </span>
                          </div>
                    </div>
                  </li>
                )
              }
            </ul>
            </div>
          </div>

        </div>
      </Layout>);
  }
  
  
}

export default MyVideosPage