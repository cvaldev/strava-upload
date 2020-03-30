import fetch from "isomorphic-unfetch";
import { Container, ListGroup, Alert } from "react-bootstrap";
import { Component, CSSProperties } from "react";
import { Activity } from "./Activity";

interface IProps {
    page?: number;
    perPage?: number;
    /**
     * Defines the class of the activities.
     */
    className?: string;
    /**
     * Defines the style of the activities.
     */
    style?: CSSProperties;
}

interface IState {
    activities: any[];
}

export class Activities extends Component<IProps, IState> {
    private page: number;
    private perPage: number;

    constructor(props: IProps) {
        super(props);
        this.page = props.page;
        this.perPage = props.perPage;
        this.state = { activities: [] };
    }

    public async componentDidMount() {
        const response = await fetch(
            `/api/activities?page=${this.page}&perPage=${this.perPage ?? 30}`
        );
        if (response.ok) {
            const data = await response.json();
            const { activities } = data;
            console.log(activities);
            this.setState({ activities });
        }
    }

    public render() {
        const { activities } = this.state;

        return (
            <ListGroup
                className={this.props.className}
                style={this.props.style}
                variant="flush"
            >
                {activities.map((activity) => (
                    <Activity activity={activity} />
                ))}
            </ListGroup>
        );
    }
}
