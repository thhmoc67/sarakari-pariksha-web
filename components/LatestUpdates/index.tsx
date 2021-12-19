import React from 'react'
interface Update {
  title: string
  link: string
}
interface List {
  list: Array<Update>
}

const LatestUpdates = ({list}: List) => {
  return (
    <div className="latest-updates-component">
      <div className="flex-row cards">
        {list.map((update, index: number) => {
          const color = 'color-' + index
          return (
            <div key={color} className={'card '}>
              <a href={update.link} target="_blank" rel="noreferrer">
                <p className={color}>{update.title} </p>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LatestUpdates
