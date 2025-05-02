import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Button,
  Typography,
  TextField,
  Box
} from '@mui/material';

interface DataRow {
  appId: string;
  scheduler: string;
  jobId: number;
  status: string;
  csv: string;
}

const initialRows: DataRow[] = [
  { appId: 'TBCS', scheduler: 'PB1', jobId: 4584, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 3741, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 4265, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 3000, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB1', jobId: 6468, status: 'scheduled', csv: 'Unavailable' },
  { appId: 'TBCS', scheduler: 'PB2', jobId: 4585, status: 'completed', csv: 'Download' },
  { appId: 'TBCS', scheduler: 'PB3', jobId: 4586, status: 'scheduled', csv: 'Download' },
  { appId: 'TBCS', scheduler: 'PB4', jobId: 4587, status: 'failed', csv: 'Unavailable' },
  { appId: '1CCP', scheduler: 'PB2', jobId: 3742, status: 'completed', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB3', jobId: 3743, status: 'scheduled', csv: 'Download' },
  { appId: '1CCP', scheduler: 'PB4', jobId: 3744, status: 'failed', csv: 'Unavailable' },
  { appId: 'XZY1', scheduler: 'PB1', jobId: 5001, status: 'completed', csv: 'Download' },
  { appId: 'XZY1', scheduler: 'PB2', jobId: 5002, status: 'completed', csv: 'Download' },
  { appId: 'XZY1', scheduler: 'PB3', jobId: 5003, status: 'scheduled', csv: 'Download' },
  { appId: 'XZY1', scheduler: 'PB4', jobId: 5004, status: 'failed', csv: 'Unavailable' },
  { appId: 'ABCD', scheduler: 'PB1', jobId: 6001, status: 'completed', csv: 'Download' },
  { appId: 'ABCD', scheduler: 'PB2', jobId: 6002, status: 'scheduled', csv: 'Download' },
  { appId: 'ABCD', scheduler: 'PB3', jobId: 6003, status: 'failed', csv: 'Unavailable' },
  { appId: 'ABCD', scheduler: 'PB4', jobId: 6004, status: 'completed', csv: 'Download' },
  { appId: 'EFGH', scheduler: 'PB1', jobId: 7001, status: 'completed', csv: 'Download' },
  { appId: 'EFGH', scheduler: 'PB2', jobId: 7002, status: 'scheduled', csv: 'Download' },
  { appId: 'EFGH', scheduler: 'PB3', jobId: 7003, status: 'failed', csv: 'Unavailable' },
  { appId: 'EFGH', scheduler: 'PB4', jobId: 7004, status: 'completed', csv: 'Download' },
  { appId: 'WXYZ', scheduler: 'PB1', jobId: 8001, status: 'completed', csv: 'Download' },
  { appId: 'WXYZ', scheduler: 'PB2', jobId: 8002, status: 'scheduled', csv: 'Download' },
  { appId: 'WXYZ', scheduler: 'PB3', jobId: 8003, status: 'failed', csv: 'Unavailable' },
  { appId: 'WXYZ', scheduler: 'PB4', jobId: 8004, status: 'completed', csv: 'Download' },
  { appId: 'LMNO', scheduler: 'PB1', jobId: 9001, status: 'completed', csv: 'Download' },
  { appId: 'LMNO', scheduler: 'PB2', jobId: 9002, status: 'scheduled', csv: 'Download' },
  { appId: 'LMNO', scheduler: 'PB3', jobId: 9003, status: 'failed', csv: 'Unavailable' },
  { appId: 'LMNO', scheduler: 'PB4', jobId: 9004, status: 'completed', csv: 'Download' },
];

type Order = 'asc' | 'desc';

type SortableColumn = keyof DataRow;

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface SortableTableProps {
  filter: string;
}

export default function SortableTable({ filter }: SortableTableProps) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SortableColumn>('appId');
  const [rows] = useState<DataRow[]>(initialRows);
  const handleSort = (property: SortableColumn) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredRows = rows.filter(row =>
    row.appId.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'appId'}
                direction={orderBy === 'appId' ? order : 'asc'}
                onClick={() => handleSort('appId')}
              >
                App Id
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'scheduler'}
                direction={orderBy === 'scheduler' ? order : 'asc'}
                onClick={() => handleSort('scheduler')}
              >
                Scheduler Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'jobId'}
                direction={orderBy === 'jobId' ? order : 'asc'}
                onClick={() => handleSort('jobId')}
              >
                Job Id
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'status'}
                direction={orderBy === 'status' ? order : 'asc'}
                onClick={() => handleSort('status')}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'csv'}
                direction={orderBy === 'csv' ? order : 'asc'}
                onClick={() => handleSort('csv')}
              >
                Download CSV
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.slice().sort(getComparator(order, orderBy)).map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.appId}</TableCell>
              <TableCell>{row.scheduler}</TableCell>
              <TableCell>{row.jobId}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                {row.csv === 'Download' ? (
                  <Button variant="text" size="small">Download</Button>
                ) : (
                  <Typography variant="caption" color="textSecondary">Unavailable</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
