import React, { useEffect, useState } from "react";
import Header from "../components/Headers/Header";
import AddEditUser from "../components/Modals/AddEditUser";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { getAll } from "../network/ApiAxios";
import { FaEdit } from "react-icons/fa";

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [isOpen, setisOpen] = useState();
    const [data, setData] = useState();

    const toggleModal = () => {
        setisOpen(!isOpen);
    };
    useEffect(() => {
        const runAsync = async () => {
            const response = await getAll();
            const { data } = response;
            if (data.success) {
                setUsers(data.data);
            }
        };
        runAsync();
    }, []);

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0 d-flex align-items-center">
                                <h3 className="mb-0">Users</h3>
                                <Button
                                    color="primary"
                                    outline
                                    className="ml-auto"
                                    onClick={() => {
                                        setData();
                                        toggleModal();
                                    }}
                                >
                                    Add User
                                </Button>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Pnone Number</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.email}>
                                            <th scope="row">{user.name}</th>
                                            <td>{user.email}</td>
                                            <td>{user.contact}</td>
                                            <td>{user.designation}</td>
                                            <td>
                                                <Button color="secondary" outline>
                                                    <FaEdit
                                                        fontSize={18}
                                                        onClick={() => {
                                                            setData(user);
                                                            setisOpen(true);
                                                        }}
                                                    />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
                <AddEditUser isOpen={isOpen} toggleModal={toggleModal} data={data} />
            </Container>
        </>
    );
};

export default UsersTable;
