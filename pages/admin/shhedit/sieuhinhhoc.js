import Link from "next/link"
import Admin from "layouts/Admin.js";
import firebase from "../../../components/Backend/Firebase"
import Head from 'next/head'
import { useState } from 'react';

function SieuHinhHoc({data, kind}) {
    //let valTitle = 
    const [title, setTitle] = useState(data.title);
    const [descr, setDescr] = useState(data.descr);
    const [order, setOrder] = useState(data.order);
    let user = firebase.auth().currentUser || {}
    return (
    <div> Thêm/chỉnh sửa chủ đề
        <br/>
            <div id="notif" style={{color: "red"}}> </div>
            <label htmlFor="inputTitle">Tựa đề</label>
            <input id="inputTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <br/>
            <label htmlFor="inputDescr">Mô tả</label>
            <input id="inputDescr" type="text" value={descr} onChange={(e) => setDescr(e.target.value)}/>
            <br/>
            <label htmlFor="inputOrder">Vị trí</label>
            <input id="inputOrder" type="number" value={order} onChange={(e) => setOrder(e.target.value)} disabled={kind?true:false}/>
        <br/>
        <button onClick={() => {
            window.history.back()
        }}>Quay lại</button>
        <button onClick={() => {
            fetch("/api/send",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Uid': user.uid,
                    'token': user.refreshToken,
                    'email':user.email,
                  },
                body: JSON.stringify({key: data.key,title,descr,order,kind})
            })
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.result) {
                    document.getElementById("notif").style.color = "red"
                    document.getElementById("notif").innerHTML = res.result || "Thành công"
                } else {
                    document.getElementById("notif").style.color = "blue"
                    document.getElementById("notif").innerHTML = res.result || "Thành công"
                }
            })
        }}>Lưu</button>
    </div>)
}

export async function getServerSideProps(context) {
    let id = context.query.id
    if (!id) return {
      props: {data: {}, kind: "new"}, // will be passed to the page component as props
    }
    let node = (await firebase.database().ref("/doc/shh/titles/"+id).once("value")).val()
    return {
        props: {data: node, kind: ""}
    }
}

SieuHinhHoc.layout = Admin;

export default SieuHinhHoc
