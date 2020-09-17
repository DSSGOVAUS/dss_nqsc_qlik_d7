import { h, Component } from 'preact'
import AriaLiveMessage from './AriaLiveMessage'

/**
 * AriaLiveAnnouncer component
 */
export default class AriaLiveAnnouncer extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      type: props.type ? props.type : 'polite',
      messages: props.messages ? props.messages : []
    }
  }

  /**
   * @param {array} messages
   */
  setMessage(messages) {
    this.setState({
      messages: messages
    })
  }

  /**
   * @param {array} messages
   */
  appendMessages(messages) {
    this.setState({
      messages: this.state.messages.concat(
        messages
      )
    })
  }

  /**
   * @param {string} type
   */
  setType(type) {
    this.setState({
      type: type
    })
  }

  render() {
    return (
      <AriaLiveMessage
        messages={this.state.messages} />
    )
  }

}
