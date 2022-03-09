import React, { useState, useEffect }       from 'react'
import BudgetCommentaries                   from './budget_commentaries';
import ProcedureCommentaries                from './procedure_commentaries';

const Commentary = (props) => {
  const { comment } = props
  
  const [commentDialog, setCommentDialog] = useState(false);
  const [budget, setBudget] = useState();
  const [procedure, setProcedure] = useState();

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

  const statsCommentDialog = () => {
    setCommentDialog(!commentDialog);
  }

  const commentType = (comment) => {
    switch (comment.commentableType) {
      case "Budget" :
        return(
          <BudgetCommentaries 
            comment={comment}
            budget={budget}
            setBudget={setBudget} 
            commentableId={comment.commentableId} 
            buildDate={buildDate} 
            statsCommentDialog={statsCommentDialog}
            commentDialog={commentDialog}
          />
        )
      case "Procedure" :
        return(
          <ProcedureCommentaries 
            comment={comment}
            procedure={procedure}
            setProcedure={setProcedure} 
            commentableId={comment.commentableId} 
            buildDate={buildDate} 
            statsCommentDialog={statsCommentDialog}
            commentDialog={commentDialog}
          />
        )
      default :
        return("Otro")
    }
  }

  return(
    commentType(comment)
  )
}

export default Commentary;
