
/**
 * Static utility class.
 */
export default class Util {

  /**
   * Slugify a string.
   *
   * @param {string} string
   */
  static slugify(string) {
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  /**
   * Strip the last forward slash from a string.
   *
   * @param {string} string
   */
  static stripLastForwardslash(string) {
    return string.endsWith('/') ?
      string.slice(0, -1) : string
  }

  /**
   * @param {array} address
   */
  static formatAddress(address) {
    return address.filter(value => {
      return value ? true : false
    }).join(', ')
  }

}
