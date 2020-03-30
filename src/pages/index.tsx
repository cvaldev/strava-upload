import { NextPage } from "next";
import { ReturnUserLayout, NewUserLayout } from "../components";
interface IndexProps {
    isAuthenticated?: boolean;
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
    const { isAuthenticated } = props;

    if (isAuthenticated) {
        return <ReturnUserLayout />;
    } else {
        return <NewUserLayout />;
    }
};

Index.getInitialProps = async ({ req }) => {
    // @ts-ignore
    const isAuthenticated = req.isAuthenticated();
    return { isAuthenticated: isAuthenticated };
};

export default Index;
