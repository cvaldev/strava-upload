import { NextPage } from "next";
import { ReturnUserLayout, NewUserLayout } from "../components";
interface IndexProps {
    isAuthenticated: boolean;
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
    const { isAuthenticated } = props;
    return <ReturnUserLayout />;
    if (isAuthenticated) {
        return <ReturnUserLayout />;
    } else {
        return <NewUserLayout />;
    }
};

Index.getInitialProps = async ({ req }) => {
    // @ts-ignore
    return { isAuthenticated: req.isAuthenticated() };
};
export default Index;
