import axios from 'axios';
import { ADD_FORM, GET_FORMS } from "./redux/form/formActions";

export const addForm = (formbody) => dispatch => {
  axios.post(`${process.env.REACT_APP_SERVER_URL}/form`,formbody)
    .then(res => {
      if(res.data){
        dispatch(returnData(ADD_FORM, res));
      }
    })
    .catch(err => console.log(err));
};

export const getForms = () => dispatch => {
  axios.get(`${process.env.REACT_APP_SERVER_URL}/forms`)
    .then(res => {
      if(res.data) {
        dispatch(returnData(GET_FORMS, res));
      }
    })
    .catch(error => console.log(error))
}

export const getForm = (formId) => {
  return new Promise((resolve, reject) =>{
    axios.get(`${process.env.REACT_APP_SERVER_URL}/form/${formId}`)
    .then(res => {
      if(res.data) {
        resolve(res.data);
      }
    })
    .catch(error => console.log(error))
  })
}

export const sendAnswer = (formId, body) => {
  return new Promise((resolve, reject) =>{
    axios.post(`${process.env.REACT_APP_SERVER_URL}/form/${formId}/answers`, body)
    .then(res => {
      if(res.data) {
        resolve(res.data);
      }
    })
    .catch(error => console.log(error))
  })
}

export const deleteForm = (formId) => dispatch => {
  return new Promise((resolve, reject)=>{
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/form/${formId}`)
    .then(res => {
      getForms()(dispatch);
      resolve();
    })
    .catch(error => console.log(error))
  }) 
}

const returnData = (type, response) =>{
  if(response.status === 200)
    return{
      type,
      data:response.data
    }
}