import React, { useState } from 'react'
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import ModalForm from './ModalForm';
import { addForm } from '../ApiCalls'

function ModalWrapper() {

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  //transforming form response to request body
  const createFormBody = ({name, questions}) =>{
    let formBody = {};
    formBody.name = name;
    if(!questions) {
      message.error('Enter atleast 1 question');
      return null;
    }
    formBody.questions = questions.map(questionObj => {
      let options = null;
      if(questionObj.format === 'checkbox') {
        questionObj.options = questionObj.options.trim();
        options = questionObj.options.split("\n");
      }
      if(questionObj.format === 'radio') options = [questionObj.option1, questionObj.option2 ]; 
      return {
        question: questionObj.question,
        format: questionObj.format,
        options: options,
      }
    })
    return formBody;
  }

  //calling API to save form
  const onCreate = (values) => {
    let formbody = createFormBody(values);
    if(formbody){
      addForm(formbody)(dispatch);
      setVisible(false);
    }
  };

  return (
    <>
      <Button type="primary" style={{ margin: '16px 0' }} onClick={() => {setVisible(true);}}>
        Add Form
      </Button>
      <ModalForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  )
}

export default ModalWrapper;
