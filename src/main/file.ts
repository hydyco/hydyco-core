/**
 * File provides all the operations on json files
 */
import fs from "fs";
import { getMappingFilePath, hydycoMappingDir } from "./path";
import { getFileName } from "./parser";

/**
 * Read mapping file
 * @param {string} fileName - Name of the mapping file
 * */
export const readMappingFile = (fileName: string) => {
  fileName = getFileName(fileName);
  try {
    return JSON.parse(fs.readFileSync(getMappingFilePath(fileName)).toString());
  } catch (error) {
    throw new Error(`Model name ${fileName} not found`);
  }
};

/**
 * Write mapping file
 * @param {string} fileName - Name of the mapping file
 */
export const writeMappingFile = (fileName: string, data: Object) => {
  fileName = getFileName(fileName);
  fs.writeFileSync(getMappingFilePath(fileName), JSON.stringify(data));
};

/**
 * Remove mapping file
 * @param {string} fileName - Name of the mapping file
 */
export const deleteMappingFile = (fileName: string) => {
  fileName = getFileName(fileName);
  fs.unlinkSync(getMappingFilePath(fileName));
};

/**
 * Read all mapping files
 */
export const readAllMappingFiles = (onlyName: boolean = false) => {
  const files: Array<string> = fs
    .readdirSync(hydycoMappingDir)
    .filter((file) => file.includes(".json"));

  // if only name is required
  if (onlyName) {
    return files.map((file: string) => getFileName(file));
  }

  // return all files with json data
  return files.map((file: string) => {
    const data: Object = readMappingFile(file);
    return data;
  });
};

/**
 * Create file if not exists, if does skip it
 * @param {string} fileName - name of the file
 * @param {object} fileData - data fo the json file
 */
export const createSkipFile = (fileName: string, fileData: Object) => {
  fileName = getFileName(fileName);
  if (!fs.existsSync(getMappingFilePath(fileName)))
    writeMappingFile(fileName, fileData);
};
