import { h, Component } from 'preact'

/**
 * ErrorHandler component
 */
export default class ErrorHandler extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    // Bubble up.
    console.log(props.error)
  }

  render() {
    return (
      <div class="error-handler-wrapper">
        <div class="error-handler-content">
          <p>The Provider Register is currently unavailable, please try again soon.</p>
        </div>
      </div>
    )
  }

}
