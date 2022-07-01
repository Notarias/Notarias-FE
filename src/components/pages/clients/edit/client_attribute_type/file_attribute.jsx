import React                              from 'react';
import Dropzone                           from 'react-dropzone';
import Grid                               from '@material-ui/core/Grid';
import Tooltip                            from '@material-ui/core/Tooltip';
import TextField                          from '@material-ui/core/TextField';
import InputAdornment                     from '@material-ui/core/InputAdornment';
import Link                               from '@material-ui/core/Link';
import IconButton                         from '@material-ui/core/IconButton';
import Paper                              from '@material-ui/core/Paper';
import DescriptionIcon                    from '@material-ui/icons/Description';
import CloudUploadIcon                    from '@material-ui/icons/CloudUpload';
import CachedIcon                         from '@material-ui/icons/Cached';
import FileAttrLoading                    from './file_attr_loading';
import { useMutation }                    from '@apollo/client';
import { GET_CLIENT_ATTRIBUTE_VALUE }     from '../../clients_queries_and_mutations/queries';
import { CREATE_CLIENT_ATTRIBUTE_VALUE }  from '../../clients_queries_and_mutations/queries';
import { UPDATE_CLIENT_ATTRIBUTE_VALUE }  from '../../clients_queries_and_mutations/queries';
import { GLOBAL_MESSAGE }                 from '../../../../../resolvers/queries';
import client                             from '../../../../../apollo';

const FileAttribute = (props) => {
  const { attr, attrValue, match } = props

  const [createClientAttributeValueMutation, {loading: loadingCreateClientAttributeValue}] = 
    useMutation(
      CREATE_CLIENT_ATTRIBUTE_VALUE,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Archivo cargado con exito.",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
        },
        refetchQueries: [
          {
            query: GET_CLIENT_ATTRIBUTE_VALUE, variables: {"attributeId": Number(attr.id), "clientId": match.params.id} 
          },
        ],
        awaitRefetchQueries: true
      }
    )

  const newClientAttributeValue = (files, event) => {
    createClientAttributeValueMutation({
      variables:{
        "clientId": match.params.id,
        "clientAttributeId": attr.id,
        "file": files[0],
      }
    })
  }
  
  const [updateClientAttributeValueMutation, {loading: loadingUpdateClientAttributeValue}] =
    useMutation(
      UPDATE_CLIENT_ATTRIBUTE_VALUE,
      {
        context: { hasUpload: true },
        onCompleted(cacheData) {
          client.writeQuery({
            query: GLOBAL_MESSAGE,
            data: {
              globalMessage: {
                message: "Archivo cargado con exito.",
                type: "success",
                __typename: "globalMessage"
              }
            }
          })
        },
        refetchQueries: [
          {
            query: GET_CLIENT_ATTRIBUTE_VALUE, variables: {"attributeId": Number(attr.id), "clientId": match.params.id} 
          },
        ],
        awaitRefetchQueries: true
      }
    )
console.log(attrValue)
  const updateClientAttributeFile = (files, event) => {
    console.log(files[0])
    updateClientAttributeValueMutation({
      variables:{
        "id": attrValue && attrValue.id,
        "file": files[0],
      }
    })
  }

  const rejectedFile = () => {
    client.writeQuery({
      query: GLOBAL_MESSAGE,
      data: {
        globalMessage: {
          message: "Formato de archivo, no valido, permitidos: JPG, JPEG, PNG, PDF, DOCX Y XLSX",
          type: "error",
          __typename: "globalMessage"
        }
      }
    })
  }

  return(
    <Grid container direction='row' alignItems='center'>
      <Grid item xs={1}>
        <Dropzone
          accept='file_extension/.jpg, .jpeg, .png, .pdf, .docx, .xlsx'
          onDrop={attrValue && attrValue.fileName ? updateClientAttributeFile : newClientAttributeValue}
          onDropRejected={rejectedFile}
          multiple={false}
        >
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Tooltip title={attrValue && attrValue.fileUrl ? "Cambiar Archivo" : "Subir Archivo"}>
                  <IconButton color='primary'>
                    {attrValue && attrValue.fileUrl ? <CachedIcon/> : <CloudUploadIcon/>}
                  </IconButton>
                </Tooltip>
              </div>
            </section>
          )}
        </Dropzone>
      </Grid>
      {loadingCreateClientAttributeValue || loadingUpdateClientAttributeValue ? 
        <Grid container item xs={9}>
          <Paper variant="outlined" style={{width: '534px', height: '55px', paddingTop: '22px', paddingLeft: '15px', paddingRight: '15px'}}>
            <FileAttrLoading/>
          </Paper>
        </Grid>
      :
        <Grid item xs>
          <TextField
            id={`file-attr-${attr.id}`}
            name={attr.name}
            label={attr.name}
            variant="outlined"
            size="small"
            value={attrValue ? attrValue.fileName : "Haga click en el icono para subir archivo"}
            fullWidth
            disabled
            InputProps={{
              endAdornment: 
                <InputAdornment position="end">
                  { attrValue ? 
                    <Tooltip title="Ver Archivo">
                      <Link href={attrValue.fileUrl} 
                        target='_blank' 
                        color='inherit' 
                        underline='none'
                      >
                        <IconButton
                          aria-label="view-attr-file"
                          edge="end"
                          color='primary'
                        >
                          { attrValue && attrValue.fileUrl ? <DescriptionIcon/> : "" }
                        </IconButton>
                      </Link>
                    </Tooltip>
                  :
                    <></>
                  }
                </InputAdornment>,
            }}
          />
        </Grid>
      }
    </Grid>
  )
}

export default FileAttribute;
