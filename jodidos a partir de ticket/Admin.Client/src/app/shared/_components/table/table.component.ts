import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { UserService } from 'src/app/pages/user/user.service';
import { Observable } from 'rxjs';
import { SortEvent, NgbdSortableHeader } from 'src/app/config/sortable.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {
  @Input() columnas: string[];
  @Input() filas: any;

  user$: Observable<any[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor( private userService: UserService) { }

  ngOnInit() {

  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.columnas = null;
    // this.service.sortColumn = column;
    // this.service.sortDirection = direction;

}

}
