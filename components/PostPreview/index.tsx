import React from 'react'

export type PostPreview = {
  data: Post
}

export type PostList = {
  label?: string
  value?: string
  note?: string
}

export type LinkList = {
  label: string
  links: Link[]
}

export type Link = {
  url: string
  label: string
}

export type Post = {
  post_name?: string
  post_date?: string
  description?: string
  title?: string
  subtitle?: string
  caption?: string
  important_dates_notes?: string[]
  important_dates?: PostList[]
  application_fee?: PostList[]
  application_fee_notes?: string[]
  age_limit?: PostList[]
  age_limit_notes?: string[]
  qualification?: PostList[]
  qualification_notes?: string[]
  important_links?: LinkList[]
}

const PostPreview = ({data}: PostPreview) => {
  const tableBody = (title?: string, list?: PostList[], notes?: string[]) => (
    <div className="post-table-body">
      <h1>{title}</h1>
      <ul>
        {list?.map((date: PostList, index) => (
          <li key={'important_dates' + index}>
            {date.label} : {date.value}
            <span>{date.note}</span>
          </li>
        ))}
        {notes?.map((note, index) => (
          <li key={'important_dates_notes' + index}>{note}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className="post-preview">
      {/* common data */}
      <div className="post-common-data">
        <div className="name-item">
          <p className="name-item-label">Name of Post:</p>
          <p className="name-item-value">{data.post_name}</p>
        </div>
        <div className="name-item">
          <p className="name-item-label">Post Date / Update:</p>
          <p className="name-item-value">{data.post_date}</p>
        </div>
        <div className="name-item">
          <p className="name-item-label">Short Description:</p>
          <p className="name-item-value">{data.description}</p>
        </div>
      </div>

      {/* table header */}
      <div className="post-header">
        <h1>{data.title}</h1>
        <h2>{data.subtitle}</h2>
        <h3>{data.caption}</h3>
      </div>
      {/* table data */}

      <div>
        {/* Important Dates */}
        {(!!data?.important_dates?.length ||
          !!data?.important_dates_notes?.length) &&
          tableBody(
            'Important Dates',
            data?.important_dates,
            data?.important_dates_notes,
          )}

        {/* Application Fee */}
        {(!!data?.application_fee?.length ||
          !!data?.application_fee_notes?.length) &&
          tableBody(
            'Application Fee',
            data?.application_fee,
            data?.application_fee_notes,
          )}

        {/* age_limit */}
        {(!!data?.age_limit?.length || !!data?.age_limit_notes?.length) &&
          tableBody('Age Limit', data?.age_limit, data?.age_limit_notes)}

        {/* qualification */}
        {(!!data?.qualification?.length ||
          !!data?.qualification_notes?.length) &&
          tableBody(
            'Age Limit',
            data?.qualification,
            data?.qualification_notes,
          )}
      </div>

      {/* important_links */}
      <div className="post-table-links">
        {data?.important_links?.map((item, index) => (
          <div className="link-item" key={'date' + index}>
            <h5>{item.label}</h5>
            <h6>
              {item.links?.map((link, i) => (
                <a
                  key={'imp_link' + i}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </h6>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPreview
