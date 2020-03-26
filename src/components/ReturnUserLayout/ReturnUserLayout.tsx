import { Layout } from "../Layout";
import { Row, Col, Container } from "react-bootstrap";
import { FileUpload } from "../FileUpload";

export const ReturnUserLayout = () => {
    return (
        <Layout className="reverse-background d-flex align-items-stretch">
            <Row>
                <Col className="align-self-center">
                    <FileUpload uploadUrl="/api/upload" />
                </Col>
                <Col>
                    <p>Activites</p>
                </Col>
            </Row>
        </Layout>
    );
};
