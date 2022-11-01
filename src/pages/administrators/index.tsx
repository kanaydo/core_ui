import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { NextPageWithLayout } from '@coretypes/layout_types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, DatePicker, Input, InputRef, notification, Popconfirm, Space, Tag, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';
import Table, { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import { FilterConfirmProps, FilterValue, SorterResult } from 'antd/lib/table/interface';
import qs from 'qs';
import { ReactElement, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';

import { administratorDestroy, administratorIndex } from '@requests/administrator_api';
import CoreLayout from '@components/layouts/layout';
import { AdministratorEntity } from '@coretypes/entities';
import { TableParams } from '@coretypes/utils_interface';

const { RangePicker } = DatePicker;

const getAdministratorParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const AdministratorIndex: NextPageWithLayout = () => {
  const [data, setData] = useState<AdministratorEntity[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  type DataIndex = keyof AdministratorEntity;

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
  } = useQuery(['paging_administrators', tableParams], () => administratorIndex(qs.stringify(getAdministratorParams(tableParams))), {
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

  const M_destroyAdministrator = useMutation((roleId: any) => administratorDestroy(roleId), {
    onSuccess(_, variables, ___) {
      notification['success']({
        message: `successfully remove administrator`
      });
      const newData = data.filter(_item => _item?.id !== variables);
      setData(newData);
    },
    onError(error, _, __) {
      notification['error']({
        message: 'Failed to Remove',
        description: `${error}`
      });
    },
  });

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

  const getColumnDatePickerProps = (dataIndex: DataIndex, navigate?: string): ColumnType<AdministratorEntity> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <RangePicker
          size="small"
          // value={selectedKeys}
          style={{ marginBottom: 8 }}
          onChange={(_, s) => {
            setSelectedKeys(s ? s : []);
          }}
        />
        <br />
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
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    render: (value, _, __) => {
      return (
        value
      )
    },
  });


  const getColumnSearchProps = (dataIndex: DataIndex, navigate?: string): ColumnType<AdministratorEntity> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 16 }}>
        <Input
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          size='small'
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          // onPressEnter={(e) => {
          //   handleSearch(selectedKeys as string[], confirm, dataIndex);
          // }}
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
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    render: (value, record, __) => {
      if (searchedColumn === dataIndex) {
        return (
          <a href={`administrators/${record.id}`}>
            <strong>
              <Highlighter
                highlightStyle={{ padding: 0, color: '#014477' }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={value ? value.toString() : ''}
              />
            </strong>

          </a>

        )
      }
      return (
        <a href={`administrators/${record.id}`}>
          <strong>{value}</strong>
        </a>
      )
    },
  });

  const columns: ColumnsType<AdministratorEntity> = [
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
            <Tooltip title="edit administrator">
              <Button type="link" size='small' href={`administrators/${record.id}/edit`}>
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="remove administratos">
              <Popconfirm
                title={`Are you sure to delete ${record.username}?`}
                placement="right"
                onConfirm={() => M_destroyAdministrator.mutate(record.id)}
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
      title: 'UserName',
      dataIndex: 'username',
      sorter: true,
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: '15%',
      ...getColumnDatePickerProps('createdAt')
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

  return (
    <>
      <Space>
        <b>Administrator List</b>
        <Button icon={<PlusOutlined />} href='administrators/new' shape='circle'/>
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

AdministratorIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Administrators'}>
      {page}
    </CoreLayout>
  )
}

export default AdministratorIndex