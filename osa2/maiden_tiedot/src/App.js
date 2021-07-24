import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './Search'
import Countries from './Countries'
import Country from './Country'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [clickedCountry, setClickedCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = (event) => {
    setFilter(event.target.value)
    setClickedCountry('')
  }

  const selectCountry = (country) => {
    setClickedCountry(country)
  }

  const countriesToShow = countries.filter((country) => {
    const filterLow = filter.toLowerCase()
    const countryLow = country.name.toLowerCase()
    return countryLow.includes(filterLow)
  })

  return (
    <div>
      <Search filter={filter} handleChange={filterCountries} />
      <br />
      {clickedCountry
        ? <Country country={clickedCountry} />
        : <Countries countries={countriesToShow} handleClick={selectCountry} />
      }
    </div>
  )
}

export default App
