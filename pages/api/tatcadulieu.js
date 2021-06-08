import { KingBed } from "@material-ui/icons"
import firebase from "../../components/Backend/Firebase"
import { startTime } from "../../myconfig"

export default async (req, res) => {
    firebase.database().ref('/').once('value').then(data => {
        //console.log(JSON.stringify(data.val()))
        let jdata = JSON.stringify(data.val())
        var fs = require('fs');
        fs.writeFile('backupdata.json', jdata, 'utf8', error => console.log("error", error));
    })
    return res.status(200).json({ res: "done!" })
}