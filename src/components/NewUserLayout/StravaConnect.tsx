import Link from "next/link";

const StravaConnect = () => {
    return (
        <Link href="/oauth/strava">
            <button>Connect to Strava</button>
        </Link>
    );
};

export default StravaConnect;
