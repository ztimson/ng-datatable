import {TemplateRef} from "@angular/core";

export interface Column {
  aggregate?: (rows: any[]) => any;
  cssClass?: string; // CSS to add to column
  hide?: boolean; // Hide column
  hideMobile?: boolean; // Hide column on mobile
  initialSort?: 'asc' | 'desc'; // Sort this column initially
  label?: string; // Column name
  property?: string; // object property to provide to cell
  sort?: boolean; // Allow sorting
  sortFn?: (a: any, b: any) => 1 | 0 | -1; // Custom sorting function
  template?: TemplateRef<any>; // TemplateRef to render the column
  width?: number | string; // Width to give column
}
