import { h, Component } from 'preact'

/**
 * Validation component
 */
export default class Validation extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      message: props.message
    }
  }

  render() {
    return (
      <div className="validation-wrapper">
        <span className="validation-message">
          {this.state.message}
        </span>
      </div>
    )
  }

}
