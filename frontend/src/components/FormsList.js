import React, { useEffect, useState } from 'react'
import { List, Card, Button, message } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { getForms, deleteForm } from '../ApiCalls';
import { Link } from "react-router-dom";

const grid = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 4,
  xxl: 4,
}

function FromsList() {

  const dispatch = useDispatch();
  const forms = useSelector((state) => state.forms);
  const [deleteLoader, setDeleteLoader] = useState(null);

  const deleteFormClickHandler = async formId =>{
    setDeleteLoader(formId);
    await deleteForm(formId)(dispatch);
    setDeleteLoader(formId);
    message.success("Form Deleted");
  }

  useEffect(() => {
    getForms()(dispatch);
  }, [dispatch])

  return (
    <List
    grid={grid}
    dataSource={forms}
    renderItem={form =>(
      <List.Item>
        <Card title={form.name}>
          <p>Date: {new Date(form.createdAt).toLocaleDateString('en-IN')}</p>
          <p>Responses {form.responses}</p>
          <p className={"formLink"}>URL:
            <Link to={form._id}> 
              {process.env.REACT_APP_SERVER_URL}/{form._id} 
            </Link>
          </p>
          <Button onClick={()=>deleteFormClickHandler(form._id)} loading={deleteLoader === form._id}>
            Delete
          </Button>
        </Card>
      </List.Item>
    )}
  />
  )
}  
export default FromsList;
