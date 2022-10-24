import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { ReactElement, useEffect, useState } from "react"
import CoreLayout from "../../components/layouts/layout"
import { AdministratorEntity } from "../../interfaces/entity/entity_interfaces";
import { TableParams } from "../../interfaces/utils_interface";
import { NextPageWithLayout } from "../_app"
import qs from 'qs';
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import axiosClient from "../../lib/api_client";
import { createRole, prepareRole } from "../../api_bridge/role_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Divider, Form, Input, notification, Spin } from "antd";
import Tree, { DataNode } from "antd/lib/tree";
import { useRouter } from "next/router";
const { TextArea } = Input;

const RoleNew: NextPageWithLayout = () => {
  const router = useRouter();
  const [declaredSection, setDeclaredSection] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const { isLoading } = useQuery(
    ['todos'],
    prepareRole,
    {
      onError: (err) => {

      },
      onSuccess: (data) => {
        setDeclaredSection(data);
      },
    }
  )

  const createRoleMutation = useMutation((params: any) => {
    const createRoleParams = {...params, ...{ sections: checkedKeys } };
    return createRole(createRoleParams);
  }, {
    onSuccess(data, _, __) {
      notification['success']({
        message: `Role ${data.name} successfully created`
      });
      router.back();
    },
    onError(error, _, __) {
      notification['error']({
        message: 'Login Error',
        description: `${error}`
      });
    },
  });

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <>
      <h4>Create Role New</h4>
      <Form
        disabled={createRoleMutation.isLoading}
        name="role_form"
        initialValues={{ remember: true }}
        onFinish={createRoleMutation.mutate}
        layout='vertical'
        autoComplete="off">
        <Form.Item
          name="name"
          label="Role Name"
          rules={[{ required: true, message: 'Please input role name!' }]}>
          <Input placeholder='role name' />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description (optional)"
          rules={[{ required: false }]}>
          <TextArea rows={3} placeholder="explain role description here"/>
        </Form.Item>
        {isLoading ? <Spin size="large" /> : <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={(val) => {
            const checked = val as React.Key[];
            onCheck(checked);
            console.log(val);
          }}
          checkedKeys={checkedKeys}
          onSelect={onSelect}
          selectedKeys={selectedKeys}
          treeData={declaredSection}
        />}
        <Form.Item style={{ marginTop: '16px' }}>
          <Button type="primary" htmlType="submit" loading={createRoleMutation.isLoading}>
            Create Role
          </Button>
        </Form.Item>
      </Form>

    </>
  )
}

RoleNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Roles'}>
      {page}
    </CoreLayout>
  )
}

export default RoleNew