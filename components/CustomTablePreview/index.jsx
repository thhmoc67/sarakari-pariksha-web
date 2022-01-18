import React from 'react'

const CustomTablePreview = ({ data = [] , title}) => {
  // const data = [[]]
  return (
    <div className="post-table-body">
      <h1>{title}</h1>
      <table style={{ width: '100%' }}>
        {!!data?.length && (
          <thead>
            <tr>
              {data[0].map((item, j) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <th rowSpan={item.rowSpan} colSpan={item.colSpan}>
                    {item.text}
                  </th>
                )
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {data.map((colItem, i) => {
            if (i === 0) {
              return null
            }
            return (
              // eslint-disable-next-line react/jsx-key
              <tr>
                {colItem.map((item, j) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <>
                      <td rowSpan={item.rowSpan} colSpan={item.colSpan}>
                        {item.text}
                      </td>
                    </>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CustomTablePreview
