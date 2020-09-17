import { h, Component } from 'preact'
import Router, { route, getCurrentUrl } from 'preact-router'
import { createBrowserHistory } from 'history'
import { format } from 'date-fns'

import Provider from './Provider'
import ProviderList from './ProviderList'
import SearchFilter from '../Form/SearchFilter'
import HyperCube from '../Qlik/HyperCube'
import HyperCubePager from '../Qlik/HyperCubePager'
import ExtractCubeDefinition from '../Qlik/CubeDefinition/ExtractCubeDefinition'
import ProviderCubeDefinition from '../Qlik/CubeDefinition/ProviderCubeDefinition'
import ProviderListCubeDefinition from '../Qlik/CubeDefinition/ProviderListCubeDefinition'
import { providersListFormat, providerFormat } from '../Aria/Formatter/Provider'
import Util from '../Util'

/**
 * SearchProviderResults component
 */
export default class SearchProviderResults extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      extract_date: '',
      selection: false,
      results: [],
      total: 0
    }

    this.hypercube = new HyperCube({
      client: props.client,
      definition: ProviderListCubeDefinition,
      callback: this.setProviders.bind(this)
    })

    this.extractCube = new HyperCube({
      client: props.client,
      definition: ExtractCubeDefinition,
      callback: this.setExtract.bind(this)
    })
  }

  /**
   * @lifecycle
   */
  componentWillMount() {
    this.extractCube.results()

    const currentUrl = Util.stripLastForwardslash(
      getCurrentUrl()
    ).split('/').pop()

    if (currentUrl != 'search') {
      this.onProviderSelect({
        RegistrationId: currentUrl
      })
    }
  }

  /**
   * @lifecycle
   */
  componentDidUpdate(prevProps, prevState) {
    if (this.state.selection) {
      const element = this.base.querySelector(
        '#provider-' + this.state.selection
      )

      if (element) {
        element.scrollIntoView()

        // Remove previous selection
        this.state.selection = false
      }
    }
  }

  /**
   * @param {array} extracts
   */
  setExtract(extracts) {
    const extract_date = format(
      new Date(extracts[0]['ExtractDate']),
      'Do MMMM, YYYY'
    )

    this.setState({
      extract_date: extract_date
    })

    this.props.announcer.appendMessages([
      'Provider Register data was extracted on ' + extract_date
    ])
  }

  /**
   * @param {array} providers
   */
  setProviders(providers) {
    this.setState({
      results: providers,
      total: providers.length
    })

    this.props.announcer.setMessage([
      providers.length + ' of ' + this.hypercube.total + ' results found.',
      providersListFormat(providers)
    ])
  }

  /**
   * @param {array} providers
   */
  setProvider(providers) {
    this.setState({
      results: providers,
      total: providers.length
      // selection: provider
    })

    // Set the announcer message.
    this.props.announcer.setMessage([
      // 'Provider selected',
      providerFormat(providers[0])
    ])
  }

  /**
   * Clear the selection handler.
   */
  onProviderClear() {
    this.props.client.field('RegistrationId').clear()

    // Update hypercube definition.
    this.hypercube.setDefinition(ProviderListCubeDefinition)
    this.hypercube.setCallback(this.setProviders.bind(this))
  }

  /**
   * Provider selection handler.
   *
   * @param {object} provider
   */
  onProviderSelect(provider) {
    console.log(provider)

    // Select provider by id.
    this.props.client.field('RegistrationId').selectMatch(provider.RegistrationId)
    this.state.selection = provider.RegistrationId

    // Update results and set new definition.
    this.hypercube.setDefinition(ProviderCubeDefinition)
    this.hypercube.setCallback(this.setProvider.bind(this))
    this.hypercube.results()
  }

  /**
   * @event
   */
  async handleRouteChange(e) {
    if (e.previous && e.url == '/') {
      // Clear previous selections and update def.
      this.onProviderClear()

      // Update results with pager.
      const pager = this.hyperCubePager
      this.hypercube.results(
        pager ? pager.getPagination() : null
      )
    }
  }

  render() {
    return (
      <div id="provider-register-search-wrapper" role="region">
        <SearchFilter
          hypercube={this.hypercube}
          client={this.props.client}
          clear={this.onProviderClear.bind(this)} />

        <Router
          onChange={this.handleRouteChange.bind(this)}
          history={createBrowserHistory({
            basename: '/resources/ndis-provider-register/search'
          })}>

          <div className="search-results" path="/" default>
            <h3>Search results</h3>
            {this.hypercube.total ? (
              <p>{this.state.total} of {this.hypercube.total} results found. Results are displayed in alphabetical order.</p>
            ) : (
              <p>Please perform a search to see providers, results will be displayed in alphabetical order.</p>
            )}

            <ProviderList
              items={this.state.results}
              pager={this.hyperCubePager}
              hypercube={this.hypercube}
              announcer={this.props.announcer}
              selectHandler={this.onProviderSelect.bind(this)} />

            <HyperCubePager
              total={this.state.total}
              hypercube={this.hypercube}
              ref={HyperCubePager => this.hyperCubePager = HyperCubePager} />
          </div>

          <div className="provider-result" path="/:provider">
            <Provider
              client={this.props.client}
              provider={this.state.results[0]}
              announcer={this.props.announcer} />
          </div>
        </Router>

        <div className="extract-details">
          <span>Data extracted on {this.state.extract_date}</span>
        </div>
      </div>
    )
  }

}
