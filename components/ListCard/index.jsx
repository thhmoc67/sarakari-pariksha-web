import React from 'react'
import Image from 'next/image'

// interface List {
//   title: string
// }

// interface ListProps {
//   list: Array<List>
//   title: string
//   link: string
// }

const ListCard = ({ list = [], title, link }) => {
  const listItems = list.map((item, key) => (
    <li key={'item' + key}>
      <a href={'/post/' + item.id} target="_blank" rel="noreferrer">
        {item.post_name}
        {!!item.created_at &&
          new Date().getTime() <
          new Date(item.created_at.seconds * 1000).getTime() +
          10 * 1000 * 60 * 60 * 24 && (
            <span>
              <Image src={'https://firebasestorage.googleapis.com/v0/b/sarkari-pariksha-6199f.appspot.com/o/new-gif.jpg?alt=media&token=9089b5b7-8d8c-44d5-9372-c2040af8bb0b'} alt={'newicon'} width={25} height={30} />
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
