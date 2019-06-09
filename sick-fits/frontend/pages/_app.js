import { Container } from 'next/app'

const MyApp = ({ Component }) => {
  return (
    <Container>
      <p>true?</p>
      <Component />
    </Container>
  )
}

export default MyApp
