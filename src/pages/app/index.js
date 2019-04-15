import React from "react"
import { Router } from "@reach/router" // comes with gatsby v2
import IndexPageTemplate from "../../templates/index-page"
import PrivateRoute from "./component/PrivateRoute"
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { I18n, Auth } from 'aws-amplify';
// Get the aws resources configuration parameters
import aws_exports from '../../aws-exports'; // if you are using Amplify CLI
import { navigate, Link } from 'gatsby';
import Layout from '../../components/Layout'

Amplify.configure(aws_exports);

const authScreenLabels = {
    en: {
        'Sign Up': 'Create new account',
        'Sign Up Account': 'Create a new account on Sho.Co',
        'Sign in to your account': 'Sign in to your Sho.co account',
        'Create a new account': 'Create a new Sho.Co account'
    }
};

I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

// remember everything in /app/* is dynamic now!
const App = () => {
  // Move for home page
  // navigate('/');
  return (
      <Router>
        <PrivateRoute path="/app/myvideos" component={MyVideosPage} />
        <PublicRoute path="/app">
          <PrivateRoute path="/" component={IndexPageTemplate} />
        </PublicRoute>
      </Router>
  )
}

class MyVideosPage extends React.Component {
  
  constructor(){
    super();
    this.state = {
      value: '',
      videos: [],
      form: {
        short:'',
        visibility:'',
        path:'',
        bucketpath:''
      },
      user:{}
    }

    this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  componentWillMount() {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
        this.setState({user: user});

        fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getMyVideos&createdBy=${user.attributes.sub}`)
        .then(response => response.json())
        .then(data => {
          this.setState({videos: data[0]});
        })
    })
    .catch(err => {
        console.log(err);        
    });

  }

  handleChange(e) {
    this.setState({ form: {
      [e.target.placeholder]: e.target.value
        } });
    }

  async handleAdd () {
    console.log(this.state.user)
    var payload = {
      "renderRequestId": "123",
      "createdBy": `${this.state.user.attributes.sub}`,
      "username": `${this.state.user.username}`,
      "applicationName": "videoscribe",
      "visibility": `${this.state.form._visibility.value}`,
      "path":  `${this.state.form._path.value}`,
      "format": "mp4",
      "bucketPath": `${this.state.form._bucketpath.value}`
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
      path: content.media[0][0].path,
      bucketPath: content.media[0][0].bucketPath,
      format: content.media[0][0].format,
      formatDescription: "",
      owner: this.state.user.attributes.sub,
      application: "videoscribe",
      applicationDisplayName: "VideoScribe",
      title: null,
      timeInSeconds: null,
      username: this.state.user.username,
      visibility: "public"
    }) })
    console.log(content);
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

              <div className="container text-center">
                <h1 className="jumbo text-padding">My Videos</h1>
                {/* <form className="search-box"> */}
                    <label className="search-label">Add a video</label>                    
                    <input className="search-input" type="text" placeholder="visibility"   ref={input => this.state.form._visibility = input}/>
                    <input className="search-input" type="text" placeholder="path" ref={input => this.state.form._path = input}/>
                    <input className="search-input" type="text" placeholder="bucketpath" ref={input => this.state.form._bucketpath = input}/>
                    <button className="addButton-video" onClick={this.handleAdd}>Submit</button>
                {/* </form>            */}
              </div>

              <ul className="video-links">
              {
                videos.map((video, i) => 
                  <li key={video.shortId}>
                    <div className="video-thumb">
                      <Link to={'/'+video.shortId}>
                        <img src={video.videoThumbnailURL || 'https://via.placeholder.com/250x250.png?text=Placeholder+Sho.Co+Under+Development'} alt={video.title}/>
                      </Link>
                        <span className="video-length">{video.duration}</span>
                          <div className="video-info">              
                            <span className="video-owner">Created with 
                            <Link to={"/application/"+video.application || ''}> {video.applicationDisplayName || ''} </Link>
                            Short URL: <Link to={'/'+video.shortId}>{video.shortId}</Link>
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

function PublicRoute(props) {
  return <div>{props.children}</div>
}

const MyTheme = {
  
}

export default withAuthenticator(App, false, [], null, MyTheme);;