import React, { useState, useEffect }           from 'react';
import Grid                                     from '@material-ui/core/Grid';
import IconButton                               from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { useQuery, useMutation }                from '@apollo/client';
import { GET_PROCEDURE_FIELD_GROUP_VALUES }     from '../../queries_and_mutations/queries';
import { CREATE_PROCEDURE_FIELD_GROUP_VALUE }   from '../../queries_and_mutations/queries';
import { GET_PROCEDURES_AUDITLOG }              from '../../queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                       from '../../../../../resolvers/queries';
import client                                   from '../../../../../../src/apollo';
import FieldsGroupsRows                         from './fields_group_rows';

const GroupsRows = (props) => {

  const { procedure, group } = props

  const [fieldsGroupValues, setFieldsGroupValues] = useState();

  const { loading, data } = useQuery(
    GET_PROCEDURE_FIELD_GROUP_VALUES,
    {
      variables: { "fieldGroupId": group.id, "procedureId": procedure.id }
    }
  );

  useEffect(() => {
    if(data && data.procedureFieldGroupValues) {
      setFieldsGroupValues(data.procedureFieldGroupValues);
    }
  }, [loading, data]);

  const [CreateProcedureFieldGroupValues] =
    useMutation(
      CREATE_PROCEDURE_FIELD_GROUP_VALUE,
      {
        onCompleted(cacheData) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Campo creado con éxito",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
        },
        refetchQueries: [
          {
            query: GET_PROCEDURE_FIELD_GROUP_VALUES,
            variables: { "fieldGroupId": group.id, "procedureId": procedure.id }
          },
          {
            query: GET_PROCEDURES_AUDITLOG,  
              variables: { "procedureId": procedure.id }
          }
        ],
        awaitRefetchQueries: true
      }
    )

  const cloneFieldGroup = () => {
    CreateProcedureFieldGroupValues({ variables: { "proceduresTemplateFieldsGroupId": group.id, "procedureId": procedure.id } });
  }

  return (
    <Grid container item
      key={group.id + 'group-row'}
      style={{ flex: '1 1 auto' }}
      direction='column'
      alignItems="stretch"
      justifyContent="flex-start"
    >
      {
        <Card  variant="outlined" >
          <CardHeader
            avatar={
              <Typography color="textSecondary" style={{ justifyContent: "flex-end" }}>
                {group.name}
              </Typography>
            }
            action={
              <IconButton aria-label="settings" onClick={cloneFieldGroup} color="primary">
                <PostAddIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Grid container item alignItems="stretch" justifyContent="flex-start">
            {
              fieldsGroupValues && fieldsGroupValues.map((fieldGroupValue) => {
                return(
                  <>
                    <FieldsGroupsRows key={fieldGroupValue.id} fieldGroupValue={fieldGroupValue} procedure={procedure} group={group}/>
                  </>
                )
              })
            }
            </Grid>
          </CardContent>
        </Card>
      }
    </Grid>
  )
}

export default GroupsRows;
