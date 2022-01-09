import {Link} from '@mui/material'
import React from 'react'
import Image from 'next/image'

function PostTitleListCard({results}) {
  return (
    <div className="PostTitleListCard">
      <ul>
        {results?.map((result, index) => (
          <a
            key={'sylabus' + index}
            href={'/post/' + result.id}
            target="_blank"
            rel="noreferrer">
            <li>
              {result.title}
              {!!result.created_at &&
                new Date().getTime() <
                  new Date(result.created_at.seconds * 1000).getTime() +
                    10 * 1000 * 60 * 60 * 24 && (
                  <span>
                    <Image
                      src={'https://firebasestorage.googleapis.com/v0/b/sarkari-pariksha-6199f.appspot.com/o/new-gif.jpg?alt=media&token=9089b5b7-8d8c-44d5-9372-c2040af8bb0b'}
                      alt={'newicon'}
                      width={25}
                      height={30}
                    />
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
