import { h, render, Component } from 'preact'
import { route, getCurrentUrl } from 'preact-router'

import AbnInput from './AbnInput'
import ProvidersLegalNameInput from './ProvidersLegalNameInput'
import ProvidersBusinessNameInput from './ProvidersBusinessNameInput'
import StateTerritorySelect from './StateTerritorySelect'
import RegistrationStatusSelect from './RegistrationStatusSelect'

/**
 * SearchFilter component
 */
export default class SearchFilter extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      providerInput: 'business'
    }

    this.inputs = [
      {
        name: 'Business name',
        value: 'business',
        className: ['business']
      },
      {
        name: 'Legal name',
        value: 'legal',
        className: ['legal']
      }
    ]
  }

  /**
   * @event
   */
  onSubmit(e) {
    e.preventDefault()

    // Reset any existing filters.
    this.props.hypercube.filter.clear()

    if (this.state.providerInput == 'business') {
      this.ProvidersBusinessNameInput.setValue(
        this.ProvidersBusinessNameInput.getValue()
      )
    }

    if (this.state.providerInput == 'legal') {
      this.ProvidersLegalNameInput.setValue(
        this.ProvidersLegalNameInput.getValue()
      )
    }

    this.AbnInput.setValue(
      this.AbnInput.getValue()
    )
    this.RegistrationStatusSelect.setValue(
      this.RegistrationStatusSelect.getValue()
    )

    // Route to list view || update results list.
    if (getCurrentUrl() == '/') {
      this.props.hypercube.results()
    }
    else {
      route('/')
    }
  }

  /**
   * @param {string} value
   */
  setProviderInput(value) {
    if (value == 'business') {
      this.ProvidersLegalNameInput.clearValue()
    }
    else {
      this.ProvidersBusinessNameInput.clearValue()
    }

    this.setState({
      providerInput: value
    })
  }

  /**
   * @event
   */
  onProviderInputToggle(e) {
    e.preventDefault()

    this.self.setProviderInput(
      this.input.value
    )
  }

  render() {
    return (
      <form className="search-filter-header" aria-live="off" onSubmit={this.onSubmit.bind(this)}>
        <div className="provider-input-toggle">
          <ul>
            <label>Search on</label>
            {this.inputs.map(input => {
              let active = ''
              if (input.value == this.state.providerInput) {
                active = ' active'
              }

              return <li className={input.className.join(' ') + active}>
                <a href="#" onClick={this.onProviderInputToggle.bind({
                  self: this,
                  input: input })}>
                  {input.name}
                </a>
              </li>
            })}
          </ul>
        </div>

        <ProvidersBusinessNameInput
          ref={business => this.ProvidersBusinessNameInput = business}
          field={this.props.client.field('ProviderBusinessName')}
          active={this.state.providerInput}
          hypercube={this.props.hypercube} />

        <ProvidersLegalNameInput
          ref={legal => this.ProvidersLegalNameInput = legal}
          field={this.props.client.field('ProviderLegalName')}
          active={this.state.providerInput}
          hypercube={this.props.hypercube} />

        <AbnInput
          ref={input => this.AbnInput = input}
          field={this.props.client.field('ABN')}
          hypercube={this.props.hypercube} />

        <RegistrationStatusSelect
          ref={select => this.RegistrationStatusSelect = select}
          field={this.props.client.field('RegistrationStatus')}
          hypercube={this.props.hypercube} />

        <div className="actions">
          <input aria-label="Submit" type="submit" value="Search" />
        </div>
      </form>
    )
  }

}
