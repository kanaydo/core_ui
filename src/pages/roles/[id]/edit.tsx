import CoreLayout from "@components/layouts/layout";
import { RoleEntity } from "@coretypes/entities";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { createRole, prepareRole, roleDetail, updateRole } from "@requests/role_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, notification, Spin, Tree } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";

const RoleEditPage: NextPageWithLayout = (params : any) => {
  const [declaredSection, setDeclaredSection] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const prepareRoleData = useQuery(
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
  
  const detailRole = useQuery([`role_${params.id}_detail`], () => roleDetail(params.id), {
    onSuccess: (_data) => {
      setCheckedKeys(_data.sections);
    },
    onError: (_err) => {
      console.log(_err);
    }
  });

  const updateRoleMutation = useMutation((update: any) => {
    const updateRoleParams = {...update, ...{ sections: checkedKeys } };
    return updateRole(params.id, updateRoleParams);
  }, {
    onSuccess(data, _, __) {
      notification['success']({
        message: `Role ${data.name} successfully created`
      });
    },
    onError(error, _, __) {
      notification['error']({
        message: 'Login Error',
        description: `${error}`
      });
    },
  });

  const onExpand = (expandedKeysValue: React.Key[]) => {
    // console.log('onExpand', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    // console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    // console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  if (detailRole.isLoading) {
    return (
      <>
        <h4>Create Role New</h4>
        <Spin/>
      </>
    )  
  }

  return (
    <>
      <h4>Create Role New</h4>
      <Form
        disabled={updateRoleMutation.isLoading}
        name="role_form"
        onFinish={updateRoleMutation.mutate}
        layout='vertical'
        autoComplete="off">
        <Form.Item
          name="name"
          initialValue={`${detailRole.data.name}`}
          label={`Role Detail`}
          rules={[{ required: true, message: 'Please input role name!' }]}>
          <Input placeholder='role name' />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description (optional)"
          initialValue={`${detailRole.data.description ?? ''}`}
          rules={[{ required: false }]}>
          <TextArea rows={3} placeholder="explain role description here"/>
        </Form.Item>
        {(prepareRoleData.isLoading || detailRole.isLoading) ? <Spin size="large" /> : <Tree
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
          <Button type="primary" htmlType="submit" loading={updateRoleMutation.isLoading}>
            Create Role
          </Button>
        </Form.Item>
      </Form>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id
    }
  };
}

RoleEditPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Edit Role'}>
      {page}
    </CoreLayout>
  )
}

export default RoleEditPage