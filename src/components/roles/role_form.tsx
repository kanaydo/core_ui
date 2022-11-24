import { RoleEntity } from "@coretypes/entities";
import { createRole, prepareRole, updateRole } from "@requests/role_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, notification, Spin, Tree } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
const { TextArea } = Input;

interface RoleFormProps {
  role?: RoleEntity
}

export default function RoleForm({ role }: RoleFormProps) {
  const router = useRouter();
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(role?.sectionList ?? []);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const prepareRoles = useQuery(['todos'], prepareRole);

  const createRoleMutation = useMutation((params: any) => {
    const createRoleParams = { ...params, ...{ sections: checkedKeys } };
    return createRole(createRoleParams);
  }, {
    onSuccess(data, _, __) {
      message.success(`Role ${data.name} successfully created`);
      router.replace('/roles');
    },
    onError(error, _, __) {
      message.error(`${error}`);
    },
  });

  const updateRoleMutation = useMutation((update: any) => {
    const updateRoleParams = { ...update, ...{ section_list: checkedKeys } };
    return updateRole(role!.id, updateRoleParams);
  }, {
    onSuccess(data, _, __) {
      message.success(`Role ${data.name} successfully updated`);
      router.replace('/roles');
    },

    onError(error, _, __) {
      message.error(`${error}`);
    },
  });

  const handleSubmit = (params: any) => {
    if (role === undefined) {
      createRoleMutation.mutate(params);
    } else {
      updateRoleMutation.mutate(params);
    }
  }

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
      <Form
        disabled={createRoleMutation.isLoading || updateRoleMutation.isLoading}
        name="role_form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        style={{ marginTop: '32px' }}
        colon={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        autoComplete="off">
        <Form.Item
          name="name"
          label="Role Name"
          initialValue={`${role?.name ?? ''}`}
          rules={[{ required: true, message: 'Please input role name!' }]}>
          <Input placeholder='role name' />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description (optional)"
          initialValue={`${role?.description ?? ''}`}
          rules={[{ required: false }]}>
          <TextArea rows={3} placeholder="explain role description here" />
        </Form.Item>
        <Form.Item
          name="section_list"
          label="Permission Rule">
          {(prepareRoles.data) ? <Tree
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
            treeData={prepareRoles.data?.sections}
          /> : <Spin size="large" />}
        </Form.Item>
        <Form.Item style={{ marginTop: '16px' }} label=" ">
          <Button type="primary" htmlType="submit" loading={createRoleMutation.isLoading || updateRoleMutation.isLoading}>
            {role === undefined ? 'Create Role' : 'Update Role'}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}