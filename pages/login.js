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
