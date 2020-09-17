import { h, Component } from 'preact'
import { route } from 'preact-router'
import { Link } from 'preact-router/match'

import ProviderListCubeDefinition from '../Qlik/CubeDefinition/ProviderListCubeDefinition'
import Util from '../Util'

/**
 * @todo, provide a list item component for provider
 */
export default class ProviderList extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)
  }

  /**
   * @lifecycle
   */
  componentWillMount() {
    // Always clear specific provider selections.
    this.clearProviderSelection()

    // Ensure the correct definition is available.
    this.props.hypercube.setDefinition(ProviderListCubeDefinition)
  }

  /**
   * Clear provider id selections.
   */
  clearProviderSelection() {
    this.props.hypercube.getClient().field('RegistrationId').clear()
  }

  /**
   * @event
   */
  onClick(e) {
    e.preventDefault()

    this.self.props.selectHandler(
      this.provider
    )

    route('/' + this.provider.RegistrationId)
  }

  render() {
    return (
      <ul>
        {this.props.items.map(value => {
          const href = '/' + value.RegistrationId
          const name = value.ProviderBusinessName ?
            value.ProviderBusinessName : value.ProviderLegalName

          return <li id={'provider-' + value.RegistrationId}>
            <Link title={name} href={value.RegistrationId} onClick={this.onClick.bind({
              self: this,
              provider: value
            })}>
              {name}
            </Link>
            <div className={"registration-status " + Util.slugify(value.RegistrationStatus)}>
              <label>Registration status:</label>
              <span className="field-value">
                {value.RegistrationStatus}
              </span>
            </div>
          </li>
        })}
      </ul>
    )
  }

}
