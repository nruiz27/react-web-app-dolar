import Swal from 'sweetalert2';

export const sweetAlertDelete = (title) => {
    return Swal.fire({
        title,
        text: 'Esta acción no se puede deshacer.',
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        icon: 'error',
        customClass: {
            confirmButton: 'btn btn-primary btn-custom',
            cancelButton: 'btn btn-outline-secondary btn-custom swal2-cancel-custom',
        },
    })
}