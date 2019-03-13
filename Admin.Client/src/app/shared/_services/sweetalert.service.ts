import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const Swal2 = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});


async function getImage () {
  const {value: file} = await Swal.fire({
    title: 'Actualizar Imagen de Usuario',
    input: 'file',
    inputAttributes: {
      'accept': 'image/*',
      'aria-label': 'Imagen Actualizada'
    }
  });
   if (file) {
    const reader = new FileReader;
    reader.onload = (e) => {
      Swal.fire({
        title: 'Imagen Actualizada',
        imageUrl: reader.result.toString(),
        imageAlt: 'Imagen Actualizada'
      });
    };
    reader.readAsDataURL(file);
  }
}

@Injectable({
  providedIn: 'root'

})

export class SweetalertService {

constructor() {

}
upload() {
  getImage();
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
