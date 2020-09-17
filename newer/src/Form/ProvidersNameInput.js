import { h, Component } from 'preact'
import Input from '../Element/Input'

/**
 * ProvidersNameInput component
 */
export default class ProvidersNameInput extends Input {

  /**
   *
   */
  constructor(props) {
    super(props)

    this.state = {
      attributes: {
        type: 'text',
        id: 'providers-name-input',
        className: 'name-input',
        placeholder: "Provider's name, e.g. Red cross",
        ref: input => this.input = input,
        'aria-controls': 'provider-register-search-wrapper'
      }
    }
  }

  clearValue() {
    this.props.field.legal.clear()
    this.props.field.business.clear()
  }

  setValue(value) {
    if (!value || value.length == 0) {
      this.clearValue()
      return
    }

    console.log(value)

    this.props.field.legal.selectMatch('*' + value + '*')
    // this.props.hypercube.filter.add('ProviderLegalName', value)

    this.props.field.business.selectMatch('*' + value + '*')
    this.props.hypercube.filter.add('ProviderBusinessName', value)
  }

  /**
   *
   */
  render() {
    return (
      <div className="providers-input-wrapper input-wrapper">
        <label for="providers-name-input">Provider's name</label>
        <Input attributes={this.state.attributes} />
      </div>
    )
  }

}
