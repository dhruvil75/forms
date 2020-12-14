import React from 'react'
import { Form, Input, Button, Select, Modal, Row, Col, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
const { TextArea } = Input;

const types = [
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Radio', value: 'radio' },
  { label: 'Text', value: 'text' },
];

function ModalForm({ visible, onCreate, onCancel }) {

  const [form] = Form.useForm();
  //setting options when selecting input format
  const handleChange = () => {
    form.setFieldsValue({ options: [] });
  };

  return (
    <Modal
      visible={visible}
      title="Create a new Form"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      width={"70vw"}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} autoComplete="off">
        <Form.Item
          label="Form Name"
          name={'name'}
          rules={[{ required: true, message: 'Missing Form Name' }]}
        >
          <Input />
        </Form.Item>
        <Divider/>
        <Form.List name="questions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Row gutter={16} justify="center" align="top" key={field.name}>
                  <Col span={10}>
                    <Form.Item
                      label={`Question ${parseInt(field.name) + 1}`}
                      name={[field.name, 'question']}
                      fieldKey={[field.fieldKey, 'question']}
                      className={"inputFormat"}
                      rules={[{ required: true, message: 'Missing Question' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item 
                      name={[field.name, "format"]} 
                      label="Input Format" 
                      fieldKey={[field.fieldKey, 'format']}
                      className={"inputFormat"}
                      rules={[{ required: true, message: 'Missing format' }]}
                    >
                      <Select
                        options={types} 
                        onChange={handleChange} 
                        placeholder="Select Input"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item className={"inputFormat"} noStyle>
                      {
                        //renders when checkbox is selected
                        form.getFieldValue('questions') && 
                        form.getFieldValue('questions')[field.name] &&
                        form.getFieldValue('questions')[field.name].format === 'checkbox' && 
                          <Form.Item
                            label="Options"
                            name={[field.name, 'options']}
                            fieldKey={[field.fieldKey, 'options']}
                            rules={[{ required: true, message: 'Missing Options' }]}
                            tooltip={{ title: 'Each Option in a new line.', icon: <InfoCircleOutlined /> }}
                          >
                            <TextArea rows={3}/>
                          </Form.Item>
                      }
                      {
                        //renders when radio is selected
                        form.getFieldValue('questions') && 
                        form.getFieldValue('questions')[field.name] &&
                        form.getFieldValue('questions')[field.name].format === 'radio' && 
                        <>
                          <Form.Item
                            label="Option 1"
                            name={[field.name, 'option1']}
                            fieldKey={[field.fieldKey, 'option1']}
                            rules={[{ required: true, message: 'Missing Option' }]}
                          >
                            <Input/>
                          </Form.Item>
                            <Form.Item
                            label="Option 2"
                            name={[field.name, 'option2']}
                            fieldKey={[field.fieldKey, 'option2']}
                            rules={[{ required: true, message: 'Missing Option' }]}
                          >
                            <Input/>
                          </Form.Item>
                        </>
                      }
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <MinusCircleOutlined className="deleteQuestion" onClick={() => remove(field.name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Question
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
}

export default ModalForm;
