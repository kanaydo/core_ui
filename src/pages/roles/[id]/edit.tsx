import CoreLayout from "@components/layouts/layout";
import RoleForm from "@components/roles/role_form";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { roleDetail } from "@requests/role_api";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

const RoleEditPage: NextPageWithLayout = (params : any) => {
  const q_detailRole = useQuery([`role_${params.id}_detail`], () => roleDetail(params.id));


  if (q_detailRole.isLoading) {
    return (
      <>
        <Spin/>
      </>
    )  
  }

  if (q_detailRole.isError) {
    return (
      <>
        <small>{JSON.stringify(q_detailRole.error)}</small>
      </>
    )
  }

  return (
    <>
    <b>Update Role</b>
    <RoleForm role={q_detailRole.data.role}/>
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