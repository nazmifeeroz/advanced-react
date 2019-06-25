import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Item from './Item'

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`

const Items = ({ loading, error, data }) => {
  return (
    <Center>
      <p>Items!</p>
      {loading && <p>loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ItemsList>
        {data.items.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ItemsList>
      }
    </Center>
  )
}

export default graphql(ALL_ITEMS_QUERY)(Items)
