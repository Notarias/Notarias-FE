import React, { useEffect }                             from 'react';
import FieldsGroup                                      from './fields_group';
import { useQuery }                                     from '@apollo/react-hooks';
import { GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS }    from '../queries_and_mutations/queries'


const FieldsGroupList = (props) => {

  const { currentTab } = props
  const { loading, data } = useQuery(
    GET_PROCEDURES_TEMPLATE_TAB_FIELDS_GROUPS,
    {
      variables: {"id": currentTab.id }
    }
  );

  const [fieldsGroupList, setFieldsGroupList] = React.useState(data ? data.proceduresTemplateTabFieldsGroups : [])

  useEffect(() => {
    data && setFieldsGroupList(data.proceduresTemplateTabFieldsGroups);;
  }, [data])

  const renderFieldGroups = () => {
    return(
      <>
        {
          fieldsGroupList.map(
            (fieldsGroup, index) => {
              return (
                <FieldsGroup
                  key={ fieldsGroup.id + "-fieldsGroup"}
                  group={ fieldsGroup }
                  groupId={ fieldsGroup.id }
                  currentTab={ currentTab }
                  active={ fieldsGroup.active }
                />
              )
            }
          )
        }
      </>
    )
  }

  return(
    <>
      {
        renderFieldGroups()
      }
    </>
  )
}

export default FieldsGroupList;
