import { h, Component } from 'preact'
import Input from '../Element/Input'

/**
 * ProvidersBusinessNameInput component
 */
export default class ProvidersBusinessNameInput extends Input {

  /**
   * @params {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      attributes: {
        type: 'text',
        id: 'providers-business-name-input',
        className: 'name-input',
        placeholder: "Provider's business name, e.g. Red cross",
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
    this.props.hypercube.filter.add('ProviderBusinessName', value)
  }

  render() {
    return (
      this.props.active == 'business' && (
        <div className="providers-input-wrapper input-wrapper">
          <label for="providers-business-name-input">Provider's business name</label>
          <Input attributes={this.state.attributes} />
        </div>
      )
    )
  }

}
