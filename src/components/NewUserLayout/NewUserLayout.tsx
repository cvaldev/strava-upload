import StravaConnect from "./StravaConnect";
import { Layout } from "../Layout";

export const NewUserLayout = () => {
    return (
        <Layout>
            <div className="background">
                <div className="left">
                    <h1>Strava-Upload</h1>
                </div>
                <div className="right">
                    <StravaConnect />
                </div>
            </div>

            <style jsx>
                {`
                    .background {
                        height: 100%;

                        background: linear-gradient(
                            320deg,
                            rgba(255, 255, 255, 1),
                            rgba(255, 255, 255, 1) 50%,
                            rgba(252, 76, 2, 1) calc(50% + 1px),
                            rgba(252, 76, 2, 1) 100%
                        );
                    }

                    .left {
                        background-color: blue;
                    }

                    .right {
                        background-color: red;
                        padding: 25%;
                        float: right;
                    }
                `}
            </style>
        </Layout>
    );
};
