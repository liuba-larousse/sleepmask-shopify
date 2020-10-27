import React from 'react'
import '~/css/main.scss'
import SEO from '~/components/seo'
import Hero from '~/components/Hero/Hero'
import InfoGrid from '../components/InfoGrid/InfoGrid'
import FeaturesBar from '../components/FeaturesBar/FeaturesBar'
// import { features1, features2 } from '../components/data'
import Product from '../components/Product/Product'
import Reviews from '../components/Reviews/Reviews'
import Quote from '../components/Quote/Quote'
import Accordion from '../components/Accordion/Accordion'
import Banner from '../components/Banner/Banner'
import SideCart from '../components/SideCart/SideCart'

const IndexPage = () => {
  return (
    <>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
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
      {/*<Maillist />*/}
      <Banner />
    </>
  )
}

export default IndexPage
