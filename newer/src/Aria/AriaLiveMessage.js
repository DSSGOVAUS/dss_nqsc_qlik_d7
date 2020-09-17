import { h, Component } from 'preact'

/**
 * AriaLiveMessage component
 */
export default class AriaLiveMessage extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className="aria-live-messages">
        {this.props.messages.map(value => {
          return <li>{value}</li>
        })}
      </ul>
    )
  }

}
