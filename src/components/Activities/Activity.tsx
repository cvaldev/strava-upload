import Item from "react-bootstrap/ListGroupItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
interface Props {
    activity: any;
}

export const Activity = (props: Props) => {
    const {
        activity: { name, start_date_local, distance }
    } = props;

    return (
        <Item>
            <Card>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <strong>Date:</strong>
                            {start_date_local}
                        </Col>
                        <Col>
                            <strong>Distance:</strong>
                            {distance}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Item>
    );
};
