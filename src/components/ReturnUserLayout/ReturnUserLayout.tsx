import { Layout } from "../Layout";
import { Row, Col, Container } from "react-bootstrap";
import { FileUpload } from "../FileUpload";
import { Activities } from "../Activities";

export const ReturnUserLayout = () => {
    return (
        <Layout className="reverse-background d-flex align-items-stretch">
            <Container style={{ height: "100%" }}>
                <Row style={{ height: "100%" }}>
                    <Col className="align-self-center">
                        <FileUpload uploadUrl="/api/upload" max={5} />
                    </Col>
                    <Col>
                        <Activities page={1} perPage={2} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};
