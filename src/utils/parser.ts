/**
 * Data parsing required by the project
 */

export default class ParserUtils {
  /**
   * Get model name = User
   * @return {string}
   */
  getModelName(str: string) {
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
