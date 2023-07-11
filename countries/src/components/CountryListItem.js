const CountryListItem = (props) => {
    return (
        <li>{props.country.name.common} <button value={props.country.name.common} onClick={props.selectHandler} >show</button></li>
    )
}
export default CountryListItem