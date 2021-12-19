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
          <Link key={'sylabus' + index} href={'/post/' + result.id} passHref>
            <li style={{color: 'blue', cursor: 'pointer', marginTop: 16}}>
              {result.title}{' '}
              {!!item.isNew && (
                <span>
                  <Image src={newIcon} alt={'newicon'} width={25} height={30} />
                </span>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default PostTitleListCard
