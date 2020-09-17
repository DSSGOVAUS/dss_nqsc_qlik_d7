import { h, Component } from 'preact'
import Validation from './Validation'
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
      validation: false,
      validationMessage: 'Please ensure the provided ABN has 11 digits.',
      attributes: {
        type: 'text',
        id: 'providers-abn-input',
        className: 'abn-input',
        placeholder: "Provider's ABN",
        ref: input => this.input = input,
        'aria-controls': 'provider-register-search-wrapper',
        'aria-invalid': 'false'
      }
    }
  }

  setValue(value) {
    if (!this.validate(value)) {
      this.clearValue()
      return
    }

    const cleaned = value.replace(/\s+/g, '')
    this.props.field.selectMatch(cleaned)
    this.props.hypercube.filter.add('ABN', cleaned)
  }

  setValidation(value) {
    this.state.attributes['aria-invalid'] = 'false'

    if (value) {
      this.state.attributes['aria-invalid'] = 'true'
    }

    this.setState({
      validation: value
    })
  }

  validate(value) {
    if (!super.validate(value)) {
      this.setValidation(false)
      return false
    }

    if (value.length <= 10) {
      this.setValidation(true)
      return false
    }

    /* Checks if value is numeric.
    if (value.match(/^\d+$/)) {
      this.setValidation(true)
      return false
    }*/

    if (this.state.validation) {
      this.setValidation(false)
    }

    return true
  }

  render() {
    return (
      <div className="abn-input-wrapper input-wrapper">
        <label for="providers-abn-input">ABN</label>
        <Input attributes={this.state.attributes} />

        {this.state.validation && (
          <Validation
            message={this.state.validationMessage} />
        )}
      </div>
    )
  }

}
