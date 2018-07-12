$(document).ready(function() {
    $("#datepicker").datepicker({
        maxDate: new Date(),
        minDate: new Date(1900),
        changeMonth: true,
        changeYear: true,
    });
});