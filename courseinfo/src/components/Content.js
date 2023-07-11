import Part from "./Part"

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part)=>{
                return(<Part key={part.id} part={part} />)
            })}
            <p>total of {props.parts.reduce((total, part) => total + part.exercises, 0)} exercises</p>
        </div>
    )

}
export default Content