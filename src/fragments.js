import { graphql } from 'gatsby'

export const PageFields = graphql`
  fragment PageFields on GoogleSpreadsheetPage {
    bannerQuote
    btnBannerSection
    btnHeroSection
    btnProductSection
    heroSubtitle
    heroTitle
    pageQuote
    footerText
  }
`

export const ProductFields = graphql`
  fragment ProductFields on ShopifyProduct {
    images {
      localFile {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    shopifyId
    title
    description
    descriptionHtml
    variants {
      shopifyId
      price
      compareAtPrice
    }
    priceRange {
      minVariantPrice {
        amount
      }
    }
  }
`
