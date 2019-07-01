import React from 'react'
import { Link, navigate } from 'gatsby'
import Layout from '../components/Layout'
import TimeAgo from 'react-timeago'
import Amplify from 'aws-amplify'
import { resolve } from 'url'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import  VideoPlayer from '../components/video/VideoPlayer'
import  VideoDetails from '../components/video/VideoDetails'
import  VideoComments from '../components/video/VideoComments'


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

        this.handleEditButton = this.handleEditButton.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);  
        this.handleChangeTitle = this.handleChangeTitle.bind(this);  
        this.handleSaveButton = this.handleSaveButton.bind(this);  

        this.handleFocus = this.handleFocus.bind(this);

        this.handleRemoveButton = this.handleRemoveButton.bind(this);

        this.handleVisibilityOption = this.handleVisibilityOption.bind(this);

        this.handleVideoPlay = this.handleVideoPlay.bind(this);

        this.handleSharerAnalytics = this.handleSharerAnalytics.bind(this);
    }

    componentDidMount() {

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


    if(this.state.isLoggedIn) {
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
      const content = await rawResponse.json();

      // Create analytics to be a function
      var payload = {
        "shortId": `${this.state.video.shortId}`,
        "eventType": `${toggleEngaged?'engaged':'disengaged'}`,
        "ownerId": `${this.state.user.attributes.sub}`
      };
  
     console.log(payload);
     const proxyurl1 = "https://cors-anywhere.herokuapp.com/";
     const rawResponse1 = await fetch(proxyurl1+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=createAnalyticEntry', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    const content1 = await rawResponse1.json();


      
    } else {
      navigate('/app');
    }
  }

   async handleSharerAnalytics ( event ) {
    event.preventDefault(); 
    
    var payload = {};
    switch (event.target.innerText) {
      case "Share":
        payload = {
          "shortId": `${this.state.video.shortId}`,
          "eventType": "shared-facebook",
          "ownerId": `${this.state.user.attributes.sub}`
        };
        break;
      case "Tweet":
        payload = {
          "shortId": `${this.state.video.shortId}`,
          "eventType": "shared-twitter",
          "ownerId": `${this.state.user.attributes.sub}`
        };
        break;
      case "Email":
        payload = {
          "shortId": `${this.state.video.shortId}`,
          "eventType": "shared-email",
          "ownerId": `${this.state.user.attributes.sub}`
        };
      break;
    
      default:
        break;
    }
    console.log(payload);
    const proxyurl1 = "https://cors-anywhere.herokuapp.com/";
    const rawResponse1 = await fetch(proxyurl1+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=createAnalyticEntry', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(payload)
     });
   const content1 =  await rawResponse1.json();
   console.log(content1);
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
    
      // Create analytics to be a function
      var payload = {
        "shortId": `${this.state.video.shortId}`,
        "eventType": `added-comment`,
        "ownerId": `${this.state.user.attributes.sub}`
      };
  
     console.log(payload);
     const proxyurl1 = "https://cors-anywhere.herokuapp.com/";
     const rawResponse1 = await fetch(proxyurl1+'https://cors-anywhere.herokuapp.com/https://ydkmdqhm84.execute-api.us-east-2.amazonaws.com/default/test-api?api=createAnalyticEntry', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    const content1 = await rawResponse1.json();
    console.log(content1);

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
    const content = await rawResponse.json();
    
    this.setState({isEditing:false});
  }

  handleFocus = (event) => event.target.select();

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
    const content = await rawResponse.json();
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
    
    if(smallBtn.classList[2] == "vjs-paused"){
      smallBtn.classList.remove("vjs-paused");
      smallBtn.classList.add("vjs-playing");
    }else{
      smallBtn.classList.remove("vjs-playing");
      smallBtn.classList.add("vjs-paused");
    }
    this.setState({VideoPlaying: stat});

  }



  
    render() {
      
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

             <VideoPlayer playBtn={playBtn} video ={this.state.video} handleVideoPlay = {this.handleVideoPlay}/>
             <VideoDetails data={this.state} handleSharerAnalytics={this.handleSharerAnalytics} handleLikeButton={this.handleLikeButton} handleBlockButton ={this.handleBlockButton} />
             <VideoComments data={this.state} 
             commentLength={commentLength} 
             objectComments={{objectComments}}
             handleOrder={this.handleOrder}  
             handleValidationComment={this.handleValidationComment} 
             handleAddComment={this.handleAddComment} 
             handleReplyButton={this.handleReplyButton}/>
          
            </div>
            </Layout>
        )
    }
}
export default videoPage