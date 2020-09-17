import "@babel/polyfill"
import { h, render, Component } from 'preact'

import Preload from './Component/Preload'
import SearchProviderResults from './Component/SearchProviderResults'
import AriaLiveAnnouncer from './Aria/AriaLiveAnnouncer'

/**
 * Application controller
 */
class App extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      client: false,
      announcer: false
    }
  }

  /**
   * Set the app announcer.
   *
   * @param {object} announcer
   */
  setAnnouncer(announcer) {
    this.setState({
      announcer: announcer
    })
  }

  /**
   * Set the app client.
   *
   * @param {object} client
   */
  setClient(client) {
    this.setState({
      client: client
    })
  }

  render() {
    return (
      <div>
        <h4>Search for a provider's registration details</h4>

        {this.state.client ? (
          <SearchProviderResults
            announcer={this.state.announcer}
            client={this.state.client} />
        ) : (
          <Preload />
        )}
      </div>
    )
  }
}

export default render(<App />, document.getElementById('dssqlikobject'))
