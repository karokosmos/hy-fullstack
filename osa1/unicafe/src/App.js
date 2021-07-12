import React, { useState } from 'react'

const Statistics = (props) => {
  const { good, neutral, bad, values } = props

  const all = good + neutral + bad
  const average = values.reduce((a, b) => a + b, 0) / values.length
  const positive = good / all * 100

  if (!values.length) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='Average' value={average} />
          <StatisticLine text='Positive' value={positive + '%'} />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [values, setValues] = useState([])

  const addGood = () => {
    setGood(good + 1)
    setValues(values.concat(1))
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
    setValues(values.concat(0))
  }

  const addBad = () => {
    setBad(bad + 1)
    setValues(values.concat(-1))
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <div>
        <Button text='good' handleClick={addGood} />
        <Button text='neutral' handleClick={addNeutral} />
        <Button text='bad' handleClick={addBad} />
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        values={values}
      />
    </div>
  )
}

export default App
