import { NextPageWithLayout } from "@coretypes/layout_types";
import { ReactElement } from "react";
import CoreLayout from "@components/layouts/layout";

const AdministratorNew: NextPageWithLayout = () => {
  
  return (
    <h1>New</h1>
  )
}

AdministratorNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Administrators'}>
      {page}
    </CoreLayout>
  )
}

export default AdministratorNew