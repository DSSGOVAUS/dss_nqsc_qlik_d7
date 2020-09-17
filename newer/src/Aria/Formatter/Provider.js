import { h } from 'preact'
import Util from '../../Util'

/**
 * Aria provider formatter
 */
export const providerFormat = (provider) => {
  return (
    <div>
      <label for="aria-provider-business-name">
        Business Name
      </label>
      <span id="aria-provider-business-name" name="aria-provider-business-name">
        {provider.ProviderBusinessName}
      </span>
      <label for="aria-provider-legal-name">
        Legal Name
      </label>
      <span id="aria-provider-legal-name" name="aria-provider-legal-name">
        {provider.ProviderLegalName}
      </span>
      <label for="aria-provider-abn">
        ABN
      </label>
      <span id="aria-provider-abn" name="aria-provider-abn">
        {provider.ABN}
      </span>
      <label for="aria-provider-website">
        Website
      </label>
      <span id="aria-provider-website" name="aria-provider-website">
        {provider.WebsiteAddress}
      </span>
      <label for="aria-provider-registration-status">
        Registration Status
      </label>
      <span id="aria-provider-registration-status" name="aria-provider-registration-status">
        {provider.RegistrationStatus}
      </span>
      <label for="aria-provider-address">
        Address
      </label>
      <span id="aria-provider-address" name="aria-provider-address">
        {Util.formatAddress([
          provider['HeadOfficeAddress/AddressLine1'],
          provider['HeadOfficeAddress/AddressLine2'],
          provider['HeadOfficeAddress/City'],
          provider['HeadOfficeAddress/State'],
          provider['HeadOfficeAddress/Postcode']
        ])}
      </span>
    </div>
  )
}

/**
 * Aria provider list item formatter
 */
export const providerListItemFormat = (provider) => {
  return (
    <li>
      <label for="aria-provider-business-name">
        Business Name
      </label>
      <span id="aria-provider-business-name" name="aria-provider-business-name">
        {provider.ProviderBusinessName}
      </span>
      <label for="aria-provider-legal-name">
        Legal Name
      </label>
      <span id="aria-provider-legal-name" name="aria-provider-legal-name">
        {provider.ProviderLegalName}
      </span>
      <label for="aria-provider-registration-status">
        Registration Status
      </label>
      <span id="aria-provider-registration-status" name="aria-provider-registration-status">
        {provider.RegistrationStatus}
      </span>
    </li>
  )
}

/**
 * Aria providers list formatter
 */
export const providersListFormat = (providers) => {
  return <ul>
    {providers.map(provider => {
      return providerListItemFormat(provider)
    })}
  </ul>
}
