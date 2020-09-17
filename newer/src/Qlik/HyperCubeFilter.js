/**
 * HyperCubeFilter class
 */
export default class HyperCubeFilter {

  /**
   * @param {object} client
   */
  constructor(client) {
    this.client = client
    this.filters = {}
  }

  /**
   * Perform a results check.
   */
  async empty() {
    const terms = Object.values(this.filters)
    const fields = Object.keys(this.filters)

    return this.match(await this.client.searchResults(
      terms,
      {
        qOffset: 0,
        qCount: 1
      },
      {
        qSearchFields: fields,
        qContext: 'Cleared'
      }
    ))
  }

  /**
   * Determine if filters match field selection.
   */
  match(results) {
    const filters = Object.keys(this.filters)
    const group = results.qResult.qSearchGroupArray

    if (group.length !== 0) {
      const fields = []

      group[0].qItems.forEach(value => {
        fields.push(value.qIdentifier)
      })

      if (fields.length == filters.length) {
        return true
      }
    }

    return false
  }

  /**
   * @param {string} field
   * @param {mixed} value
   */
  add(field, value) {
    this.filters[field] = value
  }

  /**
   * Clear filter state.
   */
  clear() {
    this.filters = {}
  }

}
