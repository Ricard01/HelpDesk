import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Swal2 = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Injectable({
  providedIn: 'root'

})

export class SweetalertService {

constructor() {

}

error( mensaje: string ) {
  Swal2.fire({ type: 'error', title: mensaje });
}

success( mensaje: string ) {
  Swal2.fire({ type: 'success', title: mensaje });
}

warning( mensaje: string ) {
  Swal2.fire({ type: 'warning', title: mensaje });
}

info( mensaje: string ) {
  Swal2.fire({ type: 'info', title: mensaje });
}
}
