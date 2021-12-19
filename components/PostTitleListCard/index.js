import {Link} from '@mui/material'
import React from 'react'
import newIcon from '../../assets/images/new-gif.jpeg'
import Image from 'next/image'

function PostTitleListCard({results}) {
  return (
    <div
      style={{
        padding: 12,
        borderWidth: 2,
        borderColor: 'black',
        borderStyle: 'solid',
      }}>
      <ul>
        {results?.map((result, index) => (
          <a
            key={'sylabus' + index}
            href={'/post/' + result.id}
            target="_blank"
            rel="noreferrer">
            <li style={{color: 'blue', cursor: 'pointer', marginTop: 16}}>
              {result.title}{' '}
              {!!result.isNew && (
                <span>
                  <Image src={newIcon} alt={'newicon'} width={25} height={30} />
                </span>
              )}
            </li>
          </a>
        ))}
      </ul>
    </div>
  )
}

export default PostTitleListCard
