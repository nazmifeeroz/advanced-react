import React, { useState } from 'react'
import { graphql } from 'react-apollo'
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

const CreateItem = props => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
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
    <Form
      onSubmit={async e => {
        e.preventDefault()
        setLoading(true)
        props
          .mutate({ variables: formData })
          .then(({ data: { createItem: { id } } }) => {
            Router.push({
              pathname: '/item',
              query: { id },
            })
          })
          .catch(error => {
            setErrors(error)
            setLoading(false)
          })
      }}
    >
      <Error error={errors} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
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
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  )
}

export default graphql(CREATE_ITEM_MUTATION)(CreateItem)
