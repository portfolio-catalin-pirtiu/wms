// import { GooglePersonalizedLoginButton } from 'react-google-identity-gsi';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GooglePersonalizedLoginButton } from 'react-google-identity-gsi';
import jwtDecode from 'jwt-decode';

// export default function LoginGoogle() {

//   async function onUserAuthenticatedWithGoogle({credential}: {[key: string]: string}) {
//     const encodedUserProfile: {[key: string]: string} = {
//       encodedUserProfile: credential
//     }

//     try {
//       const request = await fetch('http://localhost:4000/authentication/google', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'text/xml'
//         },
//         body: JSON.stringify(encodedUserProfile)
//       })
//     } catch(e) {

//     }
//     console.log('logged in user -> data');
//   }

//   return (
//     <GooglePersonalizedLoginButton
//       clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
//       buttonCustomization={buttonCustomization}
//       onUserAuthenticationSucceeded={onUserAuthenticatedWithGoogle}
//     />
//   );
// }

export default function LoginWithGoogle() {
  function handleSuccessLogin() {}

  function handleRejectLogin() {}

  function handleGoogleButtonSuccessLogin() {

  }

  const buttonCustomization = {
    locale: 'en',
    text: 'continue_width',
    size: 'large',
    width: '300',
  };
  return (
    <LoginSocialGoogle
      isOnlyGetToken
      client_id={process.env.REACT_APP_GG_APP_ID as string}
      onResolve={handleSuccessLogin}
      onReject={handleRejectLogin}
    >
      <GooglePersonalizedLoginButton
        clientId={process.env.REACT_APP_GG_APP_ID as string}
        buttonCustomization={buttonCustomization}
        onUserAuthenticationSucceeded={handleGoogleButtonSuccessLogin}
      />
    </LoginSocialGoogle>
  );
}
