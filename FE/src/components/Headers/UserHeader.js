/*!


* Coded by Deepak Prakash Baskota Foundation

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

const UserHeader = () => {
    const username = JSON.parse(localStorage.getItem("user")).name;
    const history = useHistory();

    return (
        <>
            <div
                className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                style={{
                    minHeight: "600px",
                    backgroundImage: "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                }}
            >
                {/* Mask */}
                <span className="mask bg-gradient-default opacity-8" />
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="12" md="12">
                            <h1 className="display-2 text-white">Hello {username}</h1>
                            <p className="text-white mt-0 mb-5">This is your profile page.</p>
                            <Button
                                color="info"
                                onClick={() => history.push("/admin/edit-profile")}
                            >
                                Edit profile
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UserHeader;
