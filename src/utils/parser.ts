/**
 * Data parsing required by the project
 */
import { pascalCase } from "pascal-case";

export default class ParserUtils {
  /**
   * Get model name = User
   * @return {string}
   */
  getModelName(str: string) {
    return pascalCase(str);
  }
}
