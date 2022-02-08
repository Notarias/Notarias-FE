import React, { useState, useEffect }            from 'react'
import Grid                           from '@material-ui/core/Grid';
import Paper                          from '@material-ui/core/Paper';
import Typography                     from '@material-ui/core/Typography';
import Avatar                         from '@material-ui/core/Avatar';
import Chip                           from '@material-ui/core/Chip';
import IconButton                     from '@material-ui/core/IconButton';
import Divider                        from '@material-ui/core/Divider';
import LocalAtmIcon                   from '@material-ui/icons/LocalAtm';
import AssignmentIcon                 from '@material-ui/icons/Assignment';
import Box                            from '@material-ui/core/Box';
import CommentsDialog                 from './comments_dialog';
import { Link }                       from 'react-router-dom';
import { useQuery }                   from '@apollo/client';
import { GET_BUDGET }                 from '../../index_queries_and_mutations/queries';
import { GET_PROCEDURE }              from '../../index_queries_and_mutations/queries';

const Commentary = (props) => {
  const { comment } = props
  
  const [commentDialog, setCommentDialog] = useState(false);
  const [budget, setBudget] = useState();
  const [procedure, setProcedure] = useState();

  const statsCommentDialog = () => {
    setCommentDialog(!commentDialog);
  }

  const commentType = (comment) => {
    switch (comment.commentableType) {
      case "Budget" :
        const { data: budget } = useQuery(
          GET_BUDGET, { variables: {"id": comment.commentableId } }
        );
      
        useEffect(() => {
          if(budget && budget.budget.budgetingTemplate) {
            setBudget(budget.budget.budgetingTemplate)
          }
        }, [budget]);
        return("Presupuesto");

      case "Procedure" :
        const { data: procedure } = useQuery(
          GET_PROCEDURE, { variables: {"id": comment.commentableId } }
        );
        
        useEffect(() => {
          if(procedure && procedure.procedure.proceduresTemplate) {
            setProcedure(procedure.procedure.proceduresTemplate)
          }
        }, [procedure]);
        return("Tramite");

      default :
        return("Otro")
    }
  }
  
  const buildDate = (value, separator='/') => {
    let newDate = new Date(value)
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    let minutes = newDate.getMinutes();
  
    return (
      `${date < 10 ? `0${date}` : `${date}`}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year} - ${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`
    )
  }

  return(
    <Paper style={{ padding: "10px" }}>
      <Grid container justifyContent="flex-start">
        <Grid item container xs={8} justifyContent='flex-start' alignItems='center'>
          <Grid item style={{marginLeft: "20px"}}>
            <Typography variant='h6'>
              {commentType(comment)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs spacing={1} justifyContent='flex-end' alignItems='center' style={{ marginRight: "20px" }}>
          <Grid item>
            {comment.commentableType === "Budget" ?
              <Link to={`/budgets/${comment.commentableId}/edit`}>
                <IconButton>
                  <LocalAtmIcon />
                </IconButton>
              </Link>
            :
              <Link to={`/procedures/${comment.commentableId}/edit`}>
                <IconButton>
                  <AssignmentIcon />
                </IconButton>
              </Link>
            }
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
                  <strong>Fecha del Comentario:</strong>
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
                {comment.commentableType === "Budget" ?
                  <>
                    <Typography>
                      <strong>Presupuesto:</strong>
                    </Typography>
                    <Typography>
                      {budget && budget.name}
                    </Typography>
                  </>
                :
                  <>
                    <Typography>
                      <strong>Tramite:</strong>
                    </Typography>
                    <Typography>
                      {procedure && procedure.name}
                    </Typography>
                  </>
                }
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
                commentType={commentType}
                commentDialog={commentDialog}
                statsCommentDialog={statsCommentDialog}
              />
            </Grid>
          </Grid>
          <Divider orientation="vertical" flexItem/>
          <Grid item container xs direction="column" alignItems='center' style={{ paddingLeft: "5px"}}>
            <Grid item xs>
              <Typography>
                <strong>Creador:</strong>
              </Typography>
            </Grid>
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

export default Commentary;
