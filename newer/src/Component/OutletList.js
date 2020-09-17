import { h, Component } from 'preact'
import Outlet from './Outlet'
import Util from '../Util'

/**
 * Outlet list component.
 */
export default class OutletList extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      states: [],
      total: props.outlets.length
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {
      total: props.outlets.length,
      states: [... new Set(props.outlets.map((outlet) => {
        return outlet['Address/State']
      }))]
    }
  }

  render() {
    return (
      <div className="outlet-list">
        <div className="provider-title-wrapper">
          <h4>Outlets</h4>
        </div>

        <div className="field-wrapper">
          <label>Found:</label>
          <span className="field-value">
            {this.state.total} outlets
            {this.props.outlets.length > 0 &&
              ' in ' + this.state.states.join(', ')
            }
          </span>
        </div>

        {this.props.outlets.length > 0 &&
          <div className="field-wrapper">
            <label>Location names:</label>
            <span className="field-value">
              displayed in alphabetical order
            </span>

            <ul>
              {this.props.outlets.map(value => {
                return <Outlet
                  name={value.Name}
                  address={Util.formatAddress([
                    value['Address/AddressLine1'],
                    value['Address/AddressLine2'],
                    value['Address/City'],
                    value['Address/State'],
                    value['Address/Postcode']
                  ])}
                  phone={value.PhoneNumber} />
              })}
            </ul>
          </div>
        }
      </div>
    )
  }

}
