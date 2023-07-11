const CountryInfo = (props) => {
    return (
        <div>
            <h2>{props.country.name.common}</h2>
            <p>capital {props.country.capital[0]}</p>
            <p>area {props.country.area}</p>
            <h3>languages:</h3>
            <ul>
                {Object.keys(props.country.languages).map((language) => {
                    return <li key={language}>{props.country.languages[language]}</li>
                })}
            </ul>
            <img src={props.country.flags.png}/> 
            {props.weather && <><h3>Weather in {props.country.capital[0]}</h3>
            <p>temperature {Math.round((props.weather.main.temp-273.15)*100)/100} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}/>
            <p>wind {props.weather.wind.speed} m/s</p>
            </>}
        </div>
    )
}
export default CountryInfo