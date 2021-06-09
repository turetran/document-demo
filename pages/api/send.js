import { KingBed } from "@material-ui/icons"
import firebase from "../../components/Backend/Firebase"
import { startTime } from "../../myconfig"
import {suser, spass} from "../../myconfig"
 

export default async (req, res) => {
    let method = req.method

    if (method != "POST") return res.status(400).json({ result: 'invalid' })

    let body = req.body
    if (req.headers.uid !== "OJs9179R7JfZlQC6IN8YQEJkONM2") {
        return res.status(400).json({ result: "Lỗi: Denied Permission" })
    }

    if (!body.title) {
        return res.status(400).json({ result: 'Lỗi: Tựa đề không có dữ liệu.' })
    }

    const pros = () => new Promise(async (resolve) => {
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                if (body.kind == "new") { // create new
                    // check not duplicate title
                    let node = (await firebase.database().ref("/doc/shh/titles").orderByChild("title").equalTo(body.title).once("value")).val()
                    if (node) {
                        return res.status(400).json({ result: 'Lỗi: Tựa đề bị trùng.' })
                    }

                    firebase.database().ref('/doc/shh/titles/order').once('value').then(data => {
                        let order = data.val()
                        let cTime = Date.now()
                        if (!order) return
                        body.order = order
                        body.createTime = cTime
                        body.key = (cTime - startTime).toString()
                        const pro1 = new Promise((res1) => {
                            firebase.database().ref('/doc/shh/titles/' + body.key).set(body, error => res1(error?error:''))
                        })
                        const pro2 = new Promise((res1) => {
                            firebase.database().ref('/doc/shh/titles').update({ order: order + 1 }, error => res1(error?error:''))
                        })
                        const pro3 = new Promise((res1) => {
                            firebase.database().ref('/doc/shh/content/' + body.key).update({ key: body.key, content: "", title: body.title }, error => res1(error?error:''))
                        })
                        Promise.all([pro1, pro2, pro3]).then(vals => {
                            console.log("vals", vals[0])
                            resolve(vals)
                        })
                    })
                } else { // update
                    firebase.database().ref('/doc/shh/titles/' + body.key).once('value').then(data => {
                        let _data = data.val()
                        let cTime = Date.now()
                        _data.modifiedTime = cTime
                        _data.order = body.order
                        _data.title = body.title
                        _data.descr = body.descr

                        const pro1 = new Promise((res1) => {
                            firebase.database().ref('/doc/shh/titles/' + body.key).update(_data, error => res1(error?error:''))
                        })
                        const pro2 = new Promise((res2) => {
                            firebase.database().ref('/doc/shh/content/' + body.key).update({ title: body.title }, error => res2(error?error:''))
                        })
                        Promise.all([pro1, pro2]).then(vals => {
                            //console.log("vals", vals[0])
                            resolve(vals)
                        })
                    })
                }
            } else {
                firebase.auth().signInWithEmailAndPassword(suser, spass)
            }
        })
    })

    let result = await pros()
    result = result.join('')
    //console.log("result", result)
    if (result)
        return res.status(400).json({ result })
    else 
        return res.status(200).json({ result })
}
