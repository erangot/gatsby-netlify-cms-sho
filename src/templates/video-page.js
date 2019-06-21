import React from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/Layout'
import TimeAgo from 'react-timeago'
import Amplify from 'aws-amplify'
import { resolve } from 'url'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {connect} from 'react-redux'


class videoPage extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            video: props.pageContext.video,
            user: {},
            isEngaged: false,
            videoTitle:'',
            videoDesc:'',
            visibility:'',
            shortUrlId:'',
            comments:[],
            comment:'',
            commentReply:'',
            orderBy: 'newest',
            mainAddCommentDisabled: true,
            replyAddCommentDisabled: true,
            mainCommentError: null,
            replyCommentError: null,
            currentReply: '',
            openReply: false,
            userUUID:'',
            analytics: {
              fullScreens:1,
              engaged:1,
              disengaged:1,
              repeatPlays:1,
              shares:1,
              loaded:1,
              finished:1,
              uniquePlays:1,
              score:1
            },
            VideoPlaying: false,
        }

        if(process.env.NODE_ENV === 'development') 
          this.state.urlLocation = `http://localhost:8000/${this.state.video.shortId}`
        else 
          this.state.urlLocation = `http://shoco-sparkol.unosoft.ph/${this.state.video.shortId}`

        this.handleOrder = this.handleOrder.bind(this);
        this.handleReplyButton = this.handleReplyButton.bind(this);    
        this.handleValidationComment = this.handleValidationComment.bind(this);  
        this.handleAddComment = this.handleAddComment.bind(this);  
        
        this.handleLikeButton = this.handleLikeButton.bind(this);  
        this.handleBlockButton = this.handleBlockButton.bind(this);  

        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);  
        this.handleChangeTitle = this.handleChangeTitle.bind(this);  
        this.handleSaveButton = this.handleSaveButton.bind(this);  

        this.handleFocus = this.handleFocus.bind(this);

        this.handleRemoveButton = this.handleRemoveButton.bind(this);

        this.handleVisibilityOption = this.handleVisibilityOption.bind(this);

        this.handleVideoPlay = this.handleVideoPlay.bind(this);
    }

    componentDidMount() {
      // window.addEventListener('load', this.handleLoad);
    
   }


    async componentWillMount() {
      await Amplify.Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => {
            
        this.setState({
          user: user,
          userUUID: user.attributes.sub
        });
          
        // Get engaged user
          fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getEngagedForShortIdUser&shortId=${this.state.video.shortId}&ownerId=${this.state.user.attributes.sub}`)
          .then(response => {
            if(!response.ok) { throw response }
            return response.json();
          })
          .then(data => {
              // console.log("isEngaged",data[0][0]);
              this.setState({
                  isEngaged: data[0][0].engaged,
              })
          });
        
          // console.log('User Logged In - ', user);

          resolve(user);
          }).catch(err => {

              // console.log(err);        
          });
         
          // Get comments
         await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getComments&shortUrl=${this.state.video.shortId}&orderBy=asc`)
         .then(response => {
           
          if(!response.ok) { throw response }
          return response.json();

         })
         .then(data => {
          //  console.log(data);
           this.setState({comments: data[0]})
           resolve(data[0]);
         }).catch(err => {

            // console.log(err);        
        });
 
         // Get details
        await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getDetailsFromShortId&shortId=${this.state.video.shortId}`)
         .then(response => {
          if(!response.ok) { throw response }
          return response.json();
         })
         .then(data1 => {
          //  console.log(data1[0][0]);
           this.setState({
             videoTitle: data1[0][0].title,
             videoDesc: data1[0][0].description,
             visibility: data1[0][0].visibility,
             shortUrlId: data1[0][0].shortUrlId
           });
           resolve(data1[0][0]);
         }).catch(err => {

            // console.log(err);        
        });

        // Get analytics
        await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getVideoStatistics&shortId=${this.state.video.shortId}`)
         .then(response => {
          if(!response.ok) { throw response }
          return response.json();
         })
         .then(data2 => {
           console.log(data2[0][0]);
           this.setState({
             analytics: data2[0][0],
           });
           resolve(data2[0][0]);
         }).catch(err => {

            // console.log(err);        
        });
 
    }

    // handle event on likes
  async handleLikeButton(event) {
    event.preventDefault();


    if(this.props.user.status) {
      var toggleEngaged = !this.state.isEngaged;
      var payload = {
        "shortId": `${this.state.video.shortId}`,
        "engaged": toggleEngaged,
        "ownerId": `${this.state.user.attributes.sub}`
      };
      console.log("toggleEngaged",toggleEngaged)
      this.setState({isEngaged: toggleEngaged});

      console.log(payload);
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const rawResponse = await fetch(proxyurl+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=changedEngagedForShortIdUser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
       await rawResponse.json();

      // Create analytics to be a function
      var payload1 = {
        "shortId": `${this.state.video.shortId}`,
        "eventType": `${toggleEngaged?'engaged':'disengaged'}`,
        "ownerId": `${this.state.user.attributes.sub}`
      };
  
     console.log(payload1);
     const proxyurl1 = "https://cors-anywhere.herokuapp.com/";
     const rawResponse1 = await fetch(proxyurl1+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=createAnalyticEntry', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload1)
      });
     await rawResponse1.json();


      
    } else {
      navigate('/app');
    }
  }

  handleBlockButton(event) {
    event.preventDefault();
    
    this.setState({isBlocked: true});

    fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=blockShortUrl&shortUrlId=${this.state.shortUrlId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  

     // handle adding a comment
  async handleAddComment (event, commentParent) {

    console.log(event.target)
    var payload = {
      "shortId": `${this.state.video.shortId}`,
      "parent": commentParent || null,
      "username":  `${this.state.user.username}`,
      "comment": event.target.className === "main" ? `${this.state.comment}`: `${this.state.commentReply}`,
      "uid": `${this.state.user.attributes.sub}`
    };

   console.log(payload);
   const proxyurl = "https://cors-anywhere.herokuapp.com/";
   const rawResponse = await fetch(proxyurl+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=addComment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  
    await rawResponse.json();

  // Get comments
  const rawResponseComments = await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getComments&shortUrl=${this.state.video.shortId}&orderBy=asc`);
  const commentsRaw = await rawResponseComments.json();
  this.setState({comments:commentsRaw[0]});

     // after effect
     console.log(commentParent)
    if(commentParent === undefined) 
      this.setState({
        comments:commentsRaw[0],
        comment: '',
        mainAddCommentDisabled: true,
        mainCommentError: null,
      })
     else 
      this.setState({
        comments:commentsRaw[0],
        commentReply: '',
        replyAddCommentDisabled: true,
        replyCommentError: null,
        openReply: false
      })
    

 }

  // handle validation of the comment
  handleValidationComment(event) {
    event.preventDefault();
    if(event.target.id === "main-AddComment") {
      this.setState({comment: event.target.value});

      switch(true) {

        case (event.target.value.length === 0): 
        this.setState({mainCommentError: null,
        mainAddCommentDisabled: true});
        break;

        case (event.target.value.length < 10): 
        this.setState({mainCommentError: 'Your comment is too short, please type a longer message',
        mainAddCommentDisabled: true});
        break;

        case (event.target.value.length >= 6000):
        this.setState({mainCommentError: 'Your comment is too long, please type a shorter message',
        mainAddCommentDisabled: true});
        break;

        default: this.setState({mainCommentError: null,
        mainAddCommentDisabled: false
        })
      }
    } else {

      this.setState({commentReply: event.target.value});

      switch(true) {

        case (event.target.value.length === 0): 
        this.setState({replyCommentError: null,
        replyAddCommentDisabled: true});
        break;

        case (event.target.value.length < 10): 
        this.setState({replyCommentError: 'Your comment is too short, please type a longer message',
        replyAddCommentDisabled: true});
        break;

        case (event.target.value.length >= 50):
        this.setState({replyCommentError: 'Your comment is too long, please type a shorter message',
        replyAddCommentDisabled: true});
        break;

        default: this.setState({replyCommentError: null,
        replyAddCommentDisabled: false
        })
      }
    }
    

  }

  handleOrder(param, event) {
    event.preventDefault();
    this.setState({orderBy: param});
    console.log(param);
  }

  handleReplyButton(commentId, event){
    event.preventDefault();

    console.log(commentId);

    if(commentId === this.state.currentReply) {
      this.setState({openReply: !this.state.openReply});
    } else {
      this.setState({
        openReply: true,
        currentReply: commentId
      })
    }
  }

  handleEditButton(event){
    
    event.preventDefault();
    this.setState({isEditing:true});
  }

  handleChangeDesc(event) {
    event.preventDefault();
    this.setState({videoDesc: event.target.value})
  }

  handleChangeTitle(event) {
    event.preventDefault();
    this.setState({videoTitle: event.target.value})
  }

  async handleSaveButton(event) {
    event.preventDefault();

    var payload = {
      "shortId": `${this.state.video.shortId}`,
      "vidTitle": this.state.videoTitle,
      "vidDesc": this.state.videoDesc,
      "ownerId": `${this.state.user.attributes.sub}`
    };
    console.log(payload);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const rawResponse = await fetch(proxyurl+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=saveDetailsForShortId', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    await rawResponse.json();
    
    this.setState({isEditing:false});
  }

  handleFocus = (event) => event.target.select();

  // handle removing of the video
  handleRemoveButton(event) {
    event.preventDefault();
    
    confirmAlert({
      title: 'sho.co says',
      message: 'Are you sure you wish to remove this video?',
      buttons: [
        {
          label: 'Yes',
           onClick: () =>  fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=blockShortUrl&shortUrlId=${this.state.video.shortUrlId}`)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            navigate('/app/myvideos/deleted');
          })
        },
        {
          label: 'No',
          onClick: () => console.log('Clicked No for confirm')
        }
      ]
    });
    
  }

  async handleVisibilityOption(event) {

    event.preventDefault();
    console.log(event.target.value);

    var payload = {
      "shortId": `${this.state.video.shortId}`,
      "visibility": event.target.value,
      "ownerId": `${this.state.user.attributes.sub}`
    };

    console.log(payload);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const rawResponse = await fetch(proxyurl+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=changeVisibility', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    
    await rawResponse.json();
    this.setState({visibility: payload.visibility});
  }

  handleVideoPlay(event){
    event.preventDefault();
    var stat = false;
    var vid = document.getElementById("vid");
    var smallBtn = document.getElementById("smallPlay");
    
    vid.pause();

    if(!this.state.VideoPlaying){
      stat = true;
      vid.play(); 
    }
    
    if(smallBtn.classList[2] === "vjs-paused"){
      smallBtn.classList.remove("vjs-paused");
      smallBtn.classList.add("vjs-playing");
    }else{
      smallBtn.classList.remove("vjs-playing");
      smallBtn.classList.add("vjs-paused");
    }
    this.setState({VideoPlaying: stat});

  }

  handleLoad() {
    // var player = videojs('vid');
  }



    render() {

      console.log(this.props.user.status)

        let video = this.state.video;
        
        const objectComments = this.state.comments.filter(comment => comment.id)
        const commentLength = objectComments.length;
        const playStatus = this.state.VideoPlaying;

        let playBtn = "";
        if(!playStatus){
          playBtn = <div className="vjs-big-play-button" role="button" onClick={this.handleVideoPlay}><span aria-hidden="true"></span></div>
        }else{
          playBtn = "";
        }
        
        return (
            <Layout>
                <div className="videoPage">
                    <div className="intro">
                        {/* <img src={video.thumbnail || ''} alt={video.shortId || ''} /> */}
                        <div className="container text-center">
                            <div className="videoscribe-skin " onClick={this.handleVideoPlay}>
                              <video className="vjs-tech"
                                id="vid"
                                preload="auto" width="640px" height="480px"
                                disablepictureinpicture="true"
                                poster={video.thumbnail ||''}
                                src={video.videopath || ''}
                                controlsList="nodownload"
                                >
                                <source src={video.videopath || ''} type="video/mp4"/>
                                <p className="vjs-no-js">Your browser does not support the video tag.</p>
                              </video>
                              {playBtn}
                              <div className="vjs-control-bar">
                                <div className="vjs-play-control vjs-control  vjs-paused" id="smallPlay" role="button">
                                  <div className="vjs-control-content">
                                    <span className="vjs-control-text">Play</span>
                                  </div>
                                </div>
                                {/* <div className="vjs-progress-control vjs-control">
                                  <div role="slider" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" tabindex="0" className="vjs-progress-holder vjs-slider" aria-label="video progress bar" aria-valuetext="0:00">
                                      <div className="vjs-load-progress"><span className="vjs-control-text"><span>Loaded</span>: 0%</span></div>
                                      <div className="vjs-play-progress"><span className="vjs-control-text"><span>Progress</span>: 0%</span></div>
                                      <div className="vjs-seek-handle vjs-slider-handle" aria-live="off"><span className="vjs-control-text">0:00</span></div>
                                  </div>
                                </div> */}
                              </div>

                              
                            </div>
                        </div>
                        <span className="icwrap2">
                            <span className="ic3"></span>
                            <span className="ic2"></span>
                            <span className="ic1"></span>
                        </span>
                    </div>
                     <div className="container1 dynamic-videopage">
                <div className="row">
                  <div className="stats col-sm-7">
                  {this.state.isEditing ? (
                    <div id="video-detail-editable">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title" className="sr-only">Video title</label>
                            <input type="text" className="form-control" id="video-title" placeholder="" value={this.state.videoTitle} onChange={this.handleChangeTitle}/>
                            <button type="submit" className="btn btn-default btn-save" id="save-btn"  onClick={this.handleSaveButton}>Save</button>
                        </div>
                        <p className="upload-info">Created with 
                        <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                        
                        
                            by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                        
                        <span className="upload-date"><TimeAgo date={video.createdOn} /></span></p>
                        
                            <div className="form-group">
                                <label htmlFor="videoDesc" className="sr-only">Video description</label>
                                <textarea rows="5" className="form-control" id="video-desc" value={this.state.videoDesc} onChange={this.handleChangeDesc}></textarea>
                            </div>
                    </form>
                </div>
                    
                  ):(
                    <div id="video-detail-static">
                      <h1>{this.state.videoTitle}</h1>
                      {(this.state.video.createdBy === this.state.userUUID)?
                      (<button type="submit" className="btn btn-default btn-edit" id="edit-btn" onClick={this.handleEditButton}>Edit</button>):('') }
                      
                      <p className="upload-info">Created with 
                      <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                      by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                      <span className="upload-date"><TimeAgo date={video.createdOn} /></span></p>    
                      <div className="desc">
                        {this.state.videoDesc}
                        <a href="/" className="show-more">Show more</a>
                      </div>
                    </div>  
                  )}
                  
                  <div className="social-surround">
                      <p>Share</p>
                      <ul className="social-links">
                          <li className="first">
                              <a 
                              href={`https://www.facebook.com/sharer.php?u=+${encodeURIComponent(this.state.urlLocation)}`} 
                              data-site="facebook" className="share-social share-fb prevent-default" target="_blank" rel="noopener noreferrer" title="Share this sho on Facebook"><span className="icon">Share</span></a>
                          </li>
                          <li>
                              <a 
                              href={`http://twitter.com/intent/tweet?url=${this.state.urlLocation}&amp;via=SparkolHQ`} 
                              data-site="twitter" target="_blank" rel="noopener noreferrer" className="share-social share-twitter prevent-default" title="Share this sho on Twitter"><span className="icon">Tweet</span></a>
                          </li>
                          <li>
                              <a 
                              href={`mailto:?to=&Subject=Share%20a%20sho,&body=${this.state.urlLocation}`} 
                              data-site="email" className="share-social share-email" target="_self" title="Share this sho by Email"><span className="icon">Email</span></a>
                          </li>
                      </ul>
                      <ul className="action-links">
                          <li><button className="eng-link active" onClick={this.handleLikeButton}>
                           {this.props.user.status? (''):(<span className="login-required-overlay"><span> Please login to rate </span></span>)}
                            Like<span className={"icon " + (this.state.isEngaged ? 'active' : '') }></span></button></li>
                          <li className="last"><button className="report-link" onClick={this.handleBlockButton}>Report<span className={"icon " + (this.state.isBlocked ? 'active' : '') }></span></button></li>
                      </ul>
                  </div>

                  <div className="input-surround" id="url">
                      <label htmlFor="url-input">Link</label>
                      <input id="url-input" type="text" value={`http://shoco-sparkol.unosoft.ph/app/${this.state.shortId}`} onFocus={this.handleFocus} onClick={this.handleFocus}  readOnly/>
                  </div>
                  <div className="input-surround" id="embed-code">
                      <label htmlFor="embed-code-input">Embed code</label>
                      <input id="embed-code-input" type="text" value={`<iframe width='560' height='360' src='"http://shoco-sparkol.unosoft.ph/app/${this.state.shortId}" frameborder='0' allowfullscreen></iframe>`} onFocus={this.handleFocus} onClick={this.handleFocus} readOnly/>
                  </div>
                  {(this.state.video.createdBy === this.state.userUUID)?
                      (<div>
                         <div className="input-surround" id="download">
                            <label htmlFor="download-drop-down">Download</label>
                            <select id="download-drop-down">
                                <option defaultValue="" disabled="">Select a format</option>
                                    <option value="1080MP4_H264">1080 MP4</option>
                                    <option value="720MP4_H264">720 MP4</option>
                                    <option value="360MP4_H264">360 MP4</option>
                            </select>
                          </div>
                          <div className="input-surround" id="visibility">
                              <label htmlFor="download-drop-down">Visibility</label>
                              <select id="visibility-drop-down" onChange={this.handleVisibilityOption} value={this.state.visibility}>
                                  <option value="public">Public</option>
                                  <option value="unlisted">Unlisted</option>
                                  <option value="private">Private</option>
                              </select>
                          </div>     
                          <p className="remove-video"><a href="/" className="confirmation" onClick={this.handleRemoveButton}>Remove video</a></p>
                        </div>):('') }
                 
              </div>

              <div className="engagement col-sm-5">
                  <div className="wheel">
                    <img src="https://sho.co/assets/images/engagement_wheel.png" alt="Sho.co engagment wheel" className="img-padding img-responsive" width="200" height="200"/>
                  </div>
                  <div className="legend eng-stats">
                    <ul>
                      <li >{Math.ceil(this.state.analytics.engaged/this.state.analytics.score)}%<br /><span className="stat-category">Likes</span></li>
                      <li >{Math.ceil(this.state.analytics.repeatPlays/this.state.analytics.score)}%<br /><span className="stat-category">Repeats</span></li>
                      <li >{Math.ceil(this.state.analytics.fullScreens/this.state.analytics.score)}%<br /><span className="stat-category">Fullscreens</span></li>
                      <li >{Math.ceil(this.state.analytics.shares/this.state.analytics.score)}%<br /><span className="stat-category">Shares</span></li>
                      <li >{Math.ceil(this.state.analytics.finished/this.state.analytics.score)}%<br /><span className="stat-category">Completes</span></li>
                    </ul>
                  </div>
                  <ul className="video-stats">
                    <li className="views"><span className="stat">{this.state.analytics.score}</span> <span className="stat-category">views</span></li>
                  </ul>
              </div>
              
          </div>
        </div>

                      
                      
              <div className="videos" id="comments">
                <div className="container2">
                      <div className="comment-section comments">
                      <div className="comment-post">
                        {(commentLength === 0)?(
                          <h2>{commentLength} comments</h2>
                        ):(
                          <div>
                            <h2>{commentLength} comments of {commentLength}</h2>
                            <ul className="list-inline comment-sort" >
                              <li>
                                <a href="/" onClick={(evt) => this.handleOrder('oldest', evt)} className={  (this.state.orderBy ==='oldest' ? 'active' : '')}>Oldest </a>
                                |
                              </li>
                              <li className="last">
                                <a href="/" onClick={(evt) => this.handleOrder('newest', evt)} className={  (this.state.orderBy ==='newest' ? 'active' : '')}> Newest</a>
                              </li>
                            </ul>  
                          </div>
                        )}
                        
                        {this.props.user.status ?(
                          <div>
                            <div className="comment-wrap">
                              <textarea id="main-AddComment" className={(this.state.mainAddCommentDisabled)? 'comment-input disabled' : 'comment-input'} value={this.state.comment} onChange={this.handleValidationComment}></textarea>
                              <span className="error-comment-input">{this.state.mainCommentError}</span>
                            </div>
                            <button id="comment-btn" 
                              className="main"
                              disabled = {(this.state.mainAddCommentDisabled)? "disabled" : ""}
                              onClick={this.handleAddComment}>Post</button>
                          </div>
                        ):(
                          <div className="text-center notLoggedIn-message">
                            <p>You must <Link to="/app">log in</Link> or <Link to="/app">sign up</Link> to comment on this video</p>
                          </div>
                        )}
                      </div>
                        
                        <ul className="comment-list">
                          { this.state.orderBy === 'oldest' ? (
                              
                              objectComments
                              .filter(comment => comment.parent === null)
                              .map((comment, i) => 
                                <li key={i} className="comment-list-item">
                                  <div className="comment-content">
                                    <p className="username"> {comment.userName || ''} </p>
                                    <p className="comment-text">
                                      {comment.comment || ''} 
                                      
                                    </p>
                                    <p className="comment-info">
                                      <span className="comment-date"><TimeAgo date={comment.date} /> </span>
                                      
                                      
                                      {this.props.user.status ?( 
                                        <span>|
                                      <a href="/" className="reply" onClick={(evt) => this.handleReplyButton(comment.commentId, evt)}> Reply</a></span>                                     
                                      ):('')}
                                    </p>
                                    {
                                      this.state.openReply && this.state.currentReply === comment.commentId ? (
                                        <div className="comment-post">
                                          <div className="comment-wrap">
                                          <textarea className={(this.state.replyAddCommentDisabled)? 'comment-input disabled' : 'comment-input'} value={this.state.commentReply} onChange={this.handleValidationComment}></textarea>
                                          <span className="error-comment-input">{this.state.replyCommentError}</span>
                                            {/* <span className="error-comment-input">Your comment is too short, please type a longer message</span>
                                            <span className="error-comment-input">Your comment is too long, please type a shorter message</span> */}
                                            {/* <span className="error ng-hide" ng-show="newCommentForm.failed">Your comment was not added, please try again</span> */}
                                          </div>
                                          <button id="comment-btn"
                                          disabled = {(this.state.replyAddCommentDisabled)? "disabled" : ""}
                                          onClick={(evt) => this.handleAddComment(evt, comment.commentId)}
                                          >Post</button>
                                      </div>
                                      ):(
                                        <div></div>
                                      )
                                    }
                                    <ul>
                                    {
                                      objectComments.reverse()
                                      .filter(comment1 => comment1.parent === comment.commentId)
                                      .map((comment1, i) => 
                                        <li key={i} className="comment-list-item">
                                          <div className="comment-content">
                                            <p className="username"> {comment1.userName || ''} </p>
                                            <p className="comment-text">
                                              {comment1.comment || ''} 
                                              
                                            </p>
                                            <p className="comment-info">
                                              <span className="comment-date"><TimeAgo date={comment1.date} /> </span>
                                            </p>
                                          </div>
                                        </li>
                                      )
                                    }
                                  </ul>
                                  </div>
                                </li>
                              )

                          ):(
                            objectComments.reverse()
                            .filter(comment => comment.parent === null)
                            .map((comment, i) => 
                              <li key={i} className="comment-list-item">
                                <div className="comment-content">
                                  <p className="username"> {comment.userName || ''} </p>
                                  <p className="comment-text">
                                    {comment.comment || ''} 
                                    
                                  </p>
                                  <p className="comment-info">
                                    <span className="comment-date"><TimeAgo date={comment.date} /> </span>
                                    {/* Only when logged In */}
                                    {this.props.user.status ?( 
                                     <span>|
                                     <a href="/" className="reply" onClick={(evt) => this.handleReplyButton(comment.commentId, evt)}> Reply</a></span>                                     
                                     ):('')}
                                  </p>
                                  {
                                    this.state.openReply && this.state.currentReply === comment.commentId ? (
                                      <div className="comment-post">
                                        <div className="comment-wrap">
                                        <textarea className={(this.state.replyAddCommentDisabled)? 'comment-input disabled' : 'comment-input'} value={this.state.commentReply} onChange={this.handleValidationComment}></textarea>
                                        <span className="error-comment-input">{this.state.replyCommentError}</span>
                                          {/* <span className="error-comment-input">Your comment is too short, please type a longer message</span>
                                          <span className="error-comment-input">Your comment is too long, please type a shorter message</span> */}
                                          {/* <span className="error ng-hide" ng-show="newCommentForm.failed">Your comment was not added, please try again</span> */}
                                        </div>
                                        <button id="comment-btn"
                                        disabled = {(this.state.replyAddCommentDisabled)? "disabled" : ""}
                                        onClick={(evt) => this.handleAddComment(evt, comment.commentId)}
                                        >Post</button>
                                    </div>
                                    ):(
                                      <div></div>
                                    )
                                  }
                                  <ul>
                                      {
                                    objectComments
                                    .filter(comment1 => comment1.parent === comment.commentId)
                                    .map((comment1, i) => 
                                      <li key={i} className="comment-list-item">
                                        <div className="comment-content">
                                          <p className="username"> {comment1.userName || ''} </p>
                                          <p className="comment-text">
                                            {comment1.comment || ''} 
                                            
                                          </p>
                                          <p className="comment-info">
                                            <span className="comment-date"><TimeAgo date={comment1.date} /> </span>
                                          </p>
                                        </div>
                                      </li>
                                    )
                                  }
                                  </ul>
                                </div>
                              </li>
                            )
                          )
                          }
                        </ul>
                      </div>
                </div>
                  
              </div>
                </div>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => 
{ 
  console.log(state)
  return {
    user:state.userReducer
  }
}



export default connect(mapStateToProps)(videoPage)