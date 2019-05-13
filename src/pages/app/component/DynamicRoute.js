import React from "react"
import { Link } from 'gatsby';
import Layout from '../../../components/Layout';
import TimeAgo from 'react-timeago'
import { Auth } from 'aws-amplify';

const windowGlobal = typeof window !== 'undefined' && window

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
      openReply: false
    }

    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleVisibilityOption = this.handleVisibilityOption.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleOrder = this.handleOrder.bind(this);
    this.handleReplyButton = this.handleReplyButton.bind(this);    
    this.handleValidationComment = this.handleValidationComment.bind(this);  
    this.handleAddComment = this.handleAddComment.bind(this);  
  }

  componentWillMount() {

    // after checking the video is isRendered
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
        this.setState({user: user});
        // insert getting comments
    })
    .catch(err => {
        console.log(err);        
    });

    // Show video page when rendered but not yet built
    // Show video when it is being rendered
    fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=checkSetEmailCompletion&shortId=${this.props.shortId}`)
    .then(response => response.json())
    .then(data => {
      if(data) {
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

        // Get comments
        fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=getComments&shortUrl=${this.props.shortId}&orderBy=asc`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.setState({comments: data[0]})

          //Arrange comments
        });
      } else {
        this.setState({
          isRendered: false,
          message: 'Hang in there. Your video will be ready soon. '
        });
      }

    })

    // Redirect to site static page is ready
      // fetch
  }

  // handle saving title and description
  handleSaveButton(event) {
    event.preventDefault();
    // update on the video
    fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/
    default/test-api`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Success');
    });

  }

  // handle clicking the block flag
  handleBlockButton(event) {
    event.preventDefault();
    // applying 
    fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/
    default/test-api?api=blockShortUrl&shortUrlId=${this.state.video.shortUrlId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Success');
    });
  }

  // handle removing of the video
  handleRemoveButton(event) {
    event.preventDefault();
      // applying 
    fetch(`https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/
    default/test-api?api=deleteShortUrl&shortUrl=${this.props.shortId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Success');
    });
  }

  // handle adding a comment
  async handleAddComment (event, commentParent) {
    console.log(event.target.className)
    console.log(event.target)
    let commentVariableId = Math.random().toString(36).substring(7);
   
    // after effect
    if(event.target.className === "main") {
      this.setState({ comments: this.state.comments.concat({
        comment: this.state.comment,
        commentId: commentVariableId,
        commentid: commentVariableId,
        conversationId: this.props.shortId,
        date: new Date(),
        id: 2,
        parent: null,
        shortUrlId: 14776337,
        uid: this.state.user.attributes.sub,
        userName: this.state.user.username
      }),
      comment: '',
      mainAddCommentDisabled: true,
      mainCommentError: null,
     })
    } else {
      this.setState({ comments: this.state.comments.concat({
        comment: this.state.commentReply,
        commentId: commentVariableId,
        commentid: commentVariableId,
        conversationId: this.props.shortId,
        date: new Date(),
        id: 2,
        parent: commentParent,
        shortUrlId: 14776337,
        uid: this.state.user.attributes.sub,
        userName: this.state.user.username
      }),
      commentReply: '',
      replyAddCommentDisabled: true,
      replyCommentError: null,
      openReply: false
     })
    }
    // add difference for parent and children
    // var payload = {
    //   "shortId": `${this.props.shortId}`,
    //   "parent": null,
    //   "username":  `${this.state.user.username}`,
    //   "comment": `${this.state.comment}`,
    //   "uid": `${this.state.user.attributes.sub}`
    // };

  //  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  //  const rawResponse = await fetch(proxyurl+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=addComment', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(payload)
  //   });
    // const content = await rawResponse.json();
    
    //after success full commenting and updating the comment list 

    // this.setState({ comments: this.state.comments.concat({
    //   comment: "Sweet video",
    //   commentId: "8e60d1f0-0df4-11e6-9455-1980901455fa",
    //   commentid: "8e60d1f0-0df4-11e6-9455-1980901455fa",
    //   conversationId: "9CI",
    //   date: "2016-04-29T10:24:30.000Z",
    //   id: 2,
    //   parent: null,
    //   shortUrlId: 14776337,
    //   uid: "5000009",
    //   userName: "James Fitzgerald"
    // }) })

    // var els = document.getElementsByClassName('search-input');
    // Array.from(els).forEach((el) => {
    //     el.value = '';
    //     el.placeholder = 'Video Page Added'
    // });
    // console.log(document.getElementsByClassName('search-input'));
    
    // console.log(content);
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
  handleLikeButton(event) {
    event.preventDefault();
  }


  handleOrder(param, event) {
    event.preventDefault();
    this.setState({orderBy: param});
    console.log(param);
  }

  // handle changing of visibility



  handleEditButton(event){
    
    event.preventDefault();
    this.setState({isEditing:!this.state.isEditing});
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

  handleVisibilityOption(event) {

    event.preventDefault();
    console.log(event.target.value);
  }

 handleFocus = (event) => event.target.select();

  render() {
    const objectComments = this.state.comments.filter(comment => comment.id)
    const commentLength = objectComments.length;
    const video = this.state.video;

      return (
        <Layout>
          <div className="videoPage">
              <div className="intro">
                  {/* <img src={video.thumbnail || ''} alt={video.shortId || ''} /> */}
                  <div className="container text-center">

                  {this.state.isRendered ? (
                    <video width="640" height="480" controls>
                        <source src={video.videopath || ''} type="video/mp4"/>
                    Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div>
                      <h1>Publishing...</h1>
                      <p>{this.state.message}</p>
                    </div>
                  )}
                      
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
                            <input type="text" className="form-control" id="video-title" placeholder="" maxLength="100"/>
                            <button type="submit" className="btn btn-default btn-save" id="save-btn"  onClick={this.handleEditButton}>Save</button>
                        </div>
                        <p className="upload-info">Created with 
                        <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                        
                        
                            by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                        
                        <span className="upload-date"><TimeAgo date={video.createdOn} /></span></p>
                        
                            <div className="form-group">
                                <label htmlFor="videoDesc" className="sr-only">Video description</label>
                                <textarea rows="5" className="form-control" id="video-desc" maxLength="1000"></textarea>
                            </div>
                    </form>
                </div>
                    
                  ):(
                    <div id="video-detail-static">
                      <h1></h1>
                      <button type="submit" className="btn btn-default btn-edit" id="edit-btn" onClick={this.handleEditButton}>Edit</button>
                      <p className="upload-info">Created with 
                      <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                      by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                      <span className="upload-date"><TimeAgo date={video.createdOn} /></span></p>    
                      <div className="desc">
                        <a className="show-more" href="#">Show more</a>
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
                          <li><button className="eng-link active" data-url="1BMAF">Like<span className="icon"></span></button></li>
                          <li className="last"><button className="report-link" data-url="1BMAF">Report<span className="icon"></span></button></li>
                      </ul>
                  </div>

                  <div className="input-surround" id="url">
                      <label htmlFor="url-input">Link</label>
                      <input id="url-input" type="text" value={`http://shoco-sparkol.unosoft.ph/app/${this.props.shortId}`} onFocus={this.handleFocus} onClick={this.handleFocus}  readOnly/>
                  </div>
                  <div className="input-surround" id="embed-code">
                      <label htmlFor="embed-code-input">Embed code</label>
                      <input id="embed-code-input" type="text" value={"<iframe width='560' height='360' src='"+`http://shoco-sparkol.unosoft.ph/app/${this.props.shortId}`+"' frameborder='0' allowfullscreen></iframe>"} onFocus={this.handleFocus} onClick={this.handleFocus} readOnly/>
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
                      <select id="visibility-drop-down">
                          <option value="public" defaultValue="">Public</option>
                          <option value="unlisted">Unlisted</option>
                          <option value="private">Private</option>
                      </select>
                  </div>     
                  <p className="remove-video"><a href="#" className="confirmation">Remove video</a></p>
              </div>
              
          </div>
        </div>
              <div className="videos" id="comments">
                <div className="container2">
                  {this.state.user ? (
                      <div className="comment-section comments">
                      <div className="comment-post">
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
                        
                        <div className="comment-wrap">
                          <textarea id="main-AddComment" className={(this.state.mainAddCommentDisabled)? 'comment-input disabled' : 'comment-input'} value={this.state.comment} onChange={this.handleValidationComment}></textarea>
                           <span className="error-comment-input">{this.state.mainCommentError}</span>
{/*                          <span className="error-comment-input">Your comment is too long, please type a shorter message</span> */}
                          {/* <span className="error ng-hide" ng-show="newCommentForm.failed">Your comment was not added, please try again</span> */}
                        </div>
                        <button id="comment-btn" 
                          className="main"
                          disabled = {(this.state.mainAddCommentDisabled)? "disabled" : ""}
                          onClick={this.handleAddComment}
                          >Post</button>
                      
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
                                      {/* Only when logged In */}
                                      | 
                                      <a className="reply" onClick={(evt) => this.handleReplyButton(comment.commentId, evt)}> Reply</a>                                     
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
                                    | 
                                    <a className="reply" onClick={(evt) => this.handleReplyButton(comment.commentId, evt)}> Reply</a>
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
                    ):(
                      <div className="text-center">
                        <p>You must <Link to="/">log in</Link> or <Link to="/">sign up</Link> to comment on this video</p>
                        <h2>{commentLength} comments</h2>
                      </div>
                    )}
                </div>
                  
              </div>
          </div>
        </Layout>
      );
  }
}

export default DynamicRoute