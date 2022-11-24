import CustomerForm from "@components/customers/customer_form";
import CoreLayout from "@components/layouts/layout";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { customerShow } from "@requests/customer_api";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

const CustomerEdit: NextPageWithLayout = (params: any) => {
  const customerData = useQuery([`role_${params.id}_detail`], () => customerShow(params.id));


  if (customerData.isLoading) {
    return (
      <>
        <Spin/>
      </>
    )  
  }

  if (customerData.isError) {
    return (
      <>
        <small>{JSON.stringify(customerData.error)}</small>
      </>
    )
  }

  return (
    // <CustomerForm customer={customerData.data}/>
    <div/>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id: id
    }
  };
}

CustomerEdit.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Edit'}>
      {page}
    </CoreLayout>
  )
}

export default CustomerEdit