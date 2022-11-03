import CoreLayout from "@components/layouts/layout";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { ReactElement } from "react";

const CustomerShowPage: NextPageWithLayout = () => {
  return (
    <>
      <h4>CustomerShowPage</h4>
    </>
  )
}

CustomerShowPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={''}>
      {page}
    </CoreLayout>
  )
}

export default CustomerShowPage