import * as React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { FormUser } from '../../components/form-user';
import { http } from '../../utils/http';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

type Props = {};

const NewUserPage = (props: Props) => {
  const router = useRouter();
  const { cache, mutate } = useSWRConfig();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // save new user name
    const nameField = document.getElementById('name') as HTMLInputElement;
    const nameValue = nameField.value;
    await http.post('names', { name: nameValue });

    // revalidar cached pages starting with name
    const pattern = /^names\?/g;
    const mutated = Array.from((cache as Map<any, any>).keys())
      .filter((key) => pattern.test(key))
      .map((key) => mutate(key, undefined, { revalidate: true }));
    await Promise.all(mutated);

    // go back to users list
    router.push('/users');
  }

  function handleCancel() {
    router.push('/users');
  }

  return (
    <div>
      <Typography variant='h4'>
        Novo Usuário
      </Typography>
      <FormUser onSubmit={handleSubmit}>
        <TextField id='name' label='Nome' variant='outlined' />
        <Button type='submit' variant='contained'>
          Salvar
        </Button>
        <Button variant='outlined' onClick={handleCancel}>
          Cancelar
        </Button>
      </FormUser>
    </div>
  );
};

export default NewUserPage;
