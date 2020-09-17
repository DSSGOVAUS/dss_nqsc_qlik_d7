import { h, Component } from 'preact'
import Input from '../Element/Input'

/**
 * ProvidersLegalNameInput component
 */
export default class ProvidersLegalNameInput extends Input {

  /**
   * @params {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      attributes: {
        type: 'text',
        id: 'providers-legal-name-input',
        className: 'name-input',
        placeholder: "Provider's legal name",
        ref: input => this.input = input,
        'aria-controls': 'provider-register-search-wrapper'
      }
    }
  }

  clearValue() {
    this.props.field.clear()

    if (typeof this.input.value != 'undefined') {
      this.input.value = ''
    }
  }

  setValue(value) {
    if (!super.setValue(value)) {
      this.clearValue()
      return
    }

    this.props.field.selectMatch('*' + value + '*')
    this.props.hypercube.filter.add('ProviderLegalName', value)
  }

  render() {
    return (
      this.props.active == 'legal' && (
        <div className="providers-input-wrapper input-wrapper">
          <label for="providers-legal-name-input">Provider's legal name</label>
          <Input attributes={this.state.attributes} />
        </div>
      )
    )
  }

}
