import firebase from "../../components/Backend/Firebase"

export default async (req, res) => {
    let method = req.method
    let body = req.body
    let key = body.key
    let title = body.title

    const temp =  () => new Promise((resolve, reject) => {
        firebase.database().ref('/doc/shh/content').update({ [key]: { content: body.content, title, key } }, error => {
            resolve("update done!-" + error)
        })
    } )


    let data = await temp()

    return res.status(200).json({ resm: data })
}
