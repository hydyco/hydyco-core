/**
 * Path util provides all the paths related to json files.
 * Which includes reading writing updating
 */
import fs from "fs";
import path from "path";
import { getFileName } from "./parser";
/**
 * Get root path of the project , logic is based on finding the node_modules folder.
 * @return {String} root path
 */
const getRootPath = (): string => {
  const pathsAvailable = __dirname.split("/").filter((path) => path.length);

  for (let i = 1; i < pathsAvailable.length; i++) {
    const path = "/" + pathsAvailable.slice(0, i).join("/");
    const checkPath = path + "/node_modules";
    if (fs.existsSync(checkPath)) {
      return path;
    }
  }
  return __dirname;
};

export const rootPath = getRootPath();

export const hydycoDir = path.join(rootPath, ".hydyco");

export const hydycoMappingDir = path.join(rootPath, ".hydyco", "models");

/**
 * Checks of all hydyco paths.
 * If not found creates new path
 */
export const checkHydyco = () => {
  const checkDirs: Array<string> = [hydycoDir, hydycoMappingDir];

  checkDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  });
};

/**
 * Get json filename path with validation
 * @param {string} fileName - Name of the mapping file
 */

export const getMappingFilePath = (fileName: string): string => {
  fileName = getFileName(fileName);
  return path.join(hydycoMappingDir, `${fileName}.json`);
};
