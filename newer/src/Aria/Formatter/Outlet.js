import { h } from 'preact'
import Util from '../../Util'

/**
 * Aria outlet formatter
 */
export const outletFormat = (outlet) => {
  return (
    <li>
      <label for="aria-outlet-name">
        Name:
      </label>
      <span id="aria-outlet-name" name="aria-outlet-name">
        {outlet.Name}
      </span>
      <label for="aria-outlet-address">
        Address:
      </label>
      <span id="aria-outlet-address" name="aria-outlet-address">
        {Util.formatAddress([
          outlet['Address/AddressLine1'],
          outlet['Address/AddressLine2'],
          outlet['Address/City'],
          outlet['Address/State'],
          outlet['Address/Postcode']
        ])}
      </span>
      <label for="aria-outlet-phone">
        Phone:
      </label>
      <span id="aria-outlet-phone" name="aria-outlet-phone">
        {outlet.PhoneNumber}
      </span>
    </li>
  )
}

/**
 * Aria outlet list formatter.
 */
export const outletListFormat = (outlets) => {
  return <ul>
    {outlets.map(outlet => {
      return outletFormat(outlet)
    })}
  </ul>
}
