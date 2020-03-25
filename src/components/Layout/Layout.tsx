import { Fragment, FunctionComponent } from "react";
import Header from "./Header";

export const Layout: FunctionComponent = (props) => {
    const { children } = props;
    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    );
};
