import { History } from "../../types.js";
import { InigoCommand as Inigo } from "./tools.js";

const ENTRY_SPECIFIC_TARGET_COMMANDS = ["cen", "den", "dea", "dem", "dep", "men", "sea", "sem", "sep"];
const GROUP_SPECIFIC_TARGET_COMMANDS = ["cgr", "dgr", "dga", "mgr", "sga", "tgr"];

/**
 * Process history in order, following which entries/groups are
 *  deleted and them removing future references to them
 * @param history The history set to filter
 * @returns A filtered set of history, with problematic removals
 *  stripped out
 */
export function smartStripRemovedAssets(history: History): History {
    const deletedEntries: Set<string> = new Set([]);
    const deletedGroups: Set<string> = new Set([]);
    return history.filter(line => {
        const [command, ...args] = line.split(/\s/g);
        if (ENTRY_SPECIFIC_TARGET_COMMANDS.includes(command) && deletedEntries.has(args[0])) {
            return false;
        }
        if (GROUP_SPECIFIC_TARGET_COMMANDS.includes(command) && deletedGroups.has(args[0])) {
            return false;
        }
        if (command === "den") {
            const [entryID] = args;
            deletedEntries.add(entryID);
        } else if (command === "dgr") {
            const [groupID] = args;
            deletedGroups.add(groupID);
        } else if (command === "men" || command === "mgr") {
            const [targetGroupID] = args;
            if (deletedGroups.has(targetGroupID)) return false;
        } else if (command === "cen" || command === "cgr") {
            const [targetGroupID] = args;
            if (deletedGroups.has(targetGroupID)) return false;
        }
        return true;
    });
}
