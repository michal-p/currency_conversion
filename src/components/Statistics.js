import React from 'react'

const Statistics = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>Most popular destination currency <em>EUR</em></p>
      <p>Total amount have been converted <em>333</em>USD</p>
      <p>Total amount of requests <em>15</em></p>
    </div>
  )
}

export default Statistics