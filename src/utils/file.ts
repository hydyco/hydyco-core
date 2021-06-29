/**
 * File provides all the operations on json files
 */
import * as fs from "fs";
import PathUtils from "./path";

export default class FileUtils extends PathUtils {
  constructor() {
    super();
    this.checkHydyco();
  }

  /**
   * Read mapping file
   * @param {string} fileName - Name of the mapping file
   * */
  readMappingFile(fileName: string) {
    fileName = this.getFileName(fileName);
    try {
      return JSON.parse(
        fs.readFileSync(this.getMappingFilePath(fileName)).toString()
      );
    } catch (error) {
      throw new Error(`Model name ${fileName} not found`);
    }
  }

  /**
   * Write mapping file
   * @param {string} fileName - Name of the mapping file
   */
  writeMappingFile(fileName: string, data: Object) {
    fileName = this.getFileName(fileName);
    fs.writeFileSync(this.getMappingFilePath(fileName), JSON.stringify(data));
  }

  /**
   * Remove mapping file
   * @param {string} fileName - Name of the mapping file
   */
  deleteMappingFile(fileName: string) {
    fileName = this.getFileName(fileName);
    fs.unlinkSync(this.getMappingFilePath(fileName));
  }

  /**
   * Read all mapping files
   */
  readAllMappingFiles(onlyName: boolean = false) {
    const files: Array<string> = fs
      .readdirSync(this.hydycoMappingDir)
      .filter((file) => file.includes(".json"));

    // if only name is required
    if (onlyName) {
      return files.map((file: string) => this.getFileName(file));
    }

    // return all files with json data
    return files.map((file: string) => {
      const data: Object = this.readMappingFile(file);
      return data;
    });
  }
}
