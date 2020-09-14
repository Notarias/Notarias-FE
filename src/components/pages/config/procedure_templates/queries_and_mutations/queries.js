import gql          from 'graphql-tag';

export const PROCEDURE_TEMPLATES = gql`
  query procedureTemplates ($page: Int,
    $per: Int,
    $sortDirection: String,
    $sortField: String,
    $searchField: String,
    $searchValue: String)
    {
     procedureTemplates (page: $page,
      per: $per,
      sortDirection: $sortDirection,
      sortField: $sortField,
      searchField: $searchField,
      searchValue: $searchValue) 
      {
        id
        name
        serialNumber
    }
    procedureTemplatesCount
  }
`