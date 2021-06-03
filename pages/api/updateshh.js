import firebase from "../../components/Backend/Firebase"

export default async (req, res) => {
    let method = req.method
    let body = req.body
    let key = body.key
    let title = body.title

    firebase.database().ref('/doc/shh/content').update({[key]: {content: body.content, title, key}})
    
    return res.status(200).json({res:'OK'})
}