import React,{ useState } from 'react'
import Main from './components/Main/Main'
import './App.css'
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react'
import aws_exports from './aws-exports'
Amplify.configure(aws_exports);

/*Hub.listen('auth', (data) => {
  const { payload } = data;
  console.log('A new auth event has happened: ', data.payload.data.username + ' has ' + data.payload.event);
})*/

function App( { signOut, user }) {
  
  const [userLogged, setUserlogged] = useState("");

  Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then( user => setUserlogged( user.username ) )
  .catch(err => console.log(err));
  
  return (
      <> 
        <header>          
          <Main user={userLogged} />     
        </header>
      </>
    );
  }


export default withAuthenticator(App);


/*import { Amplify } from 'aws-amplify';

import { Authenticator } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <> 
        <header>
        <h1>Hello {user.username}</h1> 
          <Main />     
        </header>
        </>
        
      )}
    </Authenticator>
  );
}*/