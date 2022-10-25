import { AdministratorEntity } from "@coretypes/entities";
import { administratorCreate, administratorNew, administratorUpdate } from "@requests/administrator_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, notification, Spin } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { useRouter } from "next/router";

interface AdministratorFormProps {
  administrator?: AdministratorEntity
}

export default function AdministratorForm({ administrator }: AdministratorFormProps) {
  const router = useRouter();

  const newAdministrator = useQuery(['prepare_administrator_new'], () => administratorNew());

  const createAdministratorMutation = useMutation(params => administratorCreate(params), {
    onSuccess(data, _, __) {
      notification['success']({
        message: `${data.name} successfully created`
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

  const updateAdministratorMutation = useMutation(params => administratorUpdate(administrator!.id, params), {
    onSuccess(data, _, __) {
      notification['success']({
        message: `${data.name} successfully updated`
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

  const mapToCheckBoxKey = (data: any) => {
    return { label: data.name, value: data.id }
  }

  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
  };

  let rolePicker = <Spin />
  if (newAdministrator.isError) {
    rolePicker = <b>Error Cokk</b>
  }


  if (newAdministrator.data) {
    const options = newAdministrator.data.map(mapToCheckBoxKey);
    rolePicker = (
      <Checkbox.Group
        options={options}
        onChange={onChange}
        style={{ display: "inline-block", marginRight: 10 }}
      />
    )
  }

  const submitForm = (params: any) => {
    if (administrator === undefined) {
      createAdministratorMutation.mutate(params);
    } else {
      updateAdministratorMutation.mutate(params);
    }
    console.log(params);
  }

  return (
    <>
      {administrator === undefined ? <b>New Administrator</b> : <b>Edit Administrator</b>}
      <Form
        disabled={createAdministratorMutation.isLoading}
        style={{ marginTop: '32px' }}
        name="role_form"
        initialValues={{ remember: true }}
        onFinish={submitForm}
        colon={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        autoComplete="off">
        <Form.Item
          name="username"
          label="Username"
          initialValue={`${administrator?.username ?? ''}`}
          rules={[{ required: true, message: 'please input username!' }]}
          >
          <Input placeholder='set username, will used on login credential' />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: administrator == undefined, message: 'password is required' }]}
          >
          <Input placeholder='set password, will used on login credential' />
        </Form.Item>
        <Form.Item
          name="password_confirmation"
          label="Confirmation"
          rules={[{ required: administrator == undefined, message: 'password confirmation is required' }]}
          >
          <Input placeholder='password confirmation should same with password' />
        </Form.Item>
        <Form.Item
          name="roleList"
          label="Role"
          initialValue={administrator?.roleList}>
          {rolePicker}
        </Form.Item>
        <Form.Item label=" " style={{ marginTop: '16px' }}>
          <Button type="primary" htmlType="submit" loading={createAdministratorMutation.isLoading}>
            {administrator == undefined ? 'Create Administrator' : 'Update Administrator'}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}