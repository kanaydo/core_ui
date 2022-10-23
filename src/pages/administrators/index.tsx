import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { PlusOutlined } from '@ant-design/icons';
import { ReactElement, useEffect, useState } from "react"
import CoreLayout from "../../components/layouts/layout"
import { AdministratorEntity } from "../../interfaces/entity/entity_interfaces";
import { TableParams } from "../../interfaces/utils_interface";
import { NextPageWithLayout } from "../_app"
import qs from 'qs';
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import axiosClient from "../../lib/api_client";
import { Button, Tag } from "antd";

const columns: ColumnsType<AdministratorEntity> = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: '5%',
    align: 'center',
    render: (value, _, __) => {
      return (
        <small>{`#${value}`}</small>
      );
    },
  },
  {
    title: 'UserName',
    dataIndex: 'username',
    sorter: true,
    render: (value, record, __) => {
      return (
        <a href={`administrators/${record.id}`}>
          <strong>{value}</strong>
        </a>
      );
    },
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    width: '10%'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    width: '10%',
    render: (value, _, __) => {
      const stage = value == 'active' ? 'success' : 'error'
      return <Tag color={stage}>{value}</Tag>
    },
  }
];

const getAdministratorParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const AdministratorIndex: NextPageWithLayout = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40'],
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const response = await axiosClient().get(`http://localhost:3000/administrators?${qs.stringify(getAdministratorParams(tableParams))}`);
    const { items, meta } = response.data;
    console.log(meta, tableParams.pagination);
    setData(items);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: meta.totalItems
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AdministratorEntity> | SorterResult<AdministratorEntity>[],
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <>
      <Button icon={<PlusOutlined />} href='administrators/new'>
        <small style={{ marginLeft: '8px' }}>
          <strong>Create</strong>
        </small>
      </Button>
      <Table
        style={{ paddingTop: '16px' }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        size='small'
        onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
      />
    </>

  )
}

AdministratorIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Administrators'}>
      {page}
    </CoreLayout>
  )
}

export default AdministratorIndex