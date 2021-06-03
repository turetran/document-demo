import firebase from "../../components/Backend/Firebase"

export default (req, res) => {
    firebase.database().ref('/kind/triethoc').once('value').then(data => {
    })
    return res.status(200).json({ name: 'John Doe' })
  }
  