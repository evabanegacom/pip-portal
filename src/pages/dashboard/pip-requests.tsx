import { useMemo, useState } from 'react';
import { Table, Button, Input, Card, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// -----------------------------
// Types & Dummy Data
// -----------------------------
export type PIPRow = {
  id: number;
  employeeName: string;
  email: string;
  supervisor: string;
  jobRole: string;
  pipType: string;
  status: 'Pending 2nd LM' | 'Completed' | 'Yet to Start' | 'Pending LM';
};

const DUMMY_DATA: PIPRow[] = Array.from({ length: 42 }).map((_, i) => {
  const statuses: PIPRow['status'][] = ['Pending 2nd LM', 'Completed', 'Yet to Start', 'Pending LM'];
  return {
    id: i + 1,
    employeeName: 'Kehinde Adeyemo',
    email: 'kehinde.adeyemo@sterling.ng',
    supervisor: 'Erhuwvu Oghene',
    jobRole: 'Software Engineer',
    pipType: i % 4 === 0 ? 'Extension Review' : 'First Review',
    status: statuses[i % statuses.length],
  };
});

// Status tag colors
const statusColors: Record<PIPRow['status'], string> = {
  'Pending 2nd LM': 'orange',
  'Completed': 'green',
  'Yet to Start': 'default',
  'Pending LM': 'orange',
};

const PIPTableWithPagination = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!search.trim()) return DUMMY_DATA;

    const q = search.toLowerCase();
    return DUMMY_DATA.filter(row =>
      row.employeeName.toLowerCase().includes(q) ||
      row.email.toLowerCase().includes(q) ||
      row.supervisor.toLowerCase().includes(q) ||
      row.jobRole.toLowerCase().includes(q) ||
      row.pipType.toLowerCase().includes(q) ||
      row.status.toLowerCase().includes(q)
    );
  }, [search]);

  // Table columns
  const columns: ColumnsType<PIPRow> = [
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Supervisor',
      dataIndex: 'supervisor',
      key: 'supervisor',
    },
    {
      title: 'Job Role',
      dataIndex: 'jobRole',
      key: 'jobRole',
    },
    {
      title: 'PIP Type',
      dataIndex: 'pipType',
      key: 'pipType',
    },
    {
      title: 'PIP Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: PIPRow['status']) => (
        <Tag color={statusColors[status]}>{status}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 140,
      render: (_, record) => (
        <Button
          type="default"
          size="small"
          onClick={() => navigate(`/dashboard/review-pip-request/${record.id}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Card className="max-w-6xl mx-auto mt-8 shadow-md">
      <div className="p-4">
        {/* Search & Filter Bar */}
        <div className="flex items-center gap-3 mb-6">
          <Input
            placeholder="Search employees, email, supervisor..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 on search
            }}
            allowClear
            style={{ maxWidth: 400 }}
          />
          <Button icon={<FilterOutlined />}>Filter</Button>
        </div>

        {/* Ant Design Table with built-in pagination */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
            showSizeChanger: false,
            showTotal: total => `Showing ${((currentPage - 1) * pageSize + 1)}-${Math.min(currentPage * pageSize, total)} of ${total} entries`,
            onChange: (page) => setCurrentPage(page),
            position: ['bottomRight'],
          }}
          bordered
          size="middle"
          scroll={{ x: 'max-content' }} // horizontal scroll on small screens
          locale={{ emptyText: 'No PIP requests found' }}
        />
      </div>
    </Card>
  );
};

export default PIPTableWithPagination;