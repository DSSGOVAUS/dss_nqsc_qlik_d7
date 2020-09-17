import { h } from 'preact'
import Element from './Element'

/**
 * Defines input base class.
 */
export default class Input extends Element {

  validate(value) {
    if (!value || value.length == 0) {
      this.clearValue()
      return false
    }

    return true
  }

  setValue(value) {
    return this.validate(value)
  }

  getValue() {
    return this.input.value
  }

  clearValue() {
    this.props.field.clear()
    this.input.value = ''
  }

  /**
   * @return input element
   */
  render() {
    return (
      <span className="element element-input">
        <input {...this.props.attributes} />
      </span>
    )
  }

}
