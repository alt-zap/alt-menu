import React, { FC } from 'react'
import { Link } from 'gatsby'

import Seo from '../components/seo'

const IndexPage: FC = () => (
  <div>
    <Seo title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link> <br />
  </div>
)

export default IndexPage
