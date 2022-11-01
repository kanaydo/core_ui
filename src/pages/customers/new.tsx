import CustomerForm from "@components/customers/customer_form";
import CoreLayout from "@components/layouts/layout";
import { NextPageWithLayout } from "@coretypes/layout_types";
import { ReactElement } from "react";

const CustomerNew: NextPageWithLayout = () => {
  return (
    <>
      <CustomerForm/>
    </>
  )
}

CustomerNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={''}>
      {page}
    </CoreLayout>
  )
}

export default CustomerNew