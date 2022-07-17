import { useState  } from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { entityType } from '../../types/entityType';

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

type UserDeleteProps = {
  entity: entityType
  entityId: number
  deleting: boolean
  entityDelete: Function
  refresh: Function
  goback: string
}
const EntityDelete = ( props: UserDeleteProps) => {
    const {entityId, deleting, entity, entityDelete, refresh, goback} =props 
    let navigate = useNavigate();
    const [s_IWantToErase, sets_IWantToErase] = useState(false)
    const [s_Deleted, sets_Deleted] = useState(false)
    const [s_error, sets_error] = useState('')
    // const [userDelete, { loading: deleting }] = useMutation(USER_DELETE);
    const entityVars = (entity : entityType) => {
      switch (entity) {
        case 'user': 
          return { userDeleteId: entityId }

        // case 'level': 
        //   return { levelDeleteId: entityId }

        // case 'student': 
        //   return { studentDeleteId: entityId }

        // case 'course':
        //   return { courseDeleteId: entityId}
      }
    }
    const entityResponse = (entity : entityType, data : any) => {
      switch (entity) {
        case 'user':    
          return data.data.userDelete
        // case 'level': 
        //   return data.data.levelDelete
        // case 'student': 
        //   return data.data.studentDelete
        // case 'course': 
        //   return data.data.courseDelete
      }
    }

    const remove = () => {
      if (deleting) return;
      entityDelete({
        variables: entityVars(entity)
      }).then(( data : any ) => {
        const response: any = entityResponse(entity, data)
        if ((response.success) as boolean ) {
          //update reactiver variable used in userslist page, to reflect the deleted object
          const randomString= Math.random().toString(36) as string

          refresh( randomString )
          sets_Deleted(true);
          navigate(goback);
        } else {
          alert(response.message);
        }        
        
      })
      .catch( (e: any) => {
        sets_error(e.message)
      })
      .finally(()=> {

      });
    };

    const allowDelete = () => {
      sets_IWantToErase(!s_IWantToErase)
    }

    function ShowError(props: { errorMessage: {} | null | undefined; }){
      if (props.errorMessage && props.errorMessage !== ''){
        return <p>{props.errorMessage}</p>
      }
      return null;
    }

    return (
      <div>
        <Button 
        name="quieroborrar" 
        size="small"
        onClick={allowDelete }
        disabled={ deleting || s_Deleted}      
        >
            {s_IWantToErase?'No borrar': <DeleteIcon/>}
        </Button>
        <ColorButton variant="contained"
          disabled={!s_IWantToErase || deleting || s_Deleted}
          onClick={remove}
        >borrar
        </ColorButton>
        <ShowError errorMessage={s_error} />
      </div>

    );
  }
  export default EntityDelete;