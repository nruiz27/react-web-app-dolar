import toastr from 'toastr';

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": function(){},
    "showDuration": 300,
    "hideDuration": 300,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut",
    "escapeHtml": false
}

function toast (type, message, title) {
    switch (type) {
        case 'success':
            return toastr.success(message, title);
        case 'error':
            toastr.error(message, title);
            return;
        case 'warning':
            return toastr.warning(message, title);
        case 'info':
            return toastr.info(message, title);
    }
}

export function showMessage(type, message, title) {
    return toast(type, message, title);
}
