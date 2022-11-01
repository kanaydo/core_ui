import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CoreLayout from "@components/layouts/layout";
import { CustomerEntity } from '@coretypes/entities';
import { NextPageWithLayout } from "@coretypes/layout_types";
import { TableParams } from '@coretypes/utils_interface';
import { customerDestroy, customerIndex } from '@requests/customer_api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, notification, Popconfirm, Space, Table, TablePaginationConfig, Tag, Tooltip } from "antd";
import { ColumnsType } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import { ReactElement, useState } from "react";

const CustomerIndex: NextPageWithLayout = () => {
  const getCustomerParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const [data, setData] = useState<CustomerEntity[]>([]);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40'],
    },
  });

  const {
    isLoading
  } = useQuery(['paging_administrators', tableParams], () => customerIndex(qs.stringify(getCustomerParams(tableParams))), {
    onSuccess: (_data) => {
      setData(_data.items);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: _data.meta.totalItems
        }
      });
    },
    onError: (_err) => {
      console.log(_err);
    },
  })

  const destroyCustomerMutation = useMutation((customerId: any) => customerDestroy(customerId), {
    onSuccess(_, variables, ___) {
      notification['success']({
        message: `successfully remove role`
      });
      const newData = data.filter(_item => _item?.id !== variables);
      setData(newData);
    },
    onError(error, _, __) {
      notification['error']({
        message: 'Login Error',
        description: `${error}`
      });
    },
  });
  
  const columns: ColumnsType<CustomerEntity> = [
    {
      title: '#',
      dataIndex: 'id',
      showSorterTooltip: false,
      width: '2%',
      render: (_, __, index) => {
        return (
          <small>{index + 1}</small>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      align: 'center',
      showSorterTooltip: false,
      width: '5%',
      render: (_, record, __) => {
        return (
          <>
            <Tooltip title="edit role">
              <Button type="link" size='small' href={`customers/${record.id}/edit`}>
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="remove customer">
              <Popconfirm
                title={`Are you sure to delete ${record.firstName} ${record.lastName}?`}
                placement="right"
                onConfirm={() => destroyCustomerMutation.mutate(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined style={{ color: 'red' }} />
              </Popconfirm>
            </Tooltip>
          </>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'firstName',
      render: (_, record, __) => {
        return (
          <b>{`${record.firstName} ${record.lastName}`}</b>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
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
      filters: [
        {
          text: 'Active',
          value: 'active',
        },
        {
          text: 'Inactive',
          value: 'inactive',
        },
      ],
    }
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<CustomerEntity> | SorterResult<CustomerEntity>[],
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <>
      <Space>
        <b>Customer List</b>
        <Button icon={<PlusOutlined />} href='customers/new' shape='circle'/>
      </Space>
      <Table
        showSorterTooltip={false}
        style={{ paddingTop: '16px' }}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={isLoading}
        size='small'
        onChange={(pagination, filters, sorter) => handleTableChange(pagination, filters, sorter)}
      />
    </>
  )
}

CustomerIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Customers'}>
      {page}
    </CoreLayout>
  )
}

export default CustomerIndex