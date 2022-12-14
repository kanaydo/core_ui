import { ProfileOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Layout, Menu, Typography } from 'antd';
import { getCookie, setCookie } from 'cookies-next';
import Head from "next/head";

import type { MenuProps } from 'antd';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserSession from "./user_session";

import { useRouter } from "next/router";
import Breadcrumbs from "nextjs-antd-breadcrumbs";
import SignOutButton from "./sign_out_button";
const { Header, Content, Sider, Footer } = Layout;
const { Text } = Typography;



type CoreLayoutProps = {
  children: React.ReactNode,
  title: string
};

const items: MenuProps['items'] = [
  {
    label: (
      <strong>
        <Link href="/">
          CORE UI
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
              <Link href="/customers">
                {'Customer'}
              </Link>
            ),
            key: 'master_data:customer',
          }
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
            label: (
              <Link href="/administrators">
                {'Administrator'}
              </Link>
            ),
            key: 'setting:1',
          },
          {
            label: (
              <Link href="/roles">
                {'Role'}
              </Link>
            ),
            key: 'setting:2',
          },
        ],
      },
      // {
      //   type: 'group',
      //   label: 'Item 2',
      //   children: [
      //     {
      //       label: 'Option 3',
      //       key: 'setting:3',
      //     },
      //     {
      //       label: 'Option 4',
      //       key: 'setting:4',
      //     },
      //   ],
      // },
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
      // {
      //   type: 'group',
      //   label: 'Preferences',
      //   children: [
      //     {
      //       label: 'Administrator',
      //       key: 'session:1',
      //     },
      //     {
      //       label: 'Role',
      //       key: 'session:2',
      //     },
      //   ],
      // },
      // {
      //   type: 'group',
      //   label: 'Item 2',
      //   children: [
      //     {
      //       label: 'Option 3',
      //       key: 'session:3',
      //     },
      //     {
      //       label: 'Option 4',
      //       key: 'session:4',
      //     },
      //   ],
      // },
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
  const router = useRouter();
  const [current, setCurrent] = useState('core');
  const onClick: MenuProps['onClick'] = e => {
    setCookie('active_item', e.key);
    setCurrent(e.key);
  };

  useEffect(() => {
    const currentMenu = getCookie('active_item') as string;
    if (currentMenu) {
      setCurrent(currentMenu);
    }
  }, [])

  return (
    <>
      <Head>
        <title>{`Core UI - ${title}`}</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
      </Head>
      <Layout style={{backgroundColor: 'white'}}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} triggerSubMenuAction='click'/>
        <Breadcrumbs rootLabel="Home" omitRootLabel={false} style={{padding: '8px 16px'}}/>
        <Content style={{ padding: '0px 16px'}}>
          <Card size="small">{ children }</Card>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <Text type="secondary"><small>Core UI ??2022 Created by RSD</small></Text>
        </Footer>
      </Layout>
    </>
  )
}