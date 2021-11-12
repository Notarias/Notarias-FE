import ListItem             from '@material-ui/core/ListItem';
import ListItemIcon         from '@material-ui/core/ListItemIcon';
import ListItemText         from '@material-ui/core/ListItemText';
import React                from 'react';
import withStyles           from '@material-ui/core/styles/withStyles';
import { Link }             from 'react-router-dom';
import { styles }           from './navigation_menu_styles'
import Grid                 from '@material-ui/core/Grid';
import Avatar               from '@material-ui/core/Avatar';
import { GET_CURRENT_USER } from '../../resolvers/queries';
import { gql, useQuery }    from '@apollo/client';

const USER_CHANGE = gql`
  subscription {
    userChange {
      id
      firstName
      lastName
      address
      email
      lockedAt
      phone
      avatarThumbUrl
      avatarMidUrl
      avatarUrl
      updatedAt
      role {
        name
        permanentLink
      }
    }
  }
`

const ProfileLink = (props) => {
  const { classes } = props
  const { loading, error, data, subscribeToMore } = useQuery(GET_CURRENT_USER);

  subscribeToMore({
    document: USER_CHANGE,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev

      if (subscriptionData.data && subscriptionData.data.userChange && (prev.currentUser.id === subscriptionData.data.userChange.id)) {
        return Object.assign({}, prev, {
          currentUser: subscriptionData.data.userChange,
          __typename: prev.__typename
        })
      } else {
        return prev
      }
    }
  })

  return(
    <Link to="/profiles/general">
      <ListItem button>
        <ListItemIcon >
            <Grid>
              <Avatar src={data && data.currentUser && data.currentUser.avatarThumbUrl} className={classes.avatar} />
            </Grid>
          </ListItemIcon>
        <ListItemText primary="Perfil" />
      </ListItem>
    </Link>
  )
}

export default withStyles(styles)(ProfileLink)