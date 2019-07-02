 import React from 'react'
 import TimeAgo from 'react-timeago'
 import { Link} from 'gatsby'

const VideoDetails = (props) =>
 { 
            

       const {video} = props.data
     

         return( 
              <div className="container1 dynamic-videopage">
              <div className="row">
                <div className="stats col-sm-7">
                {props.data.isEditing ? (
                  <div id="video-detail-editable">
                  <form>
                      <div className="form-group">
                          <label htmlFor="title" className="sr-only">Video title</label>
                          <input type="text" className="form-control" id="video-title" placeholder="" value={props.data.videoTitle} onChange={props.handleChangeTitle}/>
                          <button type="submit" className="btn btn-default btn-save" id="save-btn"  onClick={props.handleSaveButton}>Save</button>
                      </div>
                      <p className="upload-info">Created with 
                      <Link to={"/application/"+video.applicationame || ''}> {video.applicationDisplayName || ''} </Link>
                      
                      
                          by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                      
                      <span className="upload-date"><TimeAgo date={video.createdOn} /></span></p>
                      
                          <div className="form-group">
                              <label htmlFor="videoDesc" className="sr-only">Video description</label>
                              <textarea rows="5" className="form-control" id="video-desc" value={props.data.videoDesc} onChange={props.handleChangeDesc}></textarea>
                          </div>
                  </form>
               </div>
                  
                ):(
                  <div id="video-detail-static">
                    <h1>{props.data.videoTitle}</h1>
                    {(props.data.video.createdBy === props.data.userUUID)?
                    (<button type="submit" className="btn btn-default btn-edit" id="edit-btn" onClick={props.handleEditButton}>Edit</button>):('') }
                    
                    <p className="upload-info">Created with 
                    <Link to={"/application/"+video.applicationName || ''}> {video.applicationDisplayName || ''} </Link>
                    by <Link to={"/user/"+video.createdBy || ''}> {video.username || ''} </Link>
                    <span className="upload-date"><TimeAgo date={video.createdOn} /></span></p>    
                    <div className="desc">
                      {props.data.videoDesc}
                      <a className="show-more">Show more</a>
                    </div>
                  </div>  
                )}
                
                <div className="social-surround">
                    <p>Share</p>
                    <ul className="social-links">
                        <li className="first">
                            <a 
                            href={`https://www.facebook.com/sharer.php?u=+${encodeURIComponent(props.data.urlLocation)}`} 
                            onClick={props.handleSharerAnalytics}
                            rel="nofollow" data-site="facebook" className="share-social share-fb prevent-default" target="_blank" title="Share this sho on Facebook"><span className="icon" name="facebook">Share</span></a>
                        </li>
                        <li>
                            <a 
                            href={`http://twitter.com/intent/tweet?url=${props.data.urlLocation}&amp;via=SparkolHQ`} 
                            onClick={props.handleSharerAnalytics}
                            rel="nofollow" data-site="twitter" target="_blank" className="share-social share-twitter prevent-default" title="Share this sho on Twitter"><span className="icon" name="twitter">Tweet</span></a>
                        </li>
                        <li>
                            <a 
                            href={`mailto:?to=&Subject=Share%20a%20sho,&body=${props.data.urlLocation}`} 
                            onClick={props.handleSharerAnalytics}
                            data-site="email" className="share-social share-email" target="_self" title="Share this sho by Email"><span className="icon" name="email">Email</span></a>
                        </li>
                    </ul>
                    <ul className="action-links">
                        <li><button className="eng-link active" onClick={props.handleLikeButton}>
                         {props.status ? (''):(<span className="login-required-overlay"><span> Please login to rate </span></span>)}
                          Like<span className={"icon " + (props.data.isEngaged === 1 ? 'active' : '') }></span></button></li>
                        <li className="last"><button className="report-link" onClick={props.handleBlockButton}>Report<span className={"icon " + (props.data.isBlocked ? 'active' : '') }></span></button></li>
                    </ul>
                </div>

                <div className="input-surround" id="url">
                    <label htmlFor="url-input">Link</label>
                    <input id="url-input" type="text" value={`http://shoco-sparkol.unosoft.ph/app/${props.data.shortId}`} onFocus={props.handleFocus} onClick={props.handleFocus}  readOnly/>
                </div>
                <div className="input-surround" id="embed-code">
                    <label htmlFor="embed-code-input">Embed code</label>
                    <input id="embed-code-input" type="text" value={"<iframe width='560' height='360' src='"+`http://shoco-sparkol.unosoft.ph/app/${props.data.shortId}`+"' frameborder='0' allowfullscreen></iframe>"} onFocus={props.handleFocus} onClick={props.handleFocus} readOnly/>
                </div>
                {(props.data.video.createdBy === props.data.userUUID)?
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
                            <select id="visibility-drop-down" onChange={props.handleVisibilityOption} value={props.data.visibility}>
                                <option value="public">Public</option>
                                <option value="unlisted">Unlisted</option>
                                <option value="private">Private</option>
                            </select>
                        </div>     
                        <p className="remove-video"><a className="confirmation" onClick={props.handleRemoveButton}>Remove video</a></p>
                      </div>):('') }
               
            </div>
            <div className="engagement col-sm-5">
                <div className="wheel">
                  <img src="https://sho.co/assets/images/engagement_wheel.png" alt="Sho.co engagment wheel" className="img-padding img-responsive" width="200" height="200"/>
                </div>
                <div className="legend eng-stats">
                  <ul>
                    <li >{Math.ceil(props.data.analytics.engaged/props.data.analytics.score)}%<br /><span className="stat-category">Likes</span></li>
                    <li >{Math.ceil(props.data.analytics.repeatPlays/props.data.analytics.score)}%<br /><span className="stat-category">Repeats</span></li>
                    <li >{Math.ceil(props.data.analytics.fullScreens/props.data.analytics.score)}%<br /><span className="stat-category">Fullscreens</span></li>
                    <li >{Math.ceil(props.data.analytics.shares/props.data.analytics.score)}%<br /><span className="stat-category">Shares</span></li>
                    <li >{Math.ceil(props.data.analytics.finished/props.data.analytics.score)}%<br /><span className="stat-category">Completes</span></li>
                  </ul>
                </div>
                <ul className="video-stats">
                  <li className="views"><span className="stat">{props.data.analytics.score}</span> <span className="stat-category">views</span></li>
                </ul>
            </div>
            
        </div>
      </div> 

     )
   
 }
 export default VideoDetails