import { useState, useEffect } from 'react'
import Countries from './components/Countries';
import CountrySearch from './components/CountrySearch';
import countryService from './services/Countries';
import weatherService from './services/Weather'



function App() {

  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))
  
  const searchHandler = (event) => {
    setCountryFilter(event.target.value)
    setSelectedCountry(null)
  }
  
  const selectCountry = (event) => {
    const newCountry = countries.find((country) => country.name.common === event.target.value)
    weatherService.getWeather(newCountry.latlng[0], newCountry.latlng[1])
      .then(response => {
        setWeather(response.data)
      })
    setSelectedCountry(newCountry)
  }
  
  if(filteredCountries.length === 1 && !selectedCountry) {
    selectCountry({target:{value:filteredCountries[0].name.common}})
  }


  useEffect(() => {
    countryService.getAll()
      .then(response => {
        setCountries(response.data)
    })
  }, []);




  return (
    <div>
      <CountrySearch changeHandler={searchHandler} />
      <Countries countries={filteredCountries} selectedCountry={selectedCountry} weather={weather} selectHandler={selectCountry}/>
    </div>
  )
}

export default App;
