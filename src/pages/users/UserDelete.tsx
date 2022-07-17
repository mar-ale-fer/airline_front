import { useMutation } from '@apollo/client';
import { USER_DELETE } from './operations/UserDeleteMutation';

import EntityDelete from '../../components/common/EntityDelete';
import { usersPageNeedsRefresh_RV } from '../../cache';

 const UserDelete = (props: { userId: number; }) => {
    const [userDelete, { loading: deleting }] = useMutation(USER_DELETE);
    return <EntityDelete 
      entity="user"
      entityId={props.userId}
      deleting={deleting}
      entityDelete={userDelete}
      refresh={usersPageNeedsRefresh_RV}
      goback="/users"

    />
  }
  export default UserDelete;