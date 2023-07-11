import CountryInfo from './CountryInfo'
import CountryListItem from './CountryListItem'

const Countries = (props) => {

if (props.selectedCountry) {
    return (
        <CountryInfo weather={props.weather} country={props.selectedCountry} />
    )
}
else if (props.countries.length > 10) {
    return(
        <p>Too many matches, specify another filter</p>
    )
}
else if (props.countries.length > 1 ) {
    return (
        <ul>
            {props.countries.map((country) => {
            return <CountryListItem selectHandler={props.selectHandler} key={country.name.common} country={country} />
            })}
        </ul>
    )
} 
else {
    return (
        <p>No matching countries</p>
    )
}


}
export default Countries

