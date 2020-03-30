import { Layout } from "../Layout";
import { Row, Col, Container } from "react-bootstrap";
import { FileUpload } from "../FileUpload";
import { Activities } from "../Activities";

export const ReturnUserLayout = () => {
    return (
        <Layout className="reverse-background d-flex align-items-stretch">
            <Container style={{ height: "100%", minWidth: "75%" }}>
                <Row style={{ height: "100%" }}>
                    <Col
                        className="align-self-center"
                        style={{ maxWidth: "30%" }}
                    >
                        <FileUpload uploadUrl="/api/upload" max={5} />
                    </Col>
                    <Col
                        className="activities align-self-center "
                        style={{ height: "75%" }}
                    >
                        <Row
                            style={{
                                width: "100%",
                                marginBottom: "20px"
                            }}
                        >
                            <h1
                                style={{
                                    width: "100%",
                                    textAlign: "center"
                                }}
                            >
                                Latest Activities
                            </h1>
                        </Row>
                        <Row className="overflow-auto">
                            <Col>
                                <Activities page={1} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
