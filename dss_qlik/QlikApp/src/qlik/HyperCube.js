import HyperCubeFilter from './HyperCubeFilter'

/**
 * HyperCube client wrapper
 */
export default class HyperCube {

  /**
   * @param {object} props
   */
  constructor(props) {
    this.client = props.client
    this.definition = props.definition
    this.callback = props.callback
    this.total = 0

    // Manually track filters.
    this.filter = new HyperCubeFilter(this.client)
  }

  /**
   * @param {mixed} pagination
   */
  results(pagination = null) {
    try {
      if (pagination) {
        this.definition.qInitialDataFetch[0] = pagination
      }

      if (Object.keys(this.filter.filters).length === 0) {
        this.client.createCube(this.definition).then(
          this.getData.bind(this)
        )

        return
      }

      // No results check before hypercube creation.
      this.filter.empty().then(res => {

        // Create cube if results are available.
        if (res) {
          this.client.createCube(this.definition).then(
            this.getData.bind(this)
          )
        }
        else {
          this.callback([])
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Clear selections on results.
   */
  clear() {
    this.client.clearAll()
  }

  /**
   * Return the client.
   */
  getClient() {
    return this.client
  }

  /**
   * Return the dimensions fields.
   */
  getFields() {
    return this.definition.qDimensions.map((field, index) => {
      return field.qDef.qFieldDefs[0]
    })
  }

  /**
   * @param {object} model
   *
   * https://help.qlik.com/en-US/sense-developer/April2019/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/AppAPI/createCube-method.htm
   */
  getData(model) {
    const fields = this.getFields()

    // Early connection check.
    if (!model || typeof model.getHyperCubeData !== 'function') {
      window.location.reload()
    }

    // Set total count.
    this.total = model.layout.qHyperCube.qSize.qcy

    const resultMap = (results) => {
      return results.map(result => {
        return result.map(value => {
          if (!value.hasOwnProperty('qText')) {
            return false
          }

          return value.qText
        })
      })
    }
    const resultFormat = (results) => {
      let index = 0

      return results.reduce((format, value) => {
        format[index] = format[index] || {}
        fields.forEach((field, key) => {
          format[index][field] = value[key]
        })
        index++

        return format
      }, [{}])
    }

    return model.getHyperCubeData('/qHyperCubeDef',
      this.definition.qInitialDataFetch).then(data => {
        this.callback(
          resultFormat(
            resultMap(data[0].qMatrix)
          )
        )
      }
    )
  }

  setDefinition(definition) {
    this.definition = definition
  }

  setCallback(callback) {
    this.callback = callback
  }

}
