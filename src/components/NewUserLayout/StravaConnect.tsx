import Link from "next/link";
import { CSSProperties } from "react";

const StravaConnect = () => {
    return (
        <Link href="/oauth/strava">
            <div className="strava-connect" />
        </Link>
    );
};

export default StravaConnect;
