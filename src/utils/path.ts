/**
 * Path util provides all the paths related to json files.
 * Which includes reading writing updating
 */
import * as fs from "fs";
import * as path from "path";

export default class PathUtils {
  private _rootPath: string;

  constructor() {
    this._rootPath = this._getRootPath();
  }

  /**
   * Checks of all hydyco paths.
   * If not found creates new path
   */
  checkHydyco() {
    const checkDirs: Array<string> = [
      this.hydycoDir,
      this.hydycoMappingDir,
      this.hydycoModelsDir,
    ];

    checkDirs.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    });
  }

  /**
   * Root path of the project
   */
  get rootPath(): string {
    return this._rootPath;
  }

  /**
   * Hydyco folder dir , it stores all the files related to hydyco.io
   */
  get hydycoDir(): string {
    return path.join(this._rootPath, ".hydyco");
  }

  /**
   * Hydyco mapping dir , it stores all the mapping files. Json file that store information used by plugins
   */
  get hydycoMappingDir(): string {
    return path.join(this._rootPath, ".hydyco", "mappings");
  }

  /**
   * Hydyco models dir , it stores all the info for models used by plugins
   */
  get hydycoModelsDir(): string {
    return path.join(this._rootPath, ".hydyco", "models");
  }

  /**
   * Get root path of the project , logic is based on finding the node_modules folder.
   * @return {String} root path
   */
  private _getRootPath = (): string => {
    const pathsAvailable = __dirname.split("/").filter((path) => path.length);

    for (let i = 1; i < pathsAvailable.length; i++) {
      const path = "/" + pathsAvailable.slice(0, i).join("/");
      const checkPath = path + "/node_modules";
      if (fs.existsSync(checkPath)) {
        return path;
      }
    }

    return "";
  };

  /**
   * Get json filename  with validation
   * @param {string} fileName - Name of the mapping file
   * @return {string} fileName - user | always lowercase
   */

  public getFileName(fileName: string): string {
    return fileName.split(".")[0].toLowerCase();
  }

  /**
   * Get json filename path with validation
   * @param {string} fileName - Name of the mapping file
   */

  public getMappingFilePath(fileName: string): string {
    fileName = this.getFileName(fileName);
    return path.join(this.hydycoMappingDir, `${fileName}.json`);
  }
}
