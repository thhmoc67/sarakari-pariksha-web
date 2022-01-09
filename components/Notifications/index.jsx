import React from 'react'


const Notifications = ({ list = [] }) => {
  const length = list.length
  const allItems = () => {
    let arr = []
    for (let i = 0; i < length; i += 3) {
      arr.push(
        <marquee behavior={'alternate'} key={'list' + i}>
          {list[i] && (
            <a
              style={{ color: 'blue', textDecoration: 'underline' }}
              href={list[i]?.link}
              target="_blank"
              rel="noreferrer">
              {list[i]?.title}
            </a>
          )}
          {list[i + 1] && (
            <>
              {' | '}
              <a
                style={{ color: 'blue', textDecoration: 'underline' }}
                href={list[i]?.link}
                target="_blank"
                rel="noreferrer">
                {list[i + 1]?.title}
              </a>
            </>
          )}
          {list[i + 2] && (
            <>
              {' | '}
              <a
                style={{ color: 'blue', textDecoration: 'underline' }}
                href={list[i]?.link}
                target="_blank"
                rel="noreferrer">
                {list[i + 2]?.title}
              </a>
            </>
          )}
        </marquee>,
      )
    }
    return arr
  }

  return (
    <div style={{ fontSize: 18, marginTop: 32, marginBottom: 32 }}>
      {allItems()}
    </div>
  )
}

export default Notifications
