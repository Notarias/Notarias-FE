import React                                    from 'react';
import Field                                    from './field';
import { useQuery }                             from '@apollo/react-hooks';
import { GET_PROCEDURE_TEMPLATE_TAB_FIELDS }    from '../queries_and_mutations/queries'
import Grid                                         from '@material-ui/core/Button';
import Button                                       from '@material-ui/core/Button';
import { styles }                                   from '../styles';
import { withStyles }                               from '@material-ui/core/styles';
import Divider                                      from '@material-ui/core/Divider';
import StarsIcon                                    from '@material-ui/icons/Stars';
import FormControlLabel                             from '@material-ui/core/FormControlLabel';
import FormControl                                  from '@material-ui/core/FormControl';
import Checkbox                                     from '@material-ui/core/Checkbox';
import TextField                                    from '@material-ui/core/TextField';
import Paper                                        from '@material-ui/core/Paper';
import Select                                       from '@material-ui/core/Select';
import MenuItem                                     from '@material-ui/core/MenuItem';
import InputLabel                                   from '@material-ui/core/InputLabel';
import StarBorderIcon                               from '@material-ui/icons/StarBorder';
import Typography                         from '@material-ui/core/Typography';
import PostAddIcon                                  from '@material-ui/icons/PostAdd';

const FieldList = (props) => {
  const { currentTab, classes } = props
  const { loading, data } = useQuery(
    GET_PROCEDURE_TEMPLATE_TAB_FIELDS,
    {
      variables: { "id": currentTab.id }
    } 
  );

  const fields = data ? data.proceduresTemplateTabFields : []

  const renderFields = () => {
    return(
      <>
        {
          fields.map(
            (field, index) => {
              return(
                <Field
                  key={ field.id + "-field"}
                  arrayIndex={ index }
                  // removeFromList={ removeFromList }
                  name={ field.name || "" }
                  style={ field.style || "" }
                  favourite={ field.favourite || false }
                  id={ field.id || " " }
                />
              )
            }
          )
        }
      </>
    )
  }

  return (
    <>
        <Typography variant="overline">
          Añadir campos al formulario
        </Typography>
      <Grid>
        <Button
          variant="contained"
          className={ classes.buttonHeight }
        >
          <PostAddIcon/>
        </Button>
      </Grid>
        {
          renderFields()
        }
    </>
  )
}

export default  withStyles(styles)( FieldList);
