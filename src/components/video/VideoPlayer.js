  import React from 'react'


//Component for Video Skin or Player

  const VideoPlayer = (props) => { 
   
  const {video, playBtn,handleVideoPlay} = props

  return ( <div className="intro">
  {/* <img src={video.thumbnail || ''} alt={video.shortId || ''} /> */}
  <div className="container text-center">
      <div className="videoscribe-skin " onClick={handleVideoPlay}>
        <video className="vjs-tech"
          id="vid"
          preload="auto" width="640px" height="480px"
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
        </div>
      </div>
  </div>
  <span className="icwrap2">
      <span className="ic3"></span>
      <span className="ic2"></span>
      <span className="ic1"></span>
  </span>
  </div>
  );
  }

  export default VideoPlayer