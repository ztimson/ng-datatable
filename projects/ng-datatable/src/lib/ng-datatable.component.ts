import {Component, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Column} from './column';

@Component({
  selector: 'ng-datatable',
  templateUrl: 'ng-datatable.component.html'
})
export class NgDatatableComponent implements OnInit {
  // Inputs ============================================================================================================
  @Input() cssClass: string; // CSS class to add to table element
  @Input() columns: Column[] = []; // Columns to display on table
  @Input() expandedTemplate: TemplateRef<any>; // Template to use when expanding columns
  @Input() mobileBreakpoint: number = 768; // Hide mobile false columns when screen size is less than
  @Input() pageLength: number = 20; // Number of rows per page
  @Input() page: number = 1; // Current page number
  @Input() paginate: boolean = true; // Should we paginate results
  @Input() selectionMode: null | 'single' | 'multi'; // Allow selecting no/single/multiple rows
  @Input() showCheckbox: boolean; // Selection checkboxes
  @Input() tableLayout: 'auto' | 'fixed' = 'auto'; // How column widths are decided

  // Outputs ===========================================================================================================
  @Output() filterChanged = new EventEmitter<any[]>(); // Output when filters change
  @Output() pageChanged = new EventEmitter<number>(); // Output when page is changed
  @Output() selectionChanged = new EventEmitter<any[]>(); // Output when selected rows changes

  // Properties ========================================================================================================
  filters: ((el?: any, i?: number, arr?: any[]) => boolean)[] = []; // Array of process functions to apply to data
  pages: number[] = []; // Array of possible pages
  pagedData: any[] = []; // The data for the current
  processedData: any[]; // rows left after filtering
  selectedRows = new Set<number>(); // Keep track of selected rows
  sortedColumn: number; // Column currently being sorted
  sortedDesc = false; // Is the sorted column being sorted in ascending or descending order
  width = window.innerWidth; // Width of the screen. Used for hiding mobile columns

  // Fields ============================================================================================================
  get count(): number { return this.processedData.length; } // Number of rows after filtering
  private _data: any[] = []; // Original data entered into table
  get data(): any[] { return this.processedData; } // Return the processed data
  @Input() set data(data: any[]) {
    this._data = data;
    this.process();
  }

  // ===================================================================================================================
  constructor() { }

  ngOnInit() {
    // Look through columns for an initial sort
    for(let i = 0; i < this.columns.length; i++) {
      if(this.columns[i].initialSort) {
        this.sort(i, (this.columns[i].initialSort == 'desc'));
        break;
      }
    }
  }

  // Helpers ===========================================================================================================
  private process() {
    this.clearSelected();
    this.processedData = this._data;
    this.filters.forEach(f => this.processedData = this.processedData.filter(f));
    if(this.sortedColumn != null) {
      if (this.columns[this.sortedColumn].sortFn) {
        this.processedData = this.processedData.sort(this.columns[this.sortedColumn].sortFn);
      } else {
        this.processedData = this.processedData.sort((a: any, b: any) => {
          if (a[this.columns[this.sortedColumn].property] > b[this.columns[this.sortedColumn].property]) return 1;
          if (a[this.columns[this.sortedColumn].property] < b[this.columns[this.sortedColumn].property]) return -1;
          return 0;
        });
      }
      if (this.sortedDesc) this.processedData = this.processedData.reverse();
    }

    if(this.paginate) {
      this.pages = Array(Math.ceil(this.processedData.length / this.pageLength)).fill(0).map((ignore, i) => i + 1);
      this.pagedData = this.processedData.filter((ignore, i) => i >= (this.page - 1) * this.pageLength && i < this.page * this.pageLength);
    } else {
      this.pagedData = this.processedData;
    }
  }

  addFilter(...filters: ((row?: any, index?: number, arr?: any[]) => boolean)[]) {
    this.filters = this.filters.concat(filters);
    this.process();
    this.filterChanged.emit(this.filters);
  }

  changePage(page: number) {
    if(!this.paginate || page < 1 || page > this.pages.length) return;
    this.page = page;
    this.process();
    this.pageChanged.emit(this.page);
  }

  clearFilters(update=true) {
    this.filters = [];
    if(update) this.process();
    this.filterChanged.emit(this.filters);
  }

  clearSelected() {
    let emit = this.selectedRows.size > 0;
    this.selectedRows.clear();
    if(emit) this.selectionChanged.emit([]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) { this.width = event.target.innerWidth; }

  selectAll() {
    this.processedData.forEach((ignore, i) => this.selectedRows.add(i));
    this.selectionChanged.emit(this.processedData);
  }

  sort(columnIndex: number, desc?: boolean) {
    let column = this.columns[columnIndex];
    if (!column || column.sort === false) return; // If column is un-sortable return

    // Figure out sorting direction if not supplied
    if(desc === undefined) {
      desc = false;
      if(columnIndex == this.sortedColumn) desc = !this.sortedDesc;
    }
    this.sortedColumn = columnIndex;
    this.sortedDesc = desc;

    // Preform sort
    this.process();
  }

  updateSelected(index: number) {
    if (this.selectionMode == null) return;

    if (this.selectionMode == 'single') {
      let alreadySelected = this.selectedRows.has(index);
      this.selectedRows.clear();
      if(!alreadySelected) this.selectedRows.add(index);
    } else {
      if (this.selectedRows.has(index)) {
        this.selectedRows.delete(index);
      } else {
        this.selectedRows.add(index);
      }
    }

    this.selectionChanged.emit(this.processedData.filter((row, i) => this.selectedRows.has(i)));
  }
}