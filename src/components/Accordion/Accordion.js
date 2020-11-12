import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import s from './AccordionStyles.module.scss'
import { FaPlus, FaMinus } from 'react-icons/fa'

export default function Accordion() {
  const { data } = useStaticQuery(graphql`
    {
      data: allGoogleSpreadsheetFaq {
        nodes {
          answer
          question
          id
        }
      }
    }
  `)
  const { nodes } = data

  const [isOpen, setOpen] = useState('')

  const toggleAnswer = id => {
    console.log('id passed on click: ', id)
    // setNodeIndex(index)
    setOpen(currentId => (currentId !== id ? id : null))
  }

  const questions = nodes.map((item, index) => {
    return (
      <>
        <div
          key={index}
          className={s.question}
          onKeyDown={() => toggleAnswer(item.id)}
          onClick={() => toggleAnswer(item.id)}
          role="button"
          tabindex="0"
        >
          <h3>{item.question}</h3>
          {isOpen === item.id ? (
            <FaMinus className={s.icon} aria-label="open" />
          ) : (
            <FaPlus className={s.icon} aria-label="close" />
          )}
        </div>
        <div
          className={`${s.answer} ${
            isOpen === item.id ? '' : `${s.collapsed}`
          }`}
        >
          <p>{item.answer}</p>
        </div>
      </>
    )
  })
  return (
    <div className={s.container}>
      <h1 className={s.title}>FAQ</h1>
      {questions}
    </div>
  )
}
