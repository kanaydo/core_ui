import { NextPageWithLayout } from "@coretypes/layout_types";
import { ReactElement } from "react";
import CoreLayout from "@components/layouts/layout";

const AdministratorShow: NextPageWithLayout = () => {
  
  return (
    <h1>henloo</h1>
  )
}

AdministratorShow.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Administrators'}>
      {page}
    </CoreLayout>
  )
}

export default AdministratorShow