import React, { useState } from "react";
import firebase from "../components/Backend/Firebase"

import Admin from "layouts/Admin.js";

function Profile() {
    let user = firebase.auth().currentUser
    return <>
    Profile
    <br/>
    <label htmlFor="name">Tên</label>
    <input id="name" type="text" value={user?user.displayName: ""} disabled={true}/>
    <br/>
    <label htmlFor="email">Email</label>
    <input id="name" type="text" value={user?user.email:""} disabled={true}/>
    <br/>
    <button onClick={() => {
        window.history.back()
    }}>Quay lại</button>
    </>;
}

Profile.layout = Admin;

export default Profile