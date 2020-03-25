import StravaConnect from "./StravaConnect";
import { Layout } from "../Layout";

export const NewUserLayout = () => {
    return (
        <Layout>
            <div>
                <h1>Left side</h1>
            </div>
            <style jsx>
                {`
                    div {
                        height: 100%;

                        background: linear-gradient(
                            320deg,
                            rgba(255, 255, 255, 1),
                            rgba(255, 255, 255, 1) 50%,
                            rgba(252, 76, 2, 1) calc(50% + 1px)
                        );
                    }
                `}
            </style>
        </Layout>
    );
};
