import Admin from "layouts/Admin.js";
import firebase from '../../../components/Backend/Firebase'
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
});

function ShhDetail({ data, title }) {
    return <div>
        <div style={{textAlign: "center", fontSize: "24px", marginBottom: "30px"}}><strong>{title}</strong></div>
        <div style={{maxWidth:"900px", border: "0px solid red", margin: "auto"}}
            dangerouslySetInnerHTML={{__html: data}} >
        </div>
    </div>
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    let data = (await firebase.database().ref('/doc/shh/titles').once('value')).val()
    delete data.order

    // Get the paths we want to pre-render based on posts
    let paths = []

    Object.keys(data).forEach((att) =>
        paths.push({ params: { id: data[att].key}})
    )
    console.log(paths)

// We'll pre-render only these paths at build time.
// { fallback: false } means other routes should 404.
return { paths, fallback: false }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
    const key = params.id
    if (!key) return { props: { data: null, title:null}}

    let content = (await firebase.database().ref("/doc/shh/content/" + key).once("value")).val()
    if (!content) return { props: { data: null, title: null}}

    return { props: { data: content.content?content.content:null, title: content.title}}
}

ShhDetail.layout = Admin;

export default ShhDetail
