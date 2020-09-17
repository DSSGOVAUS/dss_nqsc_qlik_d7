import { h } from 'preact'
import Element from './Element'

/**
 *
 */
export default class Select extends Element {

  getValue() {
    return this.select.value
  }

  /**
   * @return select element
   */
  render(props) {
    return (
      <span className="element element-select">
        <select {...props.attributes}>
          {Object.keys(props.options).map((option) => {
            return <option value={option}>{option}</option>
          })}
        </select>
      </span>
    )
  }

}
