import { Fragment, FunctionComponent } from "react";
import Header from "./Header";

interface Props {
    children: any;
}

export const Layout: FunctionComponent<Props> = (props: Props) => {
    const { children } = props;
    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    );
};
