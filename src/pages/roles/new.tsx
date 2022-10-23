import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { ReactElement, useEffect, useState } from "react"
import CoreLayout from "../../components/layouts/layout"
import { AdministratorEntity } from "../../interfaces/entity/entity_interfaces";
import { TableParams } from "../../interfaces/utils_interface";
import { NextPageWithLayout } from "../_app"
import qs from 'qs';
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import axiosClient from "../../lib/api_client";

const RoleNew: NextPageWithLayout = () => {
  
  return (
    <h1>Role New</h1>
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