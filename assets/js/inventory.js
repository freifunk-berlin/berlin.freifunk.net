import DataTable from "datatables.net-dt";
import languageDE from "datatables.net-plugins/i18n/de-DE.mjs";

document.addEventListener('DOMContentLoaded', function () {
    let options = {
        paging: false,
        info: false,
        columns: [{ width: '10%' }, null, null, null]
    }
    if (document.documentElement.lang === 'de') {
        options["language"] = languageDE;
    }

    new DataTable('#inventory-table', options);
})
