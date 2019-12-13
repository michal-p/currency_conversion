import React from 'react'

const Converter = () => {

  return (
    <div>
      <form onSubmit={() => console.log('submit')}>
        <div className="line">
          <label className="col75">
            <input type="number" aria-label="Currency Amount Field" />
          </label>
          <label className="col25">
            <select>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
        </div>
        <div className="line">
          <label className="col75">
            <input type="number" aria-label="Currency Amount Field" />
          </label>
          <label className="col25">
            <select value onChange>
              <option value="grapefruit">Grapefruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
            </select>
          </label>
        </div>
        <div className="line">
          <label className="col25">
            <input type="submit" value="Submit"/>
          </label>
        </div>
      </form>
    </div>
  )
}

export default Converter