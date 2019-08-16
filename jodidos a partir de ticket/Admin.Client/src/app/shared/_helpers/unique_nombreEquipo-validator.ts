import { FormControl } from '@angular/forms';
import { timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { EquipoService } from '../../pages/equipo/equipo.service';

export const nombreEquipoValidator = (equipoService: EquipoService, time: number = 700) => {
    return (input: FormControl) => {
        return timer(time).pipe(
            switchMap(() => equipoService.checkNombreEquipo(input.value)),
            map(res => {
                return res === true ? { equipoExist: true } : false;
            })
        );
    };
};


