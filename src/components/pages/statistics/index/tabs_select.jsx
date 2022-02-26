import React, { useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import { useQuery }                 from '@apollo/client';
import { GET_STATISTICS_BUDGETING_TEMPLATE_TABS } from '../queries/queries';

export default (props) => {
  const { templateId, templateTabsIds, changeTemplateTabsIds } = props


  const { data, loading } = useQuery(
    GET_STATISTICS_BUDGETING_TEMPLATE_TABS,
    {
      variables: {
        templateId: templateId
      },
      fetchPolicy: 'cache-and-network'
    }
  )

  useEffect(() => {
    data && changeTemplateTabsIds(data.statisticsBudgetingTemplateTabs.map((tab) => (tab.id)))
  }, [!!data])

  const onChangeSelect = (event) => {
    changeTemplateTabsIds(event.target.value)
  }

  const showSelectedValues = (selected) => {
    return(
      <div styles={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          data && data.statisticsBudgetingTemplateTabs.filter(
            (tab) => {
              return selected.indexOf(tab.id) >= 0
            }
          ).map((tab) => (
            <Chip key={`${tab.id}-selected-tab-chip`} style={{margin: 2}} label={tab.name}/>
          ))
        }
      </div>
    )
  }

  return(
    <FormControl fullWidth>
      <InputLabel id="demo-mutiple-checkbox-label">Conceptos</InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        disabled={!templateId}
        multiple
        value={templateTabsIds}
        onChange={onChangeSelect}
        input={<Input />}
        renderValue={showSelectedValues}
      >
        {
          data && data.statisticsBudgetingTemplateTabs.map((tab) => (
            <MenuItem key={`${tab.name}-template-select-tab`} value={tab.id}>
              <Checkbox checked={templateTabsIds.indexOf(tab.id) > -1} />
              <ListItemText primary={tab.name} />
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}