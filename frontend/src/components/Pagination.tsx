import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../app/store';
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField
} from '@mui/material';
import { updateStatus, reset } from '../auth/authSlice';
import { GrSearch } from "react-icons/gr";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Project Name', minWidth: 170 },
  { id: 'reason', label: 'Reason', minWidth: 50 },
  { id: 'type', label: 'Type', minWidth: 50 },
  { id: 'div', label: 'Division', minWidth: 50 },
  { id: 'category', label: 'Category', minWidth: 50 },
  { id: 'priority', label: 'Priority', minWidth: 50 },
  { id: 'dept', label: 'Department', minWidth: 50 },
  { id: 'location', label: 'Location', minWidth: 50 },
  { id: 'status', label: 'Status', minWidth: 50 },
  { id: 'start', label: '', minWidth: 30 },
  { id: 'close', label: '', minWidth: 30 },
  { id: 'cancel', label: '', minWidth: 30 },
];

export type ProjectType = {
  _id: string;
  title: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  dept: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "Registered" | "Running" | "Closed" | "Cancelled";
}

export default function Pagination() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const { projectList, isLoading } = useSelector((state: AuthState) => state.auth);

  const [projects, setProject] = useState<any[]>([]);


  const dateFormatter = (dateString: string): string => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };

    // Generate formatted date string.
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Custom formatting to match "Jun-21, 2024"
    const [month, day, year] = formattedDate.split(' ');
    return `${month}-${day.replace(',', '')}, ${year}`;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatus = function (id: string, status: string) {
    dispatch(updateStatus({ id, status: { status } }));
  }

  useEffect(() => {
    if (projectList.length) {
      setProject(projectList);
    }
  }, [projectList]);

  return projects.length ? (
    <section className='w-full bg-white mt-[52px]'>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  return (
                    <TableCell
                      key={column.id}
                      align='left'
                      style={{ minWidth: column.minWidth }}
                      className='bg-blue-50 font-semibold'
                    >
                      {column.label}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project: ProjectType, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={project._id}>
                    <TableCell align={'left'}>
                      {project.title}
                      <div className="flex gap-2 text-gray-400 text-sm">
                        <p className='m-0'>{dateFormatter(project.startDate)}</p>
                        -
                        <p className='m-0'>{dateFormatter(project.endDate)}</p>
                      </div>
                    </TableCell>
                    <TableCell align={'left'}>{project.reason}</TableCell>
                    <TableCell align={'left'}>{project.type}</TableCell>
                    <TableCell align={'left'}>{project.division}</TableCell>
                    <TableCell align={'left'}>{project.category}</TableCell>
                    <TableCell align={'left'}>{project.priority}</TableCell>
                    <TableCell align={'left'}>{project.dept}</TableCell>
                    <TableCell align={'left'}>{project.location}</TableCell>
                    <TableCell align={'left'}>{project.status}</TableCell>


                    <TableCell align={'left'}>
                      <Button
                        variant='contained'
                        className='px-7 py-[2px] rounded-2xl bg-[#044e92] text-gray-200'
                        onClick={() => handleStatus(project._id, 'Running')}
                      >
                        Start
                      </Button>
                    </TableCell>
                    <TableCell align={'left'}>
                      <Button
                        variant='outlined'
                        className='px-7 py-[2px] rounded-2xl'
                        onClick={() => handleStatus(project._id, 'Closed')}
                      >
                        Close
                      </Button>
                    </TableCell>
                    <TableCell align={'left'}>
                      <Button
                        variant='outlined'
                        className='px-7 py-[2px] rounded-2xl'
                        onClick={() => handleStatus(project._id, 'Cancelled')}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8]}
          component="div"
          count={projectList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </section>
  ) : (
    <p className="py-2 px-3 text-gray-700 font-semibold text-xl">No Projects</p>
  );
}
