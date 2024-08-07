/*!


* Coded by Deepak Prakash Baskota Foundation

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class Login extends React.Component {
    render() {
        return (
            <>
                <footer
                    className="py-5"
                    style={{
                        position: "absolute",
                        width: "100%",
                        bottom: "-5px",
                    }}
                >
                    <Container>
                        <Row className="align-items-center justify-content-xl-between">
                            <Col xl="6">
                                <div className="copyright text-center text-xl-left text-muted">
                                    © 2024{" "}
                                    <a
                                        className="font-weight-bold ml-1"
                                        href="https://deepakbaskota.org/"
                                        target="_blank"
                                    >
                                        Deepak Prakash Bakota Foundation
                                    </a>
                                </div>
                            </Col>
                            <Col xl="6">
                                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                                    <NavItem>
                                        <NavLink href="https://deepakbaskota.org/" target="_blank">
                                            Deepak Prakash Bakota Foundation
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="" target="_blank">
                                            About Us
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="" target="_blank">
                                            Blog
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-auth-footer"
                                            target="_blank"
                                        >
                                            MIT License
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </>
        );
    }
}

export default Login;
