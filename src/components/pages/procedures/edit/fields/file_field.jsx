import React                        from 'react';
import Dropzone                     from 'react-dropzone';
import Grid                         from '@material-ui/core/Grid';
import Tooltip                      from '@material-ui/core/Tooltip';
import FormControl                  from '@material-ui/core/FormControl';
import FilledInput                  from '@material-ui/core/FilledInput';
import OutlinedInput                from '@material-ui/core/OutlinedInput';
import InputLabel                   from '@material-ui/core/InputLabel';
import Link                         from '@material-ui/core/Link';
import IconButton                   from '@material-ui/core/IconButton';
import Paper                        from '@material-ui/core/Paper';
import DescriptionIcon              from '@material-ui/icons/Description';
import CloudUploadIcon              from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon            from '@material-ui/icons/CloudDownload';
import FileFieldLoading             from './file_field_loading';
import { GLOBAL_MESSAGE }           from '../../../../../resolvers/queries';
import client                       from '../../../../../apollo';

const FileField = (props) => {
  const { field, fileName, fileUrl, updateFieldValueFile, updateProcedureFieldValueFileLoading } = props

  const rejectedFile = () => {
    client.writeQuery({
      query: GLOBAL_MESSAGE,
      data: {
        globalMessage: {
          message: "Formato de archivo, no valido, permitidos: JPG, JPEG, PNG Y PDF",
          type: "error",
          __typename: "globalMessage"
        }
      }
    })
  }

  return(
    <>
      <Grid item xs={1}>
        <Dropzone
          accept='file_extension:, .jpg, .jpeg, .png, .pdf'
          onDrop={updateFieldValueFile}
          onDropRejected={rejectedFile}
          multiple={false}
        >
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Tooltip title={fileUrl ? "Cambiar Archivo" : "Subir Archivo"}>
                  <IconButton color='primary'>
                    {fileUrl ? <DescriptionIcon/> : <CloudUploadIcon/>}
                  </IconButton>
                </Tooltip>
              </div>
            </section>
          )}
        </Dropzone>
      </Grid>
      {updateProcedureFieldValueFileLoading ? 
        <Grid container item xs={9}>
          <Paper variant="outlined" style={{width: '534px', height: '55px', paddingTop: '22px', paddingLeft: '15px', paddingRight: '15px'}}>
            <FileFieldLoading/>
          </Paper>
        </Grid>
      :
        <Grid item xs={9}>
          <FormControl variant={fileUrl ? 'outlined' : 'filled'} fullWidth>
            <InputLabel htmlFor={field.id}>{field.name}</InputLabel>
            {!!fileUrl  ?
              <OutlinedInput
                id={field.id}
                key={field.name}
                label={field.name}
                value={fileName}
                disabled={true}
                size='small'
                variant='filled'
                fullWidth
              />
            :
              <FilledInput
                id={field.id}
                key={field.name}
                label={field.name}
                value={"Haga click en el icono para subir archivo"}
                disabled={true}
                size='small'
                variant='filled'
                fullWidth
              />
            }
          </FormControl>
        </Grid>
      }
      <Grid item xs={1}>
        <Tooltip title="Ver Archivo">
          <Link href={fileUrl} 
            target='_blank' 
            color='inherit' 
            underline='none'
          >
            <IconButton disabled={!fileUrl}>
              <CloudDownloadIcon/>
            </IconButton>
          </Link>
        </Tooltip>
      </Grid>
    </>
  )
}

export default FileField;
