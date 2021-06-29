export default class PathUtils {
    private _rootPath;
    constructor();
    /**
     * Checks of all hydyco paths.
     * If not found creates new path
     */
    checkHydyco(): void;
    /**
     * Root path of the project
     */
    get rootPath(): string;
    /**
     * Hydyco folder dir , it stores all the files related to hydyco.io
     */
    get hydycoDir(): string;
    /**
     * Hydyco mapping dir , it stores all the mapping files. Json file that store information used by plugins
     */
    get hydycoMappingDir(): string;
    /**
     * Hydyco models dir , it stores all the info for models used by plugins
     */
    get hydycoModelsDir(): string;
    /**
     * Get root path of the project , logic is based on finding the node_modules folder.
     * @return {String} root path
     */
    private _getRootPath;
    /**
     * Get json filename  with validation
     * @param {string} fileName - Name of the mapping file
     * @return {string} fileName - user | always lowercase
     */
    getFileName(fileName: string): string;
    /**
     * Get json filename path with validation
     * @param {string} fileName - Name of the mapping file
     */
    getMappingFilePath(fileName: string): string;
}
