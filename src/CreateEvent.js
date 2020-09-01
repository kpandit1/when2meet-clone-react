import React, { useState } from "react";
import { Form, DatePicker, Space, Input, Button } from "antd";

function CreateEvent() {
  const { RangePicker } = DatePicker;
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
      "dates": [
        rangeValue[0].format("YYYY-MM-DD"),
        rangeValue[1].format("YYYY-MM-DD"),
      ],
    };
    console.log("Success:", values);
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
      >
        <Form.Item
          label="Event Name"
          name="eventName"
          rules={[{ required: true, message: "Please input an event name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Dates"
          name="dates"
          rules={[
            { required: true, message: "Please input a valid date range" },
          ]}
        >
          <RangePicker format="ddd MMM D" />
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
export default CreateEvent;
