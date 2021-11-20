import React from 'react'

interface List {
  title: string
}

interface ListProps {
  list: Array<List>
  title: string
  link: string
}

const ListCard = ({list = [], title, link}: ListProps) => {
  const listItems = list.map((item, key: number) => (
    <li key={'item' + key}>{item.title}</li>
  ))

  return (
    <div className="list-card-component">
      <h3>{title}</h3>
      <ul>{listItems}</ul>
      <a href={link} target="_blank" rel="noreferrer">
        <p>View More</p>
      </a>
    </div>
  )
}

export default ListCard
