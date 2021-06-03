import { KingBed } from "@material-ui/icons"
import firebase from "../../components/Backend/Firebase"
import { startTime } from "../../myconfig"


export default async (req, res) => {
    let method = req.method

    if (method != "POST") return res.status(400).json({ result: 'invalid' })

    let body = req.body
    console.log(body)
    if (!body.title) {
        return res.status(400).json({ result: 'Lỗi: Tựa đề không có dữ liệu.' })
    }


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
            firebase.database().ref('/doc/shh/titles/' + body.key).set(body)
            firebase.database().ref('/doc/shh/titles').update({ order: order + 1 })
            firebase.database().ref('/doc/shh/content/' + body.key).update({ key: body.key, content: "", title: body.title })
        })
    } else { // update
        firebase.database().ref('/doc/shh/titles/' + body.key).once('value').then(data => {
            let _data = data.val()
            let cTime = Date.now()
            _data.modifiedTime = cTime
            _data.order = body.order
            _data.title = body.title
            _data.descr = body.descr

            firebase.database().ref('/doc/shh/titles/' + body.key).update(_data)
            firebase.database().ref('/doc/shh/content/' + body.key).update({ title: body.title })
        })
    }

    return res.status(200).json({ result: 'Thành công' })
}
