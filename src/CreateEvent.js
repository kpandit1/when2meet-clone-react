import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import firebase from "firebase/app";
import "firebase/database";
import moment from "moment-timezone";
import React from "react";
import { withRouter } from "react-router-dom";

function CreateEvent({ history }) {
  const defaultStartTime = "09:00:00";
  const defaultEndTime = "17:00:00";

  const { RangePicker } = DatePicker;
  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (fieldValues) => {
    const rangeValue = fieldValues["dates"];
    const values = {
      ...fieldValues,
      dates: [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
      startTime: fieldValues["startTime"].format("HH:mm:ss"),
      endTime: fieldValues["endTime"].format("HH:mm:ss"),
      timezone: fieldValues["timezone"].split(" ")[2],
      // Timezone is formatted as (05:43 pm) <Timezone>
    };
    console.log("Submitted:", values);
    const meetingKey = firebase.database().ref().push().key;
    firebase
      .database()
      .ref(meetingKey)
      .set(values)
      .then((val) => {
        history.push(`/meeting/${meetingKey}`);
        console.log(val);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="create-event">
      <h1>Create New Event</h1>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          startTime: moment(defaultStartTime, "HH:mm:ss"),
          endTime: moment(defaultEndTime, "HH:mm:ss"),
          timezone:
            "(" +
            moment().tz(moment.tz.guess()).format("hh:mm a") +
            ") " +
            moment.tz.guess(),
        }}
      >
        <Form.Item
          label="Event Name"
          name="eventName"
          rules={[{ required: true, message: "Please input an event name" }]}
        >
          <Input />
        </Form.Item>

        <h2>What dates might work?</h2>

        <Form.Item
          label="Dates"
          name="dates"
          rules={[
            { required: true, message: "Please input a valid date range" },
          ]}
        >
          <RangePicker format="ddd MMM D" />
        </Form.Item>

        <h2>What times might work?</h2>
        <Form.Item label="No earlier than" name="startTime">
          <TimePicker
            use12Hours
            format="h:mm A"
            minuteStep={15}
          />
        </Form.Item>

        <Form.Item label="No later than" name="endTime">
          <TimePicker
            use12Hours
            format="h:mm A"
            minuteStep={15}
          />
        </Form.Item>

        <Form.Item name="timezone" label="Timezone">
          <Select
            showSearch
          >
            {moment.tz.names().map((choice) => (
              <Option
                key={choice}
                value={choice + " " + moment().tz(choice).format("hh:mm a")}
              >
                ({moment().tz(choice).format("hh:mm a")}) {choice}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Create Event
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default withRouter(CreateEvent);
