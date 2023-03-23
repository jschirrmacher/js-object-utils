import { flatten, inflate } from "./flattenInflate";
function union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
}
/**
 * Find the differences between two objects.
 *
 * @param from original object
 * @param to modified object
 * @param include defines which values the result should include
 * @returns a new object containing only the properties which are modified with the original and the modified values.
 */
export function diff(from, to, include = "both") {
    const values1 = flatten(from);
    const values2 = flatten(to);
    const valueMapping = {
        from: (p) => [p, values1[p]],
        to: (p) => [p, values2[p]],
        both: (p) => [p, { from: values1[p], to: values2[p] }],
    };
    const changes = union(Object.keys(values1), Object.keys(values2))
        .filter((p) => values1[p] !== values2[p])
        .map((p) => valueMapping[include](p));
    return inflate(Object.fromEntries(changes));
}
//# sourceMappingURL=diff.js.map