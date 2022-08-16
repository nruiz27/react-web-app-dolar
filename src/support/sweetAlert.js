import Swal from 'sweetalert2';

export const sweetAlertDelete = (title) => {
    return Swal.fire({
        title,
        text: 'Esta acción no se puede deshacer.',
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        icon: 'warning',
    })
}