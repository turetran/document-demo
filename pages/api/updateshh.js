import firebase from "../../components/Backend/Firebase"
import 'firebase/database'
import 'firebase/auth'
import {suser, spass} from "../../myconfig"

export default async (req, res) => {
    let method = req.method
    let body = req.body
    let key = body.key
    let title = body.title

    if (req.headers.uid !== "OJs9179R7JfZlQC6IN8YQEJkONM2") {
        return res.status(400).json({ res: "Denied Permission" })
    }

    const temp = () => new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                firebase.database().ref('/doc/shh/content').update({ [key]: { content: body.content, title, key } }, error => {
                    resolve(error ? error : '')
                })
            } else {
                firebase.auth().signInWithEmailAndPassword(suser,spass)
            }
        });


    })
    let data = await temp()
    //console.log("result data", data)
    
    return res.status(200).json({ res: data })
}
