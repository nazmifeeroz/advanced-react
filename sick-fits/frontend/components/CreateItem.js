import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import formatmMoney from '../lib/formatMoney'
import Error from './ErrorMessage'

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`

export default () => {
  const [formData, setFormData] = useState({
    title: 'cool',
    description: 'default desc',
    image: 'dog.jpg',
    largeImage: 'imagge large',
    price: 1000,
  })
  const handleInputChange = ({ target: { name, type, value } }) => {
    const val = type === 'number' ? parseFloat(value) : value
    setFormData({ ...formData, [name]: value })
  }
  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={formData}>
      {(createItem, { loading, error }) => (
        <Form
          onSubmit={async e => {
            e.preventDefault()
            const {
              data: {
                createItem: { id },
              },
            } = await createItem()
            Router.push({
              pathname: '/item',
              query: { id },
            })
          }}
        >
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={formData.title}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="price">
              Price
              <input
                type="number"
                id="price"
                name="price"
                required
                value={formData.price}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="Enter A Description"
                required
                value={formData.description}
                onChange={handleInputChange}
              />
            </label>
            <button type="submi">Submit</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  )
}
