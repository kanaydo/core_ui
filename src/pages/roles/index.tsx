import { PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';
import { NextPageWithLayout } from '@coretypes/layout_types';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Space, Tag, DatePicker } from "antd";
import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { ColumnType, FilterConfirmProps, FilterValue, SorterResult } from "antd/lib/table/interface";
import qs from 'qs';
import { ReactElement, useState } from "react";
import Highlighter from 'react-highlight-words';
import { pagingRoleIndex } from '@requests/role_api';
import CoreLayout from "@components/layouts/layout";
import { RoleEntity } from "@coretypes/entities";
import { TableParams } from "@coretypes/utils_interface";

const { RangePicker } = DatePicker;


const RoleIndex: NextPageWithLayout = () => {
  type DataIndex = keyof RoleEntity;
  const getAdministratorParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const [data, setData] = useState();
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
  } = useQuery(['paging_administrators', tableParams], () => pagingRoleIndex(qs.stringify(getAdministratorParams(tableParams))), {
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

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<RoleEntity> | SorterResult<RoleEntity>[],
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

  const getColumnDatePickerProps = (dataIndex: DataIndex, navigate?: string): ColumnType<RoleEntity> => ({
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

  const getColumnSearchProps = (dataIndex: DataIndex, navigate?: string): ColumnType<RoleEntity> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 16 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
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
        return (
          <strong>
            <Highlighter
              highlightStyle={{ padding: 0, color: '#014477' }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={value ? value.toString() : ''}
            />
          </strong>
        )
      }
      return (
        <div>
          <strong>{value}</strong>
          <br />
          <Button
            shape="circle"
            type='link'
            size='small'
            icon={<EditOutlined />}
          />
        </div>
      )
    },
  });

  const columns: ColumnsType<RoleEntity> = [
    {
      title: '#',
      dataIndex: 'id',
      showSorterTooltip: false,
      width: '5%',
      render: (_, __, index) => {
        return (
          <small>{index + 1}</small>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true,
      ...getColumnSearchProps('name')
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: '15%',
      sorter: true,
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
      <Button icon={<PlusOutlined />} href='roles/new'>
        <small style={{ marginLeft: '8px' }}>
          <strong>Create</strong>
        </small>
      </Button>
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

RoleIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <CoreLayout title={'Roles'}>
      {page}
    </CoreLayout>
  )
}

export default RoleIndex