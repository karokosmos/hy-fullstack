import React from 'react'
import Country from './Country'

const Countries = ({ countries, handleClick }) => {
  if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name}>
            <p>{country.name}</p>
            <button onClick={() => handleClick(country)}>show</button>
          </div>
        )}
      </div>
    )
  }

  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  return (
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
  )
}

export default Countries