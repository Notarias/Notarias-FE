import { gql } from '@apollo/client';

export const DESTROY_TAXED_FIELD = gql`
  mutation destroyTaxedFieldRelation($taxedFieldId: ID!, $taxFieldId: ID!){
    destroytaxedFieldRelation(input: { taxedFieldId: $taxedFieldId, taxFieldId: $taxFieldId } ) {
      taxedFieldId
      taxFieldId
      destroyed
    }
  }
`
