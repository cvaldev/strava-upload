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
                    <Col className="overflow-auto activities align-self-center">
                        <h1
                            style={{
                                marginBottom: "10px",
                                textAlign: "center"
                            }}
                        >
                            Activities
                        </h1>

                        <Activities page={1} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
