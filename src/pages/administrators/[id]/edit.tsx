import AdministratorForm from "@components/administrators/administrator_form";
import CoreLayout from "@components/layouts/layout";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { administratorShow } from "@requests/administrator_api";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

const AdministratorEdit: NextPageWithLayout = (props : any) => {
  const { isError, isLoading, data, error } = useQuery([`administrator_${props.id}_show`], () => administratorShow(props.id));

  if (isLoading) {
    return (
      <Spin/>
    )
  }

  if (isError) {
    return (
      <i>{JSON.stringify(error)}</i>
    )
  }

  return (
    <AdministratorForm administrator={data}/>
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

AdministratorEdit.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Edit Administrator'}>
      {page}
    </CoreLayout>
  )
}

export default AdministratorEdit