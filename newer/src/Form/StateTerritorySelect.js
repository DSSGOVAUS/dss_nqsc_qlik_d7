import { h, Component } from 'preact'
import Select from '../Element/Select'

/**
 * StateTerritorySelect component
 */
export default class StateTerritorySelect extends Select {

  /**
   *
   */
  constructor(props) {
    super(props)

    this.state = {
      attributes: {
        className: 'state-select',
        placeholder: 'State/territory',
        ref: select => this.select = select
      },
      options: {
        ACT: 'ACT',
        QLD: 'QLD',
        NSW: 'NSW',
        TAS: 'TAS',
        VIC: 'VIC',
        WA: 'WA',
        SA: 'SA'
      }
    }
  }

  setValue(value) {
    this.props.field.selectMatch(
      value
    )
  }

  render() {
    return (
      <div className="state-select-wrapper select-wrapper">
        <label>State/territory</label>
        <Select
          options={this.state.options}
          attributes={this.state.attributes} />
      </div>
    )
  }

}
