import Head from "next/head";
import { Breadcrumb, Layout, Menu } from 'antd';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MailOutlined, ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import type { MenuProps } from 'antd';
import Link from "next/link";
import { blue } from '@ant-design/colors';
import UserSession from "./user_session";

import SignOutButton from "./sign_out_button";
const { Header, Content, Sider, Footer } = Layout;


type CoreLayoutProps = {
  children: React.ReactNode,
  title: string
};

const items: MenuProps['items'] = [
  {
    label: (
      <strong>
        <Link href="/">
          Core UI
        </Link>
      </strong>
    ),
    key: 'core',
  },
  {
    label: 'MasterData',
    key: 'master_data',
    icon: <ProfileOutlined />,
    children: [
      {
        type: 'group',
        label: 'Preferences',
        children: [
          {
            label: (
              <Link href="/administrators">
                {'Administrator'}
              </Link>
            ),
            key: 'master_data:1',
          },
          {
            label: 'Role',
            key: 'master_data:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'master_data:3',
          },
          {
            label: 'Option 4',
            key: 'master_data:4',
          },
        ],
      },
    ],
  },
  {
    label: 'Setting',
    key: 'setting',
    icon: <SettingOutlined />,
    children: [
      {
        type: 'group',
        label: 'Preferences',
        children: [
          {
            label: 'Administrator',
            key: 'setting:1',
          },
          {
            label: 'Role',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    label: (
      <UserSession />
    ),
    key: 'session',
    style: { marginLeft: 'auto' },
    icon: <UserOutlined />,
    children: [
      {
        type: 'group',
        label: 'Preferences',
        children: [
          {
            label: 'Administrator',
            key: 'session:1',
          },
          {
            label: 'Role',
            key: 'session:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'session:3',
          },
          {
            label: 'Option 4',
            key: 'session:4',
          },
        ],
      },
      {
        label: (
          <SignOutButton />
        ),
        key: 'sign_out',
      },
    ],
  },
];

export default function CoreLayout({ children, title }: CoreLayoutProps) {
  const [current, setCurrent] = useState('core');

  const onClick: MenuProps['onClick'] = e => {
    // console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Head>
        <title>{`Core UI - ${title}`}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </Head>
      <Layout style={{backgroundColor: 'white'}}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Content style={{ padding: '8px 16px'}}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Core UI ©2022 Created by RSD</Footer>
      </Layout>
    </>
  )
}