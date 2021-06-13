
export const InfoPanel = function (props) {
  return (
    <div className="information-panel">
      <label>{props.name}</label>
      <h3>{props.value}</h3>
    </div>
  )
}