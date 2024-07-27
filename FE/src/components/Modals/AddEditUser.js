import { Formik } from "formik";
import { register } from "network/ApiAxios";
import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Modal,
} from "reactstrap";
import * as Yup from "yup";

const AddEditUser = ({ isOpen, toggleModal, data }) => {
    const handleSubmit = async () => {};
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().when("data", {
            is: (data) => !data?._id, // if data._id is not available (i.e., undefined or null)
            then: Yup.string().required("Password is required"),
            otherwise: Yup.string(), // if data._id is available, password is not required
        }),
        contact: Yup.string().required("Contact is required"),
        designation: Yup.string().required("Designation is required"),
    });

    const initialValues = {
        name: data?.name || "",
        email: data?.email || "",
        password: "",
        contact: data?.contact || "",
        designation: data?.designation || "",
    };

    return (
        <Modal className="modal-dialog-centered" size="md" isOpen={isOpen} toggle={toggleModal}>
            <div className="modal-body p-0">
                <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-transparent pb-0">
                        <div className="text-muted text-left mt-2 mb-3">
                            {data?._id ? "Update Admin Info" : "Add New Admin"}
                        </div>
                    </CardHeader>
                    <CardBody className=" px-lg-5 py-lg-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                            enableReinitialize
                        >
                            {({
                                handleSubmit,
                                setFieldValue,
                                handleChange,
                                values,
                                touched,
                                errors,
                            }) => {
                                return (
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <Input
                                                    placeholder="Name"
                                                    type="text"
                                                    name="name"
                                                    value={values?.name}
                                                    onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <Input
                                                    placeholder="Email"
                                                    type="email"
                                                    name="email"
                                                    value={values?.email}
                                                    onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        {!data?._id && (
                                            <FormGroup>
                                                <InputGroup className="input-group-alternative">
                                                    <Input
                                                        placeholder="Password"
                                                        type="password"
                                                        name="password"
                                                        onChange={handleChange}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                        )}
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <Input
                                                    placeholder="Phone Number"
                                                    type="text"
                                                    name="contact"
                                                    value={values?.contact}
                                                    onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <Input
                                                    placeholder="Designation"
                                                    type="text"
                                                    name="designation"
                                                    value={values?.designation}
                                                    onChange={handleChange}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="submit">
                                                {data?._id ? "Update" : "Create"}
                                            </Button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </CardBody>
                </Card>
            </div>
        </Modal>
    );
};

export default AddEditUser;
