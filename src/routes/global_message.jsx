import React                  from 'react';
import CustomSnackbarMessage  from '../components/ui/custom_snackbar_message';
import { useQuery }           from "@apollo/react-hooks";
import { GLOBAL_MESSAGE }     from '../resolvers/queries';

export default ({ classes }) => {
  const { data } = useQuery(GLOBAL_MESSAGE);

  return(
    (data && data.globalMessage && data.globalMessage.message && <CustomSnackbarMessage
      variant={ data.globalMessage.type }
      className={ classes.floatingMessage }
      message={ data.globalMessage.message }
      actionable={ true }
    />)|| ""
  )
}
