import { NextPageWithLayout } from "@coretypes/layout_types";
import { ReactElement } from "react";
import CoreLayout from "@components/layouts/layout";
import AdministratorForm from "@components/administrators/administrator_form";

const AdministratorNew: NextPageWithLayout = () => {
  return (
    <>
      <AdministratorForm/>
    </>
  )
}

AdministratorNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Create Administrator'}>
      {page}
    </CoreLayout>
  )
}

export default AdministratorNew