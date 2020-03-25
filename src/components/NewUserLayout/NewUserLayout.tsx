import { Fragment } from "react";

export const NewUserLayout = () => {
    return (
        <Fragment>
            <div className="left">
                <h1>strava-upload</h1>
            </div>
            <div className="right"></div>

            <style jsx>
                {`
                    .left {
                        background-color: #fc4c02;
                        transform: skew(0deg, -10deg);
                    }
                    h1 {
                        transform: skew(0deg, 10deg);
                    }
                `}
            </style>
        </Fragment>
    );
};
