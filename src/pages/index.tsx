import { NextPage } from "next";
import { ReturnUserLayout, NewUserLayout, Layout } from "../components";
interface IndexProps {
    isAuthenticated: boolean;
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
    const { isAuthenticated } = props;
    if (isAuthenticated) {
        return (
            <Layout>
                <ReturnUserLayout />
            </Layout>
        );
    } else {
        return (
            <Layout>
                <NewUserLayout />
            </Layout>
        );
    }
};

Index.getInitialProps = async ({ req }) => {
    // @ts-ignore
    return { isAuthenticated: req.isAuthenticated() };
};
export default Index;
