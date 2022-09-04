import useSWR, { useSWRConfig } from 'swr';
import { Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { http } from '../../utils/http';
import { useRouter } from 'next/router';

type Props = {}

const limit = 5;
const fetcher = (path: string) => {
  return http.get(path)
    .then((res) => ({
      data: res.data,
      total: +res.headers['x-total-count']
    }))
};
const columns: GridColDef[] = [
  { field: 'id', headerName: 'Código' },
  { field: 'name', headerName: 'Nome', width: 300 },
];

const UsersPage = (props: Props) => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const pageInt = parseInt(page as any);
  const { data = {data: [], total: 0}, mutate, error } = useSWR(
    router.isReady ? `names?_limit=${limit}&_page=${page}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  function handleNewUser() {
    router.push('/users/new');
  }

  return (
    <div style={{height: 400}}>
      <Typography variant='h4'>
        Otimizar Frontend com React.js
      </Typography>
      <Button
        variant='contained'
        onClick={() => mutate()}
      >
        Revalidar página {page}
      </Button>
      <Button
        variant='contained'
        onClick={handleNewUser}
      >
        Novo usuário
      </Button>
      <DataGrid
        columns={columns}
        page={pageInt - 1}
        pageSize={limit}
        rows={data.data}
        rowCount={data.total}
        rowsPerPageOptions={[limit]}
        onPageChange={(page) =>
          router.push(`/users?page=${page + 1}`)}
        paginationMode='server'
      />
    </div>
  );
}

export default UsersPage;
