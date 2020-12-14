import { Layout, Input, Checkbox, Button, Form, Divider, Spin, Radio, Row, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getForm, sendAnswer } from '../ApiCalls';
const { Content } = Layout;

function SingleForm({match}) {

  const {formId} = match.params;
  const [loading, setLoading] = useState(true);
  const [submitLoad, setSubmitLoading] = useState(false);
  const [form, setForm] = useState({});
  const [singleForm] = Form.useForm();
  
  useEffect(() => {
    //fetching form structure
    (async function fetchData(){
      let formData = await getForm(formId);
      setForm(formData);
      setLoading(false)
    })();
  }, [formId]);

  //on submit answer
  const onFinish = values =>{
    setSubmitLoading(true);
    (async function fetchData(){
      await sendAnswer(formId, values);
      setSubmitLoading(false);
      message.success("Form Data Submitted")
      singleForm.resetFields();
    })();
  }

  return (
    <Content style={{ padding: '30px 50px' }}>
      <div className="site-layout-content">
      {
        loading
        ? <Spin className={"singleFormLoader"} size="large" />
        :<>
          <Divider orientation="left" plain>
            <h1>{form.name}</h1>
          </Divider>
          <Form
            form={singleForm}
            onFinish={onFinish}
          >
            {form.questions.map((question, i)=>{
              return(
                <React.Fragment key={question._id}>
                  {
                    <h2>{`${i+1}. ${question.question}`}</h2>
                  }
                  {
                    question.format === 'text' && 
                    <>
                      <Form.Item
                        label={"Answer"}
                        name={question._id}
                        rules={[{ required: true, message: 'Please input your answer!' }]}
                      >
                        <Input />
                      </Form.Item>
                    </>
                  }
                  {
                    question.format === 'radio' && <Form.Item
                      label={"Answer"}
                      name={question._id}
                      rules={[{ required: true, message: 'Select One' }]}
                    >
                      <Radio.Group>
                        <Radio value={question.options[0]}>{question.options[0]}</Radio>
                        <Radio value={question.options[1]}>{question.options[1]}</Radio>
                      </Radio.Group>
                    </Form.Item>
                  }
                  {
                    question.format === 'checkbox' &&
                    <Form.Item 
                      name={question._id} 
                      label="Check all that applies"
                      rules={[{ required: true, message: 'Please input your answer!' }]}
                    >
                      <Checkbox.Group>
                        <Row>
                          {
                            question.options.map((option, i)=>(
                              <Checkbox value={option} key={i} style={{ lineHeight: '32px' }}>
                                {option}
                              </Checkbox>
                            ))
                          }
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  }
                  <Divider/>
                </React.Fragment>
              )
            })}
            <Form.Item>
              <Button ghost type="primary" htmlType="submit" className={"submitSingleForm"}>
                {
                  submitLoad ? <Spin/> :"Submit"
                }
              </Button>
          </Form.Item>
          </Form>
        </>
      }
      </div>
    </Content>
  )
}

export default SingleForm;
