import Table, { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ReactElement, useEffect, useRef, useState } from "react"
import CoreLayout from "../../components/layouts/layout"
import { AdministratorEntity } from "../../interfaces/entity/entity_interfaces";
import { TableParams } from "../../interfaces/utils_interface";
import { NextPageWithLayout } from "../_app"
import qs from 'qs';
import { FilterConfirmProps, FilterValue, SorterResult } from "antd/lib/table/interface";
import axiosClient from "../../lib/api_client";
import { Button, Input, InputRef, Space, Tag, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { ColumnType } from "antd/es/table";
import Highlighter from "react-highlight-words";

const getAdministratorParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const AdministratorIndex: NextPageWithLayout = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const pickerInput = useRef<InputRef>(null);
  type DataIndex = keyof AdministratorEntity;
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
    // console.log('api call', tableParams)
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AdministratorEntity> | SorterResult<AdministratorEntity>[],
  ) => {
    console.log('table updated', filters);
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
          // value={selectedKeys}
          style={{ marginBottom: 8 }}
          onChange={ (_, s) => {
            setSelectedKeys(s ? s : []);
          }}
        />
        <br/>
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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


  const getColumnSearchProps = (dataIndex: DataIndex, navigate?: string): ColumnType<AdministratorEntity> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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
      sorter: true,
      showSorterTooltip: false,
      width: '5%',
      render: (_, __, index) => {
        return (
          <small>{index + 1}</small>
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
      <Button icon={<PlusOutlined />} href='administrators/new'>
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