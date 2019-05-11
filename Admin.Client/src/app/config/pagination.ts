import { SortDirection } from './sortable.directive';
import { PipeTransform } from '@angular/core';

export interface ResBusqueda {
    obj: any[];
    total: number;
  }

export interface Paginacion {
    paginaActual: number;
    itemsxPagina: number;
    totalItems: number;
    totalPaginas: number;
    termBusqueda: string;
    sortColumn: string;
    sortDirection: SortDirection;
}

const Pagination = {
    paginaActual: 1,
    itemsxPagina: 10
};

export default Pagination;

export class PaginacionRes<T> {
    result: T;
    paginacion: Paginacion;
}

function compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  function sort(obj: any[], column: string, direction: string): any[] {
    if (direction === '') {
      return obj;
    } else {
      return [...obj].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  function matches(obj: any, term: string, pipe: PipeTransform) {
    return obj.name.toLowerCase().includes(term)
      || pipe.transform(obj.area).includes(term)
      || pipe.transform(obj.population).includes(term);
  }
