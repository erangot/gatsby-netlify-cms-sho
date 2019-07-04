import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports'; // if you are using Amplify CLI 


export const signIn =  () => async (dispatch) => 
{  

   //calling the ampliy to set the current user status and username
    Amplify.configure(aws_exports);
     const response = await  Auth.currentAuthenticatedUser({
          bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {
        //returning the value to response async
        return user = { 
          username:user.username,
          userStatus:true,
          userUUID:user.attributes.sub
        }
      })
      .catch(err => {
          console.log(err);
          return err = { 
            username:"",
            userStatus:false,
            userUUID:""
          }
      });
   dispatch({
       type:'SIGN_IN', 
       payload:{status:response.userStatus, username:response.username, userUUID:response.userUUID}
   });
}


export const signOut = () => async (dispatch) => {
  
  await Auth.signOut().then(() => {
    }).catch(e => {
    console.log(e);

  });
 
   dispatch({
    type:"SIGN_OUT", 
    payload:{status:false,username:""}
  })
}




