import React, { useState } from "react";
import firebase from "../components/Backend/Firebase"

export default function Signup() {
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [color, setColor] = useState("blue")
    const [notif, setNotif] = useState("")
    return <>
        <div style={{ color: color }}>{notif}</div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        <br />
        <label htmlFor="pass">Password</label>
        <input id="pass" type="password" value={pass} onChange={e => setPass(e.target.value)} />
        <br />
        <button onClick={() => {
            firebase.auth().createUserWithEmailAndPassword(username, pass)
                .then((userCredential) => {
                    var user = userCredential.user;
                    //console.log(user)
                    setColor("blue")
                    setNotif("Thành công")
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("errorCode", errorCode)
                    console.log("errorMessage", errorMessage)
                    setColor("red")
                    setNotif("Error: " + errorMessage)
                    // ..
                });
        }}>Sign up</button>
    </>;
}
