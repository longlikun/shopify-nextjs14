
import { getUsers } from '@/app/lib/api-requests';
import ListUsers from './list-users';

export default async function InitialData() {
  const users = await getUsers();

  return <ListUsers users={users} />;
}

