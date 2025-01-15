export function formatProjectName(name) {
    return name.split(/[\s.]+/).join('-').toLowerCase();
}
