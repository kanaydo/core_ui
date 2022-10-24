import CoreLayout from '@components/layouts/layout'
import { NextPageWithLayout } from '@coretypes/layout_types'
import { ReactElement } from 'react'


const Home: NextPageWithLayout = () => {
  return (
    <div>Henlooo</div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Dashboard'}>
      {page}
    </CoreLayout>
  )
}

export default Home
