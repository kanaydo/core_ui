import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import CoreLayout from '../components/layouts/layout'
import styles from '../styles/Home.module.css'
import { NextPageWithLayout } from './_app'

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
