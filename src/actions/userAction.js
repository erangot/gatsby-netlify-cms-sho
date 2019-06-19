import Amplify, { Auth } from 'aws-amplify';
import aws_exports from '../aws-exports'; // if you are using Amplify CLI 







export const signIn =  () => async (dispatch) => 
{
    Amplify.configure(aws_exports);
     const response = await  Auth.currentAuthenticatedUser({
          bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {

        return user = { 
          username:user.username,
          userStatus:true
        }
      })
      .catch(err => {
          console.log(err);
          return err = { 
            username:"",
            userStatus:false
          }
      });

       console.log(response)

   dispatch({
       type:'SIGN_IN', 
       payload:{status:response.userStatus, username:response.username}
   });
}


export const signOut = () => async (dispatch) => {

  const response = await Auth.signOut().then(() => {
  
    }).catch(e => {
    console.log(e);

  });
    console.log(response)
   dispatch({
    type:"SIGN_OUT", 
    payload:{status:false,username:""}
  })
}




