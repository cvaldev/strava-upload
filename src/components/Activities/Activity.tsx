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
        activity: {
            id,
            name,
            start_date_local,
            distance,
            moving_time,
            average_speed
        }
    } = props;
    const date = new Date(start_date_local).toLocaleDateString();
    const distanceKm = (distance / 1000).toFixed(2);
    const minutesElapsed = Math.floor((moving_time / 3600) * 60);
    const secondsElapsed = (() => {
        const seconds = Math.floor(moving_time - (minutesElapsed * 3600) / 60);
        if (!(seconds / 10 > 1)) return "0" + seconds;
        return seconds;
    })();
    const speedMins = Math.floor(16.67 / average_speed);
    const speedSeconds = Math.floor(((16.67 / average_speed) % speedMins) * 60);
    return (
        <Item>
            <Card>
                <Card.Header>
                    <a
                        href={`https://www.strava.com/activities/${id}`}
                        target="_blank"
                    >
                        {name}
                    </a>
                    <span className="float-right">
                        <strong>Date:</strong>
                        {date}
                    </span>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col>
                            <strong>Speed: </strong>
                            {speedMins}:{speedSeconds} m/km
                        </Col>
                        <Col>
                            <strong>Distance: </strong>
                            {distanceKm} km
                        </Col>
                        <Col>
                            <strong>Time: </strong>
                            {minutesElapsed}m:{secondsElapsed}s
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Item>
    );
};
