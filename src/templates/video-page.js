import React from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/Layout'
import TimeAgo from 'react-timeago'
import Amplify from 'aws-amplify'
import { resolve } from 'url'




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
            isLoggedIn: false,
            userUUID:''
        }

        if(process.env.NODE_ENV == 'development') 
          this.state.urlLocation = `http://localhost:8000/${this.state.video.shortId}`
        else 
          this.state.urlLocation = `http://shoco-sparkol.unosoft.ph/${this.state.video.shortId}`

        this.handleOrder = this.handleOrder.bind(this);
        this.handleReplyButton = this.handleReplyButton.bind(this);    
        this.handleValidationComment = this.handleValidationComment.bind(this);  
        this.handleAddComment = this.handleAddComment.bind(this);  
        this.handleLikeButton = this.handleLikeButton.bind(this);  
        this.handleBlockButton = this.handleBlockButton.bind(this);  
    }



    async componentWillMount() {

        await Amplify.Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          }).then(user => {
              
              this.setState({
                user: user,
                isLoggedIn: true,
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
                }) .catch(err => {

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
 
    }

    // handle event on likes
  async handleLikeButton(event) {
    event.preventDefault();


    if(this.state.isLoggedIn) {
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
  const content = await rawResponse.json();

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


    render() {

        let video = this.state.video;
        const objectComments = this.state.comments.filter(comment => comment.id)
        const commentLength = objectComments.length;

        return (
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
                        <a className="show-more">Show more</a>
                      </div>
                    </div>  
                  )}
                  
                  <div className="social-surround">
                      <p>Share</p>
                      <ul className="social-links">
                          <li className="first">
                              <a 
                              href={`https://www.facebook.com/sharer.php?u=+${this.state.urlLocation}`} 
                              rel="nofollow" data-site="facebook" className="share-social share-fb prevent-default" target="_blank" title="Share this sho on Facebook"><span className="icon">Share</span></a>
                          </li>
                          <li>
                              <a 
                              href={`http://twitter.com/intent/tweet?url=${this.state.urlLocation}&amp;via=SparkolHQ`} 
                              rel="nofollow" data-site="twitter" target="_blank" className="share-social share-twitter prevent-default" title="Share this sho on Twitter"><span className="icon">Tweet</span></a>
                          </li>
                          <li>
                              <a 
                              href={`mailto:?to=&Subject=Share%20a%20sho,&body=${this.state.urlLocation}`} 
                              data-site="email" className="share-social share-email" target="_self" title="Share this sho by Email"><span className="icon">Email</span></a>
                          </li>
                      </ul>
                      <ul className="action-links">
                          <li><button className="eng-link active" onClick={this.handleLikeButton} disabled>
                           {this.state.isLoggedIn ? (''):(<span className="login-required-overlay"><span> Please login to rate </span></span>)}
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
                      <input id="embed-code-input" type="text" value={"<iframe width='560' height='360' src='"+`http://shoco-sparkol.unosoft.ph/app/${this.state.shortId}`+"' frameborder='0' allowfullscreen></iframe>"} onFocus={this.handleFocus} onClick={this.handleFocus} readOnly/>
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
                          <p className="remove-video"><a className="confirmation" onClick={this.handleRemoveButton}>Remove video</a></p>
                        </div>):('') }
                 
              </div>
              
          </div>
        </div>

                      
                      
              <div className="videos" id="comments">
                <div className="container2">
                      <div className="comment-section comments">
                      <div className="comment-post">
                        {(commentLength == 0)?(
                          <h2>{commentLength} comments</h2>
                        ):(
                          <div>
                            <h2>{commentLength} comments of {commentLength}</h2>
                            <ul className="list-inline comment-sort" >
                              <li>
                                <a onClick={(evt) => this.handleOrder('oldest', evt)} className={  (this.state.orderBy ==='oldest' ? 'active' : '')}>Oldest </a>
                                |
                              </li>
                              <li className="last">
                                <a onClick={(evt) => this.handleOrder('newest', evt)} className={  (this.state.orderBy ==='newest' ? 'active' : '')}> Newest</a>
                              </li>
                            </ul>  
                          </div>
                        )}
                        
                        {this.state.isLoggedIn ?(
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
                                      
                                      |
                                      {this.state.isLoggedIn ?( 
                                      <a className="reply" onClick={(evt) => this.handleReplyButton(comment.commentId, evt)}> Reply</a>                                     
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
                                    {this.state.isLoggedIn ?( 
                                      <a className="reply" onClick={(evt) => this.handleReplyButton(comment.commentId, evt)}> Reply</a>                                     
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
export default videoPage