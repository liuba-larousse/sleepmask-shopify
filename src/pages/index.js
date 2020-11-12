/* eslint-disable react/prop-types */
import React from 'react'
import '~/css/main.scss'
import SEO from '~/components/seo'
import Hero from '~/components/Hero/Hero'
import InfoGrid from '../components/InfoGrid/InfoGrid'
import FeaturesBar from '../components/FeaturesBar/FeaturesBar'
import Product from '../components/Product/Product'
import Reviews from '../components/Reviews/Reviews'
import Quote from '../components/Quote/Quote'
import Accordion from '../components/Accordion/Accordion'
import Banner from '../components/Banner/Banner'
import SideCart from '../components/SideCart/SideCart'
import SalesSection from '../components/SalesSection/SalesSection'
import Modal from '../components/Modal/Modal'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO
        title={data.site.siteMetadata.title}
        keywords={[`snooze-pro`]}
        descrpition={data.site.siteMetadata.description}
      />
      <Modal />
      <SideCart />
      <Hero />
      <div className="wrapper">
        <InfoGrid />
      </div>
      <FeaturesBar num={1} />
      <div className="wrapper">
        <Product />
      </div>
      <Quote />
      <div className="wrapper">
        <Reviews />
      </div>
      <FeaturesBar num={2} />
      <div className="wrapper">
        <Accordion />
      </div>
      <SalesSection />
      <Banner />
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
