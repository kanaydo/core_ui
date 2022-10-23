import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { ReactElement, useEffect, useState } from "react"
import CoreLayout from "../../components/layouts/layout"
import { AdministratorEntity } from "../../interfaces/entity/entity_interfaces";
import { TableParams } from "../../interfaces/utils_interface";
import { NextPageWithLayout } from "../_app"
import qs from 'qs';
import { FilterValue, SorterResult } from "antd/lib/table/interface";

const columns: ColumnsType<AdministratorEntity> = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: 'UserName',
    dataIndex: 'username'
  },
  {
    title: 'created At',
    dataIndex: 'createdAt',
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
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getAdministratorParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<AdministratorEntity>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={() => handleTableChange }
    />
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