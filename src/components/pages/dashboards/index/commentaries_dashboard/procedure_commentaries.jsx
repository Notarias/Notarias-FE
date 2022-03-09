import React, { useEffect }                 from 'react'
import Grid                                 from '@material-ui/core/Grid';
import Paper                                from '@material-ui/core/Paper';
import Typography                           from '@material-ui/core/Typography';
import Avatar                               from '@material-ui/core/Avatar';
import Chip                                 from '@material-ui/core/Chip';
import IconButton                           from '@material-ui/core/IconButton';
import Divider                              from '@material-ui/core/Divider';
import Tooltip                              from '@material-ui/core/Tooltip';
import VisibilityIcon                       from '@material-ui/icons/Visibility';
import Box                                  from '@material-ui/core/Box';
import CommentsDialog                       from './comments_dialog';
import { Link }                             from 'react-router-dom';
import { useQuery }                         from '@apollo/client';
import { GET_PROCEDURE }                    from '../../index_queries_and_mutations/queries';

const ProcedureCommentaries = (props) => {

  const { 
    comment, 
    procedure, 
    setProcedure, 
    commentableId, 
    buildDate, 
    statsCommentDialog, 
    commentDialog
  } = props

  const { data, loading } = useQuery(
    GET_PROCEDURE, { variables: {"id": commentableId } }
  );
  
  useEffect(() => {
    if(data && data.procedure.proceduresTemplate) {
      setProcedure(data.procedure.proceduresTemplate)
    }
  }, [data, loading]);

  return(
    <Paper style={{ padding: "10px" }}>
      <Grid container justifyContent="flex-start">
        <Grid item container xs={8} justifyContent='flex-start' alignItems='center'>
          <Grid item style={{marginLeft: "20px"}}>
            <Typography variant='h6'>
              Tramite
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs spacing={1} justifyContent='flex-end' alignItems='center' style={{ marginRight: "20px" }}>
          <Grid item>
            <Link to={`/procedures/${comment.commentableId}/edit`}>
              <Tooltip title='Ver Tramite'>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Grid>
          <Grid item>
            <Typography variant='subtitle2' color="secondary">
              No. {comment.id.toString().padStart(10, "0")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="row" alignItems="stretch" style={{ paddingBottom: "10px", paddingTop: "10px" }}>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item container xs direction="column" justifyContent="center">
              <Grid item>
                <Typography color="primary">
                  <strong>Creacion:</strong>
                </Typography>
                <Typography color="primary">
                  {buildDate(comment.createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs justifyContent="center">
            <Grid item>
              <Box color="success.main">
                <Typography>
                  <strong>Trámite:</strong>
                </Typography>
                <Typography>
                  {procedure && procedure.name}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs={1} justifyContent="center">
            <Grid item>
              {(comment.createdAt === comment.updatedAt) ? 
                <></>
                :
                <Chip 
                  label="Editado"
                  variant="outlined"
                  color="primary"
                  style={{marginRight: '5px'}}
                />
              }
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container alignItems="center" xs={5} justifyContent="center">
            <Grid item>
              <Typography onClick={statsCommentDialog} style={{cursor:'pointer'}}>
                {`${comment.body.substr(0,150)}...`}
              </Typography>
              <CommentsDialog
                comment={comment}
                commentDialog={commentDialog}
                statsCommentDialog={statsCommentDialog}
              />
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container xs direction="column" justifyContent='center' alignContent='flex-start' style={{ paddingLeft: "5px"}}>
            <Grid item container xs direction="row" spacing={1}>
              <Grid item>
                <Avatar src={comment && comment.user.avatarThumbUrl}/>
              </Grid>
              <Grid item xs>
                <Typography variant="body2" align="left">{comment.user.firstName}</Typography>
                <Typography variant="body2" align="left">{comment.user.lastName}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProcedureCommentaries;
