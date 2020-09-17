import "@babel/polyfill"
import { h, render, Component } from 'preact'

import Preload from './Component/Preload'
import ErrorHandler from './Component/ErrorHandler'
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
      announcer: false,
      error: false
    }
  }

  /**
   * Set the error handler.
   *
   * @param {object} error
   */
  setError(error) {
    this.setState({
      error: error
    })
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
        <p>Search for a provider's registration details by business or legal name.</p>

        {this.state.client ? (
          <SearchProviderResults
            announcer={this.state.announcer}
            client={this.state.client} />
        ) : (
          <Preload />
        )}

        {this.state.error &&
          <ErrorHandler
            error={this.state.error} />
        }
      </div>
    )
  }
}

export default render(<App />, document.getElementById('dssqlikobject'))
