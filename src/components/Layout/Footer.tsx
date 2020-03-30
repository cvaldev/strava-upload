import { Image } from "react-bootstrap";

const Footer = () => {
    return (
        <div className="footer">
            <a
                className="strava-poweredby float-right"
                href="https://www.strava.com"
                target="_blank"
            />
            <a
                className="github float-right"
                href="https://github.com/cvaldev/strava-upload"
                target="_blank"
            />
        </div>
    );
};

export default Footer;
