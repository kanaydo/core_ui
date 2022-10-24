import CoreLayout from "@components/layouts/layout";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { ReactElement } from "react";


const RoleNew: NextPageWithLayout = () => {

  return (
    <>
      <h4>Create Role New</h4>
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