import moment from "moment";
import React from "react";
import { Button, message } from "antd";
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import request from "umi-request";

const Form = ({ tableRef }) => {


  // A button Add task  pops up the form to add todos
  return (
    <ModalForm
      title="Create a new Task"
      trigger={
        <Button type="primary" style={{ marginLeft: "10%" }}>
          Add Task
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {},
      }}
      onFinish={(values) => {
        console.log("enter", values);
        if (values.tags === undefined || values.tags.trim().length === 0) {
          values.tags = [];
        } else {
          const temp = values.tags.split(",");
          values.tags = temp;
        }
        request
          .post(`http://127.0.0.1:8000/api/todo/`, {
            data: values,
          })
          .then((res) => {
            console.log(res);
            tableRef.current.reload();
            setTimeout(
              () => message.success("record added successfully!"),
              500
            );
          })
          .catch((err) => console.log(err));

        return true;
      }}
    >
      <ProFormText
        name="title"
        label="Task Title"
        tooltip="Example : Title 1"
        placeholder="Enter title here..."
        rules={[{ required: true, message: "Please enter the title!" }]}
      />
      <ProFormTextArea
        name="description"
        label="Description"
        tooltip="Example : Some description for task..."
        placeholder="Enter Description here..."
        rules={[{ required: true, message: "Please enter the description!" }]}
      />
      <ProForm.Group style={{ width: "100%" }}>
        <ProFormDatePicker
          name="due_date"
          label="Pick a due Date"
          width="sm"
          format="YYYY-MM-DD"
        />
        <ProFormText
          name="tags"
          label="Enter Tags"
          tooltip="Example : Tag1, Tag2"
          placeholder="Tag1, Tag2 etc..."
        />
        <ProFormSelect
          width="sm"
          name="status"
          label="Select task opration"
          options={[
            { label: "OPEN", value: "OPEN" },
            { label: "WORKING", value: "WORKING" },
            { label: "DONE", value: "DONE" },
            { label: "OVERDUE", value: "OVERDUE" },
          ]}
          placeholder="Select a task operation"
          rules={[
            { required: true, message: "Please select a task operation" },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default Form;
