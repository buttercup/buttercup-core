function generateVaultInsights(vault) {
    let groupCount = 0,
        entryCount = 0;
    const entryPasswordLengths = [];
    const processGroup = group => {
        const entries = group.getEntries();
        groupCount += 1;
        entryCount += entries.length;
        entries.forEach(entry => {
            const password = entry.getProperty("password");
            if (typeof password === "string") {
                entryPasswordLengths.push(password.length);
            }
        });
    };
    vault.getGroups().forEach(group => processGroup(group));
    const avgPassLen = entryPasswordLengths.reduce((total, next) => total + next, 0) / entryPasswordLengths.length;
    return {
        avgPassLen,
        entries: entryCount,
        groups: groupCount
    };
}

module.exports = {
    generateVaultInsights
};
