import firebase from "../../components/Backend/Firebase"

export default async (req, res) => {
    let method = req.method
    let body = req.body
    let key = body.key
    let title = body.title

    console.log("body", body)

    const temp =  () => new Promise((resolve, reject) => {
        firebase.database().ref('/doc/shh/content').update({ [key]: { content: body.content, title, key } }, error => {
            resolve("update done!-" + error)
        })
    } )

    /*
    let result = then(() => {
        firebase.database().ref('/doc/shh/content').update({ [key]: { content: body.content, title, key } }, error => {
            return "update done!-" + error
        })
    })*/

    let data = await temp()
    console.log("data", data)

    return res.status(200).json({ resm: data })
}
