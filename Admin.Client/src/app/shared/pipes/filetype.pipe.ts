import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'filetype' })
export class FileTypePipe implements PipeTransform {
    transform(filetype) {
        return filetype.split('.').pop();
    }
}
