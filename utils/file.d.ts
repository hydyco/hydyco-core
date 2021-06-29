import PathUtils from "./path";
export default class FileUtils extends PathUtils {
    constructor();
    /**
     * Read mapping file
     * @param {string} fileName - Name of the mapping file
     * */
    readMappingFile(fileName: string): any;
    /**
     * Write mapping file
     * @param {string} fileName - Name of the mapping file
     */
    writeMappingFile(fileName: string, data: Object): void;
    /**
     * Remove mapping file
     * @param {string} fileName - Name of the mapping file
     */
    deleteMappingFile(fileName: string): void;
    /**
     * Read all mapping files
     */
    readAllMappingFiles(onlyName?: boolean): Object[];
}
