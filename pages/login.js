import React, { useState } from "react";
import firebase from "../components/Backend/Firebase"

export default function Login() {
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [color, setColor] = useState("blue")
    const [notif, setNotif] = useState("")

    
    const [usernamesu, setUsernamesu] = useState("")
    const [passsu, setPasssu] = useState("")
    const [colorsu, setColorsu] = useState("blue")
    const [notifsu, setNotifsu] = useState("")

    var googleProvider = new firebase.auth.GoogleAuthProvider();
    //googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    //firebase.auth().languageCode = 'vn';
    googleProvider.setCustomParameters({
        'login_hint': 'user@gmail.com'
      });

    var fbProvider = new firebase.auth.FacebookAuthProvider();

    return <>
        <div>Sign in</div>
        <div style={{ color: color }}>{notif}</div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label htmlFor="pass">Password</label>
        <input id="pass" type="password" value={pass} onChange={e => setPass(e.target.value)} />
        <br />
        <button onClick={()=>{
            firebase.auth().signInWithEmailAndPassword(username, pass)
            .then((userCredential) => {
              // Signed in
              var user = userCredential.user;
              setColor("blue")
              setNotif("Thành công")
              window.history.back()
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              setColor("red")
              setNotif("Error: " + errorMessage)
            });
        }}>
            Log in
        </button>
        <br/>
        <button onClick={() => {
            firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
              /** @type {firebase.auth.OAuthCredential} */
              var credential = result.credential;
          
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              //console.log("result", credential)
              //console.log("token", token)
              //console.log("user", user)
              window.history.back()
              // ...
            }).catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              
              setColor("green")
              setNotif("Info: " + errorMessage)
              // ...
            });
        }}>Sign In With Gmail</button>
        <br/>
        <button onClick={() => {
            firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
              /** @type {firebase.auth.OAuthCredential} */
              var credential = result.credential;
          
              // The signed-in user info.
              var user = result.user;
          
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var accessToken = credential.accessToken;
              //console.log("user", user)
              //console.log("token", accessToken)
              window.history.back()
              // ...
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
          
              // ...
            });
        }}>Sign In With Facebook</button>
        <hr/>
        
        <div>Sign up</div>
        <div style={{ color: colorsu }}>{notifsu}</div>
        <label htmlFor="usernamesu">Username</label>
        <input id="usernamesu" type="text" value={usernamesu} onChange={e => setUsernamesu(e.target.value)} />
        <br />
        <label htmlFor="passsu">Password</label>
        <input id="passsu" type="password" value={passsu} onChange={e => setPasssu(e.target.value)} />
        <br />
        <button onClick={() => {
            firebase.auth().createUserWithEmailAndPassword(usernamesu, passsu)
                .then((userCredential) => {
                    //var user = userCredential.user;
                    //console.log(user)
                    setColorsu("blue")
                    setNotifsu("Thành công")
                    window.history.back() 
                })
                .catch((error) => {
                    //var errorCode = error.code;
                    var errorMessage = error.message;
                    setColorsu("red")
                    setNotifsu("Error: " + errorMessage)
                    // ..
                });
        }}>Sign up</button>
    </>;
}
