module.exports = {
    confirmTable
}

const tables = [
    'brand_alerts',
    'brand_filter',
    'brand_editors',
    'dispensary_alerts',
    'dispensary_filer',
    'dispensary_editors',
    'event_alerts',
    'event_filer',
    'event_editors'
]

function confirmTable(table) {
    if (tables.includes(`${table}`)) {
        return true;
    } else {
        return false;
    }
}