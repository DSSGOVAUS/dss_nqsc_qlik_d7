import { h, render, Component } from 'preact'
import { route, getCurrentUrl } from 'preact-router'

import AbnInput from './AbnInput'
import ProvidersNameInput from './ProvidersNameInput'
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
  }

  /**
   * @event
   */
  onSubmit(e) {
    e.preventDefault()

    // Reset any existing filters.
    this.props.hypercube.filter.clear()

    // Seed the filter method.
    this.ProvidersNameInput.setValue(
      this.ProvidersNameInput.getValue()
    )
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

  render() {
    return (
      <form className="search-filter-header" aria-live="off" onSubmit={this.onSubmit.bind(this)}>
        <ProvidersNameInput
          ref={input => this.ProvidersNameInput = input}
          field={{
            legal: this.props.client.field('ProviderLegalName'),
            business: this.props.client.field('ProviderBusinessName')
          }}
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
