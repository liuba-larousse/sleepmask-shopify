import React from 'react'
import { FaMusic, FaPlane, FaWifi, FaShippingFast } from 'react-icons/fa'
import { BiWorld, BiHappyBeaming } from 'react-icons/bi'

const info = [
  {
    id: 0,
    title: 'First ipsum dolor sit amet',
    desc:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea.',
    // image: `${data.img1.childImageSharp.fluid}`,
  },
  {
    id: 1,
    title: 'Second ipsum dolor sit amet',
    desc:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea.',
    // image: `${data.img2.childImageSharp.fluid}`,
  },
  {
    id: 2,
    title: 'Third ipsum dolor sit amet',
    desc:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea.',
    // image: `${data.img3.childImageSharp.fluid}`,
  },
]
export { info }

const features1 = [
  {
    id: 0,
    title: 'music',
    icon: <FaMusic />,
  },
  {
    id: 1,
    title: 'travel',
    icon: <FaPlane />,
  },
  {
    id: 2,
    title: 'wifi',
    icon: <FaWifi />,
  },
]

export { features1 }

const features2 = [
  {
    id: 0,
    title: 'shipping',
    icon: <FaShippingFast />,
  },
  {
    id: 1,
    title: 'worldwide',
    icon: <BiWorld />,
  },
  {
    id: 2,
    title: 'happy guarantee',
    icon: <BiHappyBeaming />,
  },
]

export { features2 }
