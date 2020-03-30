import StravaConnect from "./StravaConnect";
import { Layout } from "../Layout";
import { Row, Col } from "react-bootstrap";

export const NewUserLayout = () => {
    return (
        <Layout className="default-background d-flex flex-column align-items-center justify-content-center">
            <Row>
                <Col>
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "5em"
                        }}
                    >
                        strupload
                    </h1>
                </Col>
            </Row>
            <Row style={{ paddingTop: "2em" }}>
                <Col>
                    <StravaConnect
                        className="strava-connect"
                        // style={{
                        //     backgroundColor: "white",
                        //     color: "black",
                        //     border: "2px solid rgba(252, 76, 2, 1)"
                        // }}
                    />
                </Col>
            </Row>
        </Layout>
    );
};
