import { h, Component } from 'preact'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'

import Util from '../Util'
import OutletList from './OutletList'
import HyperCube from '../Qlik/HyperCube'
import OutletListCubeDefinition from '../Qlik/CubeDefinition/OutletListCubeDefinition'
import RegistrationGroupCubeDefinition from '../Qlik/CubeDefinition/RegistrationGroupCubeDefinition'
import RegistrationConditionCubeDefinition from '../Qlik/CubeDefinition/RegistrationConditionCubeDefinition'
import { registrationConditionsFormat } from '../Aria/Formatter/RegistrationConditions'
import { registrationGroupsFormat } from '../Aria/Formatter/RegistrationGroups'
import { outletListFormat } from '../Aria/Formatter/Outlet'

/**
 * Provider component.
 */
export default class Provider extends Component {

  /**
   * @param {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      provider: {
        'ABN': '',
        'RegistrationId': '',
        'ProviderLegalName': '',
        'ProviderBusinessName': '',
        'HeadOfficeAddress/AddressLine1': '',
        'HeadOfficeAddress/AddressLine2': '',
        'HeadOfficeAddress/City': '',
        'HeadOfficeAddress/Postcode': '',
        'HeadOfficeAddress/State': '',
        'ScheduleActivityEndDate': '',
        'RegistrationStatus': '',
        'WebsiteAddress': ''
      },
      outlets: [],
      conditions: [],
      groups: []
    }

    // Outlet list cube def.
    this.outletsCube = new HyperCube({
      client: props.client,
      definition: OutletListCubeDefinition,
      callback: this.setOutlets.bind(this)
    })

    // Provider registration group cube def.
    this.groupCube = new HyperCube({
      client: props.client,
      definition: RegistrationGroupCubeDefinition,
      callback: this.setRegistrationGroups.bind(this)
    })

    // Provider registration conditions.
    this.conditionCube = new HyperCube({
      client: props.client,
      definition: RegistrationConditionCubeDefinition,
      callback: this.setRegistrationConditions.bind(this)
    })
  }

  /**
   * @lifecycle
   */
  componentDidMount() {
    window.scrollTo(0, 200)

    this.conditionCube.results()
    this.outletsCube.results()
    this.groupCube.results()
  }

  /**
   * @lifecycle
   */
  componentWillReceiveProps(nextProps, nextState) {
    // Update the provider state.
    if (nextProps.provider) {
      this.state.provider = nextProps.provider
    }
  }

  /**
   * @param {string} value
   */
  formatScheduleDate(value) {
    const parsedDate = parseISO(value)
    return format(parsedDate, 'd MMMM yyyy')
  }

  /**
   * @param {array} results
   */
  setRegistrationGroups(results) {
    const groups = results.filter(group => {
      if (group['RegistrationGroup_Name']) {
        return group
      }

      return false
    })

    this.setState({
      groups: groups
    })

    this.props.announcer.appendMessages([
      'Registration groups',
      registrationGroupsFormat(groups)
    ])
  }

  /**
   * @param {array} results
   */
  setRegistrationConditions(results) {
    const conditions = results.filter(condition => {
      if (condition['RegistrationConditions/Name']) {
        return condition
      }

      return false
    })

    this.setState({
      conditions: conditions
    })

    this.props.announcer.appendMessages([
      'Registration conditions',
      registrationConditionsFormat(conditions)
    ])
  }

  /**
   * @param {array} results
   */
  setOutlets(results) {
    // Filter empty outlets.
    const outlets = results.filter(outlet => {
      if (outlet.Name) {
        return outlet
      }

      return false
    })

    this.props.announcer.appendMessages([
      'Outlets',
      outletListFormat(outlets)
    ])

    this.setState({
      outlets: outlets
    })
  }

  render() {
    const website_href = 'http://' + this.state.provider.WebsiteAddress

    return (
      <div className="provider-page">
        <div className="provider-page-header">
          <div className="provider-title-wrapper">
            <h2>{this.state.provider.ProviderBusinessName}</h2>
          </div>

          <div className="field-wrapper">
            <label>Legal name:</label>
            <span className="field-value">
              {this.state.provider.ProviderLegalName}
            </span>
          </div>
          <div className="field-wrapper">
            <label>ABN:</label>
            <span className="field-value">
              {this.state.provider.ABN}
            </span>
          </div>
          <div className="field-wrapper">
            <label>Head office address:</label>
            <span className="field-value">
              {Util.formatAddress([
                this.state.provider['HeadOfficeAddress/AddressLine1'],
                this.state.provider['HeadOfficeAddress/AddressLine2'],
                this.state.provider['HeadOfficeAddress/City'],
                this.state.provider['HeadOfficeAddress/State'],
                this.state.provider['HeadOfficeAddress/Postcode']
              ])}
            </span>
          </div>
          <div className="field-wrapper">
            <label>Website:</label>
            <span className="field-value">
              <a target="_blank" href={website_href}>
                {this.state.provider.WebsiteAddress}
              </a>
            </span>
          </div>
        </div>

        <div className="provider-page-content">
          <div className="provider-title-wrapper">
            <h4>Registration</h4>
          </div>

          <div className={"field-wrapper registration-status " + Util.slugify(
            this.state.provider.RegistrationStatus
          )}>
            <label>Registration status:</label>
            <span className="field-value">
              {this.state.provider.RegistrationStatus}
            </span>
          </div>

          <div className="field-wrapper">
            <label>Period of registration is in force until:</label>
            <span className="field-value">
              {this.state.provider.ScheduleActivityEndDate && (
                this.formatScheduleDate(
                  this.state.provider.ScheduleActivityEndDate
                )
              )}
            </span>
          </div>

          <div className="field-wrapper">
            <p>Where the above date has passed and the registration status is approved, this indicates the registered NDIS Provider has lodged an application under section 73C of the National Disability Insurance Scheme Act 2013 (the Act) and pursuant to section 73K of the Act the registration continues in force until the Commissioner determines the application.</p>
          </div>

          <div className="field-wrapper">
            <label>Additional conditions of registration:</label>
            <span className="field-value">
              {this.state.conditions.length > 0 ? (
                <ul>
                  {this.state.conditions.map(condition => {
                    return <li>{condition['RegistrationConditions/Name']}</li>
                  })}
                </ul>
              ) : (
                <p>No additional conditions of registration.</p>
              )}
            </span>
          </div>

          <div className="field-wrapper">
            <label>Approved registration groups:</label>
            <span className="field-value">
              {this.state.groups.length > 0 ? (
                <ul>
                  {this.state.groups.map(group => {
                    return <li>{group['RegistrationGroup_Name']}</li>
                  })}
                </ul>
              ) : (
                <p>No registration groups.</p>
              )}
            </span>
          </div>
        </div>

        <div className="provider-page-footer">
          <OutletList
            outlets={this.state.outlets} />
        </div>
      </div>
    )
  }

}
