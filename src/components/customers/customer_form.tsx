// import { CustomerEntity } from "@coretypes/entities";
import { customerCreate, customerUpdate } from "@requests/customer_api";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message, notification } from "antd";
import { useRouter } from "next/router";

// interface CustomerFormProps {
//   customer?: CustomerEntity
// }

export default function CustomerForm() { 
  const router = useRouter();

  const createCustomerMutation = useMutation(params => customerCreate(params), {
    onSuccess(data, _, __) {
      message.success(`${data.firstName} successfully created`);
      router.replace('/customers');
    },
    onError(error, _, __) {
      message.error(`${error}`);
    },
  });

  // const updateCustomerMutation = useMutation(params => customerUpdate(customer!.id, params), {
  //   onSuccess(data, _, __) {
  //     message.success(`${customer?.firstName ?? ''} successfully updated`);
  //     router.replace('/customers');
  //   },
  //   onError(error, _, __) {
  //     message.error(`${error}`);
  //   },
  // });

  // const submitForm = (params: any) => {
  //   if (customer === undefined) {
  //     createCustomerMutation.mutate(params);
  //   } else {
  //     updateCustomerMutation.mutate(params);
  //   }
  //   console.log(params);
  // }
  
  return (
    <>
      {/* {customer === undefined ? <b>New Customer</b> : <b>Edit Customer</b>}
      <Form
        disabled={createCustomerMutation.isLoading || updateCustomerMutation.isLoading}
        style={{ marginTop: '32px' }}
        name="role_form"
        initialValues={{ remember: true }}
        onFinish={submitForm}
        colon={false}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        autoComplete="off">
        <Form.Item
          name="firstName"
          label="First Name"
          hasFeedback
          initialValue={`${customer?.firstName ?? ''}`}
          rules={[{ required: true, message: 'please input first name!' }]}
          >
          <Input/>
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          hasFeedback
          initialValue={`${customer?.lastName ?? ''}`}
          >
          <Input/>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          initialValue={`${customer?.email ?? ''}`}
          rules={[{ required: true, type: 'email', message: 'please input valid email!' }]}
          >
          <Input/>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          hasFeedback
          initialValue={`${customer?.phone ?? ''}`}
          rules={[{ required: true, message: 'please input valid phone!' }]}
          >
          <Input/>
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          hasFeedback
          initialValue={`${customer?.address ?? ''}`}
          rules={[{ required: true, message: 'please input address!' }]}
          >
          <Input.TextArea rows={3} placeholder="explain role description here"/>
        </Form.Item>
        <Form.Item label=" " style={{ marginTop: '16px' }}>
          <Button type="primary" htmlType="submit" loading={createCustomerMutation.isLoading || updateCustomerMutation.isLoading}>
            {customer == undefined ? 'Create Customer' : 'Update Customer'}
          </Button>
        </Form.Item>
      </Form> */}
    </>
  )
}