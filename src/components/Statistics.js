import React from 'react'

const Statistics = ({ stats }) => {
  const statisticStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={statisticStyle}>
      <br />
      <p>Most popular destination currency <em>{stats.popular}</em></p>
      <p>Total amount have been converted <em>{stats.amountConvertedInUSD}</em>USD</p>
      <p>Total amount of requests <em>{stats.amountRequests}</em></p>
    </div>
  )
}

export default Statistics