import { getNextflowPath } from "./get-nextflow-path";

const util = require('util');
const exec = util.promisify(require('child_process').exec);

/**
 * Checks whether the nextflow executable can be found
 *
 * @export
 * @param {string} [nextflowPath='nextflow']
 * @return {*}  {Promise<boolean>}
 */
export async function foundNextflow(nextflowPath: string = getNextflowPath()): Promise<boolean> {
    try {
        const { stdout, stderr } = await exec(`${nextflowPath} -h`);
        return !stderr;
    }catch(err) {
        return false;
    }
}