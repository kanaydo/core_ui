import CoreLayout from "@components/layouts/layout";
import RoleForm from "@components/roles/role_form";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { ReactElement } from "react";

const RoleNew: NextPageWithLayout = () => {
  return (
    <>
      <h4>Create Role</h4>
      <RoleForm/>
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