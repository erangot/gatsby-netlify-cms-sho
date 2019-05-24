import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import TimeAgo from 'react-timeago'
import Amplify from 'aws-amplify';
import { resolve } from 'url';

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
        }

        this.handleOrder = this.handleOrder.bind(this);
        this.handleReplyButton = this.handleReplyButton.bind(this);    
        this.handleValidationComment = this.handleValidationComment.bind(this);  
        this.handleAddComment = this.handleAddComment.bind(this);  
    }

    async componentWillMount() {

        await Amplify.Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          }).then(user => {
              
              this.setState({
                user: user,
                isLoggedIn: true
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
                    <div className="search">
                        <div className="container text-left">
        
                            <p className="upload-info">Created with 
                            <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                            by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                            <span className="upload-date"><TimeAgo date={video.createdOn} /></span>
                            </p>                     
        
                        </div>
                        <span className="icwrap3">
                            <span className="ic1"></span>
                            <span className="ic2"></span>
                            <span className="ic3"></span>
                        </span>
                    </div>
                    <div className="videos" id="comments">
                <div className="container2">
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