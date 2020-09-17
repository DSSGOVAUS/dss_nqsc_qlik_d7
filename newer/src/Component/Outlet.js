import { h, Component } from 'preact'

/**
 * Outlet component
 */
export default class Outlet extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li className="outlet-item">
        <div className="outlet-title-wrapper">
          <p>{this.props.name}</p>
        </div>
        <div className="outlet-content-wrapper">
          <span className="outlet-address">
            {this.props.address}
          </span>
          <label className="label-outlet-phone">
            Phone
            <span className="outlet-phone">
              {this.props.phone}
            </span>
          </label>
        </div>
      </li>
    )
  }

}
