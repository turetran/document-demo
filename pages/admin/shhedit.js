import Admin from "layouts/Admin.js";
import Link from "next/link"
import firebase from "../../components/Backend/Firebase"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0",
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF",
      },
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1",
      },
    },
  };

function SHHEdit({ data, atts }) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    return <>
        <button><Link href="/admin/shhedit/sieuhinhhoc">Thêm chủ đề</Link></button>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Danh sách chủ đề</h4>
                        <p className={classes.cardCategoryWhite}>
                            Các chủ đề
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="info"
                            tableHead={["Số thứ tự", "Tựa đề", "Mô tả", "Vị trí", "Tạo bởi",""]}
                            tableData={atts.map((att, key) => {
                                return [(key+1).toString(), 
                                    <Link href={"/admin/shhedit/content?id=" + data[att].key + "&ori=shh"} key={"t"+key}>{data[att].title}</Link>,
                                    data[att].descr,
                                    data[att].order.toString(),
                                    "",
                                    <Link href={"/admin/shhedit/sieuhinhhoc?id=" + data[att].key}><button>Chỉnh sửa</button></Link>
                                ]
                            })}
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    </>
}

export async function getServerSideProps(context) {
    let data = ""
    data = (await firebase.database().ref('/doc/shh/titles').once('value')).val()
    delete data.order
    let atts = Object.keys(data)
    atts.sort((a,b) => Number(data[a].order) - Number(data[b].order))
    return {
        props: { data, atts }, // will be passed to the page component as props
    }
}

SHHEdit.layout = Admin;

export default SHHEdit