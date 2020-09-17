import { h, Component } from 'preact'
import Select from '../Element/Select'

/**
 * RegistrationStatusSelect component
 */
export default class RegistrationStatusSelect extends Select {

  /**
   *
   */
  constructor(props) {
    super(props)

    this.state = {
      attributes: {
        id: 'registration-status-select',
        className: 'status-select',
        placeholder: 'Status',
        ref: select => this.select = select,
        'aria-controls': 'provider-register-search-wrapper'
      },
      options: {
        'Select status': '',
        'Approved': 'Approved',
        'Revoked': 'Revoked',
        'Banned': 'Banned',
        'Suspended': 'Suspended'
      }
    }
  }

  clearValue() {
    this.props.field.clear()
  }

  setValue(value) {
    if (value == 'Select status') {
      this.clearValue()
      return
    }

    this.props.field.selectMatch(value)
    this.props.hypercube.filter.add('RegistrationStatus', value)
  }

  render() {
    return (
      <div className="status-select-wrapper select-wrapper">
        <label for="registration-status-select">
          Registration status
        </label>
        <Select
          options={this.state.options}
          attributes={this.state.attributes} />
      </div>
    )
  }

}
