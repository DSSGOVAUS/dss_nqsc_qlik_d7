import { h } from 'preact'

/**
 * Aria registration conditions formatter.
 */
export const registrationGroupsFormat = (groups) => {
  return <ul>
    {groups.map(group => {
      return (
        <li>
          {group['RegistrationGroup_Name']}
        </li>
      )
    })}
  </ul>
}
