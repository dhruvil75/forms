import React from 'react'
import { Layout } from 'antd';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SingleForm from "./SingleForm";
import ContentLayout from './ContentLayout';

const { Header, Footer } = Layout;

function Home() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Route exact path='/' component={ContentLayout}/>
        <Route exact path='/:formId' component={SingleForm}/>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Router>
  )
}

export default Home;
