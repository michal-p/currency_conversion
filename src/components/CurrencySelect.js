import React from 'react'

const Converter = ({ currencies, handler, selected }) => {


  return (
		<select value={selected} onChange={handler}>
			{
				Object.keys(currencies).map(key => {
					return <option key={key} value={key}>{key} ({currencies[key]})</option>
				})
			}
		</select>

	)
}

export default Converter