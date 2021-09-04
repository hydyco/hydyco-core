/**
 * Data parsing required by the project
 */
import { pascalCase } from "pascal-case";
import { camelCase } from "camel-case";

export const getModelName = (str: string) => {
  return pascalCase(str);
};

/**
 * Get json filename  with validation
 * @param {string} fileName - Name of the mapping file
 * @return {string} fileName - user | always lowercase
 */

export const getFileName = (fileName: string): string => {
  return camelCase(fileName.split(".")[0]);
};
