import React from "react"
import { Link,  } from 'gatsby';
import Layout from '../../../components/Layout';
import TimeAgo from 'react-timeago'
import { navigate } from "@reach/router" // comes with gatsby v2
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import VideoComments from '../../../components/video/VideoComments'
import VideoPlayer from '../../../components/video/VideoPlayer'
import {connect} from 'react-redux'
import videoDetailsAction from '../../../actions/videoDetailsAction'
import videoEngagedAction from '../../../actions/videoEngagedAction'
import videoCommentsAction from '../../../actions//videoCommentsAction'
import videoAnalyticsAction from '../../../actions/videoAnalyticsAction'



class DynamicRoute extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      video: {},
      isRendered: false,
      message: '',
      isEditing: false,
      comments: [],
      user: {},
      comment:'',
      commentReply:'',
      orderBy: 'newest',
      mainAddCommentDisabled: true,
      replyAddCommentDisabled: true,
      mainCommentError: null,
      replyCommentError: null,
      currentReply: '',
      openReply: false,
      visibility: '',
      videoTitle: '',
      videoDesc: '',
      shortUrlId: '',
      isEngaged: false,
      isBlocked: false,
      shortId: '',
    
    }


    if(process.env.NODE_ENV == 'development') 
      this.state.shortId = String(props["uri"]).split('/')[2]
    else 
      this.state.shortId = String(props["*"]).split('/')[1]

    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleVisibilityOption = this.handleVisibilityOption.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleReplyButton = this.handleReplyButton.bind(this);    
    this.handleValidationComment = this.handleValidationComment.bind(this);  
    this.handleAddComment = this.handleAddComment.bind(this);  
    this.handleChangeDesc = this.handleChangeDesc.bind(this);  
    this.handleChangeTitle = this.handleChangeTitle.bind(this);  
    this.handleSaveButton = this.handleSaveButton.bind(this);  
    this.handleLikeButton = this.handleLikeButton.bind(this);  
    this.handleBlockButton = this.handleBlockButton.bind(this);  
    this.handleRemoveButton = this.handleRemoveButton.bind(this);



  }

  async componentWillMount() {
    try{
      //setting userinfo
      await this.setState({username:this.props.user.username, status:this.props.user.status, userUUID:this.props.user.userUUID})
      //get video details
      await this.props.videoDetailsAction(this.state.video.shortId)
      await this.props.videoCommentsAction(this.state.video.shortId)
     // Get engaged user
      await this.props.videoEngagedAction(this.state.video.shortId, this.state.video.userUUID)
      await this.props.videoAnalyticsAction(this.state.video.shortId)

      
      this.setState({
        videoTitle: this.props.video.videoTitle,
        videoDesc: this.props.video.videoDesc,
        visibility:this.props.video.visibility,
        shortUrlId: this.props.video.shortUrlId,
        isEngaged: this.props.engaged.isEngaged,
        comments:this.props.comments,
        analytics:this.props.analytics[0][0]
      });
     
  }
  catch(error)
  {

  }

 
  
    // Show video page when rendered but not yet built
    // Show video when it is being rendered
     fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=checkSetEmailCompletion&shortId=${this.state.shortId}`)
    .then(response => response.json())
    .then(data => {
      
      // Remove rendering page
      // if(data) {
        console.log(data);
        var videoPageData = {
          videopath: '',
          applicationName:'',
          applicationDisplayName:'',
          createdBy:data[0].createdBy,
          username:data[0].username,
          createdOn:data[0].createdOn,
          thumbnail:''
        }
    
        switch (data[0].applicationId) {
          case 1:
            videoPageData.applicationName = 'videoscribe';
            videoPageData.applicationDisplayName = 'VideoScribe';
            break;
          case 2:
            videoPageData.applicationName = 'tawe';
            videoPageData.applicationDisplayName = 'Tawe';
          break;
          case 3:
            videoPageData.applicationName = 'storypix';
            videoPageData.applicationDisplayName = 'StoryPix';
          break;
          case 4:
            videoPageData.applicationName = 'videoscribe-cloud';
            videoPageData.applicationDisplayName = 'FunScribe';
          break;
        
          default:
            break;
        }
        
        data.forEach(video => {
          if( video.formatId === 6) 
            videoPageData.videopath = video.path;
          else 
            videoPageData.thumbnail = video.path;
        });
        console.log(videoPageData);
    
        this.setState({
          isRendered: true,
          video: videoPageData
        });

    })


  }


async handleSaveButton(event) {
    event.preventDefault();

    var payload = {
      "shortId": `${this.state.shortId}`,
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
    const content = await rawResponse.json();
    
    this.setState({isEditing:false});
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

  // handle removing of the video
  handleRemoveButton(event) {
    event.preventDefault();
    const isVideoDeleted = true;
    
    
    confirmAlert({
      title: 'sho.co says',
      message: 'Are you sure you wish to remove this video?',
      buttons: [
        {
          label: 'Yes',
           onClick: () =>  fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=blockShortUrl&shortUrlId=${this.state.shortUrlId}`)
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

  // handle adding a comment
  async handleAddComment (event, commentParent) {

    console.log(event.target)
    var payload = {
      "shortId": `${this.state.shortId}`,
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
  const content = await rawResponse.json();

  // Get comments
  const rawResponseComments = await fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getComments&shortUrl=${this.state.shortId}&orderBy=asc`);
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

        case (event.target.value.length == 0): 
        this.setState({mainCommentError: null,
        mainAddCommentDisabled: true});
        break;

        case (event.target.value.length < 10): 
        this.setState({mainCommentError: 'Your comment is too short, please type a longer message',
        mainAddCommentDisabled: true});
        break;

        case (event.target.value.length >= 50):
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

        case (event.target.value.length == 0): 
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

  // handle event on likes
  async handleLikeButton(event) {
    event.preventDefault();

    var toggleEngaged = !this.state.isEngaged;
    var payload = {
      "shortId": `${this.state.shortId}`,
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
    const content = await rawResponse.json();
    
  }

  handleChangeDesc(event) {
    event.preventDefault();
    this.setState({videoDesc: event.target.value})
  }

  handleChangeTitle(event) {
    event.preventDefault();
    this.setState({videoTitle: event.target.value})
  }
  


  handleOrder(param, event) {
    event.preventDefault();
    this.setState({orderBy: param});
    console.log(param);
  }

  handleEditButton(event){
    
    event.preventDefault();
    this.setState({isEditing:true});
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

  async handleVisibilityOption(event) {

    event.preventDefault();
    console.log(event.target.value);

    var payload = {
      "shortId": `${this.state.shortId}`,
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
    const content = await rawResponse.json();
    this.setState({visibility: payload.visibility});
  }

 handleFocus = (event) => event.target.select();

  render() {
    const objectComments = this.state.comments.filter(comment => comment.id)
    const commentLength = objectComments.length;
    const video = this.state.video;
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
          <VideoPlayer playBtn={playBtn} video ={this.state.video} handleVideoPlay = {this.handleVideoPlay}/>

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
                      <button type="submit" className="btn btn-default btn-edit" id="edit-btn" onClick={this.handleEditButton}>Edit</button>
                      <p className="upload-info">Created with 
                      <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                      by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                      <span className="upload-date"><TimeAgo date={video.createdOn} /></span></p>    
                      <div className="desc">
                        {this.state.videoDesc}
                        <a className="show-more">Show more</a>
                      </div>
                    </div>  
                  )}
                  
                  <div className="social-surround">
                      <p>Share</p>
                      <ul className="social-links">
                          <li className="first">
                              <a 
                              // href={`https://www.facebook.com/sharer.php?u=+${windowGlobal.location.href}`} 
                              rel="nofollow" data-site="facebook" className="share-social share-fb prevent-default" target="_blank" title="Share this sho on Facebook"><span className="icon">Share</span></a>
                          </li>
                          <li>
                              <a 
                              // href={`http://twitter.com/intent/tweet?url=${windowGlobal.location.href}&amp;via=SparkolHQ`} 
                              rel="nofollow" data-site="twitter" target="_blank" className="share-social share-twitter prevent-default" title="Share this sho on Twitter"><span className="icon">Tweet</span></a>
                          </li>
                          <li>
                              <a 
                              // href={`mailto:?to=&Subject=Share%20a%20sho,&body=${windowGlobal.location.href}`} 
                              data-site="email" className="share-social share-email" target="_self" title="Share this sho by Email"><span className="icon">Email</span></a>
                          </li>
                      </ul>
                      <ul className="action-links">
                          <li><button className="eng-link active" onClick={this.handleLikeButton}>Like<span className={"icon " + (this.state.isEngaged ? 'active' : '') }></span></button></li>
                          <li className="last"><button className="report-link" onClick={this.handleBlockButton}>Report<span className={"icon " + (this.state.isBlocked ? 'active' : '') }></span></button></li>
                      </ul>
                  </div>

                  <div className="input-surround" id="url">
                      <label htmlFor="url-input">Link</label>
                      <input id="url-input" type="text" value={`http://shoco-sparkol.unosoft.ph/app/${this.state.shortId}`} onFocus={this.handleFocus} onClick={this.handleFocus}  readOnly/>
                  </div>
                  <div className="input-surround" id="embed-code">
                      <label htmlFor="embed-code-input">Embed code</label>
                      <input id="embed-code-input" type="text" value={"<iframe width='560' height='360' src='"+`http://shoco-sparkol.unosoft.ph/app/${this.state.shortId}`+"' frameborder='0' allowfullscreen></iframe>"} onFocus={this.handleFocus} onClick={this.handleFocus} readOnly/>
                  </div>

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
                  <p className="remove-video"><a className="confirmation" onClick={this.handleRemoveButton}>Remove video</a></p>
              </div>
              
          </div>
        </div>
        <VideoComments status = {this.props.user.status} data={this.state} 
             commentLength={commentLength} 
             objectComments={{objectComments}}
             handleOrder={this.handleOrder}  
             handleValidationComment={this.handleValidationComment} 
             handleAddComment={this.handleAddComment} 
             handleReplyButton={this.handleReplyButton}/>
          </div>
        </Layout>
      );
  }
}



const mapStateToProps = (state) => 
{ 
  
  return {
    user:state.userReducer,
    video:state.videoDetailsReducer,
    engaged:state.videoEngagedReducer,
    comments:state.videoCommentsReducer.comments[0],
    analytics:state.videoAnalyticsReducer.analytics,
  }
}

export default connect(mapStateToProps,{videoDetailsAction,videoEngagedAction,videoCommentsAction,videoAnalyticsAction})(DynamicRoute)