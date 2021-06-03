import Link from "next/link"
import Admin from "layouts/Admin.js";
import firebase from "../../../components/Backend/Firebase"
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

function Content({ data, id, title }) {
    return <div>
        <div>{title}</div>
        <br />

        <SunEditor defaultValue={data}
            onChange={(content) => data = content}

            setOptions={{
                showPathLabel: true,
                minHeight: "50vh",
                maxHeight: "50vh",
                placeholder: "Enter your text here!!!",
                buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock"],
                    ["paragraphStyle"],
                    [
                        "bold",
                        "underline",
                        "italic",
                        "strike",
                        "subscript",
                        "superscript"
                    ],
                    ["fontColor", "hiliteColor"],
                    ["removeFormat"],
                    "/", // Line break
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    ["table", "link", "image"]
                ],
                formats: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
                font: [
                    "cursive",
                    "Arial",
                    "Calibri",
                    "Comic Sans",
                    "Courier",
                    "Garamond",
                    "Georgia",
                    "Impact",
                    "Lucida Console",
                    "Palatino Linotype",
                    "Segoe UI",
                    "Tahoma",
                    "Times New Roman",
                    "Trebuchet MS"
                ]
            }}

        />

        <br />
        <button onClick={() => {
            let content = data
            fetch("/api/updateshh", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content, key: id, title })
            })
                .then(res => {
                    console.log("content update status", res.status)
                    return res.json()
                })
                .then(data => {
                    console.log("content update result", data)
                    // console.log(data)
                    // go back
                })
        }}>Update</button>
    </div>

}

export async function getServerSideProps(context) {
    //console.log(context.query)
    let key = context.query.id
    if (!key) return {
        props: { data: "", id: "", title: "" },
    }
    let content = (await firebase.database().ref("/doc/shh/content/" + key).once("value")).val()
    let node = (await firebase.database().ref("/doc/shh/titles").orderByChild("key").equalTo(key).once("value")).val()

    // cannot find key
    if (!node) return {
        props: { data: content ? content.content : "", id: key, title: "" },
    }

    return {
        props: { data: content ? content.content : "", id: key, title: node[key].title },
    }
}

Content.layout = Admin;

export default Content