import { h, Component } from 'preact'

/**
 * HyperCubePager component
 */
export default class HyperCubePager extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    const definition = props.hypercube.definition

    this.state = {
      pagination: {
        ... definition.qInitialDataFetch[0]
      }
    }
  }

  /**
   * Get pagination state.
   */
  getPagination() {
    return this.state.pagination
  }

  /**
   * Set pagination state.
   */
  setPagination(pagination) {
    this.setState({
      pagination: pagination
    })
  }

  /**
   * Determine if load more should render.
   */
  showLoadMore() {
    const total = this.props.total
    const height = this.state.pagination.qHeight

    if (total >= height) {
      return true
    }

    return false
  }

  /**
   * @event
   */
  onLoadMore(e) {
    e.preventDefault()

    let pagination = this.getPagination()
    pagination.qHeight = (pagination.qHeight + 20)

    this.props.hypercube.results(pagination)
    this.setPagination(pagination)
  }

  render() {
    return (
      <div className="hypercube-pager">
        {this.showLoadMore() &&
          <a onClick={this.onLoadMore.bind(this)} href="#">Load More</a>
        }
      </div>
    )
  }

}
