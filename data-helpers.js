const flattenData = (data, keyParents = []) => {
    let keyParentsByKey = {};

    const _flatten = (data, keyParents = []) => {
        let flatData = {};

        for (const [key, val] of Object.entries(data)) {
            if (Array.isArray(val)) {
                flatData = { ...flatData };
                flatData[key] = val.map(d => _flatten(d));
            } else if (Object.prototype.toString.call(val) === "[object Object]") {
                flatData = { ...flatData, ..._flatten(val, [...keyParents, key]) };
            } else if (key != "__typename" && key != "__objectpath") {
                keyParentsByKey[key] = keyParents;
                flatData[key] = val;
            }
        }

        return flatData;
    };

    return { data: _flatten(data), keyParentsByKey };
};

const stringSepToNorm = (string, sep = "_") => {
    if (!string) return "Loading...";

    return string
        .split(sep)
        .map((s) => setUpper(s))
        .join(" ");
};

const setUpper = (string) => {
    return string[0].toUpperCase() + string.substring(1);
};

module.exports = { flattenData, stringSepToNorm, setUpper };