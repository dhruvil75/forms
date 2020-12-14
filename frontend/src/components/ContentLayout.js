import React from 'react'
import { Layout } from 'antd';
import ModalWrapper from './ModalWrapper';
import FormsList from './FormsList';
const { Content } = Layout;

function ContentLayout() {
  return (
    <Content style={{ padding: '0 50px' }}>
      <ModalWrapper/>
      <div className="site-layout-content">
        <FormsList/>
      </div>
    </Content>
  )
}

export default ContentLayout;
