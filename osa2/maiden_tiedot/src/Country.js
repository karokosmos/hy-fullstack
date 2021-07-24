import React from 'react'

const Country = ({ country }) => {
  console.log(country)
  return (
    <div>
      <h3>{country.name}</h3>
      <p>capital {country.capital}</p>
      <br />
      <p>population {country.population}</p>
      <h4>languages</h4>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt="flag" />
    </div>
  )
}

export default Country