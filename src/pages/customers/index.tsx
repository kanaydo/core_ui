import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import CoreLayout from "@components/layouts/layout";
import { CustomerEntity } from '@coretypes/entities';
import { NextPageWithLayout } from "@coretypes/layout_types";
import { TableParams } from '@coretypes/utils_interface';
import { customerDestroy, customerIndex } from '@requests/customer_api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Input, message, Popconfirm, Space, Table, TablePaginationConfig, Tag, Tooltip } from "antd";
import { ColumnsType } from 'antd/es/table';
import { ColumnType, FilterConfirmProps, FilterValue, SorterResult } from 'antd/es/table/interface';
import Link from 'next/link';
import qs from 'qs';
import { ReactElement, useState } from "react";
import Highlighter from 'react-highlight-words';

const CustomerIndex: NextPageWithLayout = () => {
  type DataIndex = keyof CustomerEntity;
  const getCustomerParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const [data, setData] = useState<CustomerEntity[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

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
      message.success(`successfully remove customer`);
      const newData = data.filter(_item => _item?.id !== variables);
      setData(newData);
    },
    onError(error, _, __) {
      message.error(`${error}`);
    },
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void,
  ) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
    isBold: boolean = false,
    navigate: boolean = false,
  ): ColumnType<CustomerEntity> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 16 }}>
        <Input
          placeholder={`Search`}
          value={selectedKeys[0]}
          size='small'
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    render: (value, record, __) => {
      if (searchedColumn === dataIndex) {
        let hiLight = <Highlighter
          highlightStyle={{ padding: 0, color: '#014477' }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={value ? value.toString() : ''}
        />;
        if (navigate) {
          hiLight = <Link href={`customers/${record.id}`}>{hiLight}</Link>
        }

        return (
          <div>
            {isBold ? <strong>{hiLight}</strong> : hiLight}
          </div>
        )
      }

      let content = <div>{value}</div>;
      if (navigate) {
        content = <Link href={`customers/${record.id}`}>{content}</Link> 
      }
      return (
        
        <div>
          {isBold ? <strong>{content}</strong> : <div>{content}</div>}
        </div>
      )
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
            <Tooltip title="edit customer">
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
      ...getColumnSearchProps('firstName', true, true)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ...getColumnSearchProps('address')
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
        <Button icon={<PlusOutlined />} href='customers/new' shape='circle' />
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