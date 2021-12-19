import React from 'react'
import newIcon from '../../assets/images/new-gif.jpeg'
import Image from 'next/image'

interface List {
  title: string
}

interface ListProps {
  list: Array<List>
  title: string
  link: string
}

const ListCard = ({list = [], title, link}: ListProps) => {
  const listItems = list.map((item: any, key: number) => (
    <li key={'item' + key} style={{color: 'blue'}}>
      <a href={'/post/' + item.id} target="_blank" rel="noreferrer">
        {item.title}
        {!!item.isNew && (
          <span>
            <Image src={newIcon} alt={'newicon'} width={25} height={30} />
          </span>
        )}
      </a>
    </li>
  ))

  return (
    <div className="list-card-component">
      <h3>{title}</h3>
      <ul>{listItems}</ul>
      <a className="viewmore" href={link} target="_blank" rel="noreferrer">
        <p>View More</p>
      </a>
    </div>
  )
}

export default ListCard
