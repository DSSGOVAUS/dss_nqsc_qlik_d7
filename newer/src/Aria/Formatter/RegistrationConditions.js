import { h } from 'preact'

/**
 * Aria registration conditions formatter.
 */
export const registrationConditionsFormat = (conditions) => {
  return <ul>
    {conditions.map(condition => {
      return (
        <li>
          {condition['RegistrationConditions/Name']}
        </li>
      )
    })}
  </ul>
}
