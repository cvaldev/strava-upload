import Link from "next/link";
import Button from "react-bootstrap/Button";
const StravaConnect = () => {
    return (
        <Link href="/oauth/strava">
            <Button>Connect to Strava</Button>
        </Link>
    );
};

export default StravaConnect;
