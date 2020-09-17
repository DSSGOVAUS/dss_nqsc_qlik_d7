import { h } from 'preact'
import Element from './Element'

/**
 *
 */
export default class Input extends Element {

  getValue() {
    return this.input.value
  }

  /**
   * @return input element
   */
  render(props) {
    return (
      <span className="element element-input">
        <input {...props.attributes} />
      </span>
    )
  }

}
