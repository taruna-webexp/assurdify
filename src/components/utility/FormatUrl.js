export function formatProjectName(name) {
    const words = name.trim().split(/[\s.]+/);
    if (words.length === 1) {
        return words[0].toLowerCase();
    } else {
        return name.split(/[\s.]+/).join('-').toLowerCase();
    }
}
