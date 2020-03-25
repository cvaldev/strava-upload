import { NextPage } from "next";
import { FileUpload, StravaConnect } from "../components";

interface IndexProps {
    isAuthenticated: boolean;
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
    const { isAuthenticated } = props;
    if (isAuthenticated) {
        return <FileUpload uploadUrl="/api/upload" />;
    } else {
        return <StravaConnect />;
    }
};

Index.getInitialProps = async ({ req }) => {
    // @ts-ignore
    return { isAuthenticated: req.isAuthenticated() };
};
export default Index;
