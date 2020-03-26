import { Fragment, FunctionComponent, CSSProperties } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
interface Props {
    /**
     * Defines the class of the layout.
     */
    className?: string;
    /**
     * Defines the style of the layout.
     */
    style?: CSSProperties;

    children: any;
}

export const Layout: FunctionComponent<Props> = (props: Props) => {
    const { children, className, style } = props;
    return (
        <Fragment>
            <Header />
            <Container className={className} style={style} fluid>
                {children}
            </Container>
            <Footer />
        </Fragment>
    );
};
