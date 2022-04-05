import {Drawer, Input, Col, Select, Form, Row, Button, Spin} from 'antd';
import {addNewStudent} from "./client";
import {useState} from 'react';
import {successNotification, errorNotification} from './Notification';

const {Option} = Select;

function StudentForm(props) {
    return (
        <Form layout="vertical"
              onFinishFailed={props.onFinishFailed}
              onFinish={props.onFinish}
              hideRequiredMark>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{required: true, message: 'Please enter student name'}]}
                    >
                        <Input placeholder="Please enter student name" defaultValue={props.student && props.student.name}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{required: true, message: 'Please enter student email'}]}
                    >
                        <Input placeholder="Please enter student email" defaultValue={props.student && props.student.email}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="gender"
                        label="gender"
                        rules={[{required: true, message: 'Please select a gender'}]}
                    >
                        <Select placeholder="Please select a gender" defaultValue={props.student && props.student.gender}>
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                {props.submitting && <Spin />}
            </Row>
        </Form>
    );
}

function StudentDrawerForm(props) {
    const onClose = () => props.setShowDrawer(false);
    const [submitting, setSubmitting] = useState(false);

    const onFinish = student => {
        setSubmitting(true)
        console.log(JSON.stringify(student, null, 2));
        addNewStudent(student)
            .then(() => {
                console.log("student added");
                onClose();
                successNotification(
                    "Student successfully added",
                    `${student.name} was added to the system`
                )
                props.fetchStudents();
            }).catch(err => {
                console.log(err);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomRight"
                    )
                });
            }).finally(() => {
                setSubmitting(false);
            });
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return <Drawer
        title={props.title}
        width={720}
        onClose={onClose}
        visible={props.showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button onClick={onClose} style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
        <StudentForm
            onFinish = {onFinish}
            onFinishFailed = {onFinishFailed}
            submitting = {submitting}
            student = {props.student}
        />
    </Drawer>
}

export default StudentDrawerForm;