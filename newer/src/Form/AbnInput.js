import { h, Component } from 'preact'
import Input from '../Element/Input'

/**
 * AbnInput component
 */
export default class AbnInput extends Input {

  /**
   * @params {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      attributes: {
        type: 'text',
        id: 'providers-abn-input',
        className: 'abn-input',
        placeholder: "Provider's ABN",
        ref: input => this.input = input,
        'aria-controls': 'provider-register-search-wrapper'
      }
    }
  }

  clearValue() {
    this.props.field.clear()
  }

  setValue(value) {
    if (!value || value.length == 0) {
      this.clearValue()
      return
    }
    const cleaned = value.replace(/\s+/g, '')

    this.props.field.selectMatch(cleaned)
    this.props.hypercube.filter.add('ABN', cleaned)
  }

  render() {
    return (
      <div className="abn-input-wrapper input-wrapper">
        <label for="providers-abn-input">ABN</label>
        <Input attributes={this.state.attributes} />
      </div>
    )
  }

}
