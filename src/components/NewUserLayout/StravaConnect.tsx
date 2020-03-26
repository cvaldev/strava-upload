import Link from "next/link";
import Button from "react-bootstrap/Button";
import { CSSProperties } from "react";

interface Props {
    /**
     * Defines the class of the stravaconnect.
     */
    className?: string;
    /**
     * Defines the style of the stravaconnect.
     */
    style?: CSSProperties;
}
const StravaConnect = (props: Props) => {
    const { className, style } = props;
    return (
        <Link href="/oauth/strava">
            <Button className={className} style={style}>
                Connect to Strava
            </Button>
        </Link>
    );
};

export default StravaConnect;
