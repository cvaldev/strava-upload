import Link from "next/link";
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
            {/* <a href="/oauth/strava" className={className}></a> */}
            <div className={className} style={style} />
        </Link>
    );
};

export default StravaConnect;
