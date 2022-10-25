import CoreLayout from "@components/layouts/layout";
import RoleForm from "@components/roles/role_form";
import { RoleEntity } from "@coretypes/entities";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { createRole, prepareRole, roleDetail, updateRole } from "@requests/role_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, notification, Spin, Tree } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";

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
    <RoleForm role={q_detailRole.data}/>
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