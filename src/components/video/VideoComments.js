import React from 'react'
import TimeAgo from 'react-timeago'
import { Link} from 'gatsby'


const VideoComments = (props) => { 
    
      const {objectComments} = props.objectComments

    

    return(

        <div className="videos" id="comments">
        <div className="container2">
              <div className="comment-section comments">
              <div className="comment-post">
                {(props.commentLength === 0)?(
                  <h2>{props.commentLength} comments</h2>
                ):(
                  <div>
                    <h2>{props.commentLength} comments of {props.commentLength}</h2>
                    <ul className="list-inline comment-sort" >
                      <li>
                        <a onClick={(evt) => props.handleOrder('oldest', evt)} className={  (props.data.orderBy ==='oldest' ? 'active' : '')}>Oldest </a>
                        |
                      </li>
                      <li className="last">
                        <a onClick={(evt) => props.handleOrder('newest', evt)} className={  (props.data.orderBy ==='newest' ? 'active' : '')}> Newest</a>
                      </li>
                    </ul>  
                  </div>
                )}
                
                {props.status ?(
                  <div>
                    <div className="comment-wrap">
                      <textarea id="main-AddComment" className={(props.data.mainAddCommentDisabled)? 'comment-input disabled' : 'comment-input'} value={props.data.comment} onChange={props.handleValidationComment}></textarea>
                      <span className="error-comment-input">{props.data.mainCommentError}</span>
                    </div>
                    <button id="comment-btn" 
                      className="main"
                      disabled = {(props.data.mainAddCommentDisabled)? "disabled" : ""}
                      onClick={props.handleAddComment}>Post</button>
                  </div>
                ):(
                  <div className="text-center notLoggedIn-message">
                    <p>You must <Link to="/app">log in</Link> or <Link to="/app">sign up</Link> to comment on this video</p>
                  </div>
                )}
              </div>
                
                <ul className="comment-list">
                  { props.data.orderBy === 'oldest' ? (
                      
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
                              
                              
                              {props.status ?( 
                                <span>|
                              <a className="reply" onClick={(evt) => props.handleReplyButton(comment.commentId, evt)}> Reply</a></span>                                     
                              ):('')}
                            </p>
                            {
                              props.data.openReply && props.data.currentReply === comment.commentId ? (
                                <div className="comment-post">
                                  <div className="comment-wrap">
                                  <textarea className={(props.data.replyAddCommentDisabled)? 'comment-input disabled' : 'comment-input'} value={props.data.commentReply} onChange={props.handleValidationComment}></textarea>
                                  <span className="error-comment-input">{props.data.replyCommentError}</span>
                                    {/* <span className="error-comment-input">Your comment is too short, please type a longer message</span>
                                    <span className="error-comment-input">Your comment is too long, please type a shorter message</span> */}
                                    {/* <span className="error ng-hide" ng-show="newCommentForm.failed">Your comment was not added, please try again</span> */}
                                  </div>
                                  <button id="comment-btn"
                                  disabled = {(props.data.replyAddCommentDisabled)? "disabled" : ""}
                                  onClick={(evt) => props.handleAddComment(evt, comment.commentId)}
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
                            {props.status ?( 
                             <span>|
                             <a className="reply" onClick={(evt) => props.handleReplyButton(comment.commentId, evt)}> Reply</a></span>                                     
                             ):('')}
                          </p>
                          {
                            props.data.openReply && props.data.currentReply === comment.commentId ? (
                              <div className="comment-post">
                                <div className="comment-wrap">
                                <textarea className={(props.data.replyAddCommentDisabled)? 'comment-input disabled' : 'comment-input'} value={props.data.commentReply} onChange={props.handleValidationComment}></textarea>
                                <span className="error-comment-input">{props.data.replyCommentError}</span>
                                  {/* <span className="error-comment-input">Your comment is too short, please type a longer message</span>
                                  <span className="error-comment-input">Your comment is too long, please type a shorter message</span> */}
                                  {/* <span className="error ng-hide" ng-show="newCommentForm.failed">Your comment was not added, please try again</span> */}
                                </div>
                                <button id="comment-btn"
                                disabled = {(props.data.replyAddCommentDisabled)? "disabled" : ""}
                                onClick={(evt) => props.handleAddComment(evt, comment.commentId)}
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
    );

}
export default VideoComments