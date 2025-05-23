
// export default function Dashboard() {
//   return <h1 style={{ padding: "2rem" }}>Добро пожаловать в Dashboard!</h1>;
// }

import React, { type FC } from 'react';
import { Flex, Layout } from 'antd';
import '../style/dashboard.css'
import { Sider } from '../components/Sider';

 export const Dashboard:FC = () => {
  return (
     <Flex gap="middle" wrap>
    <Layout className='layout' >
      <Layout.Sider className='sider' width="15%" >
        <Sider />
      </Layout.Sider>
      <Layout>
        <Layout.Header className='header' >Header</Layout.Header>
        <Layout.Content className='content'>Content</Layout.Content>
        <Layout.Footer className='footer'>Footer</Layout.Footer>
      </Layout>
    </Layout>
  </Flex>
  )
}


