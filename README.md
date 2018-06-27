# ng-datatable

[![CircleCI](https://circleci.com/gh/ztimson/ng-datatable/tree/master.svg?style=svg)](https://circleci.com/gh/ztimson/ng-datatable/tree/master)

A lightweight, feature rich table to display data. It is built with twitter bootstrap in mind but its simple table structor makes it easy to style.

Features:

- Templating columns
- Sorting
- Filtering
- Pagination
- Expanding/Master Detail
- Selection Modes
- Easy CSS
- Mobile column hiding
- Checkboxes


[View on NPM](https://www.npmjs.com/package/@ztimson/ng-datatable)

[View the demo here](https://stackblitz.com/edit/angular-rzq6xm)

## Installing

1.  Install package `npm install @ztimson/ng-datatable --save`
2.  Import into module

```Typescript
import {NgDatatableModule} from '@ztimsonm/ng-datatable'

@NgModule({
  imports: [
    NgDatatableModule,
    ...
  ],
  ...
})
export class AppModule { }
```

3.  Add to template

```HTML
<ng-datatable [columns]="columns" [data]="data"></ng-datatable>
```

## API

### NgDatatableComponent

Exported As: `NgDatatableComponent`

Selector: `ng-datatable`

#### Properties

| Name                                                      | Description                                               |
| --------------------------------------------------------- | --------------------------------------------------------- |
| @Input() cssClass: string                                 | Class added to the main table element                     |
| @Input() columns: Column[]                                | Columns to display on table                               |
| @Input() expandedTemplate: TemplateRef<any>               | An Angular template to render expanded rows               |
| @Input() mobileBreakpoint: number                         | Hide mobile columns past this point. Default: 768px       |
| @Input() pageLength: number                               | Number of rows per page. Default 20                       |
| @Input() page: number                                     | Current page                                              |
| @Input() paginate: boolean                                | Paginate rows or display all at once. Default true        |
| @Input() paginateCssClass: string                         | Class added to the paginator
| @Input() selectionMode: null/'single'/'multi'             | Allow selecting none, single or multiple rows at once     |
| @Input() showCheckbox: boolean                            | Show checkbox' for mass selecting                         |
| @Input() tableLayout: 'auto'/'fixed'                      | CSS table layout. Defaults to 'auto'                      |
| @Output() filterChanged: EventEmitter<(a, b) => 1/0/-1[]> | Applied filters                                           |
| @Output() pageChanged: EventEmitter<number>               | New page                                                  |
| @Output() selectionChanged: EventEmitter<any[]>           | Selected rows                                             |
| pagedData: any[]                                          | Array of rows on current page after sorting and filtering |
| processedData: any[]                                      | Array of remaining rows after sorting and filtering       |
| selectedRows: Set<number>                                 | Index numbers of rows currently selected                  |

#### Methods

##### addFilter(...filters)

Add function to filter rows by.

| paramater                           | Description               |
| ----------------------------------- | ------------------------- |
| ...filters: (el, i, arr) => boolean | Filters to add to dataset |

##### changePage(page)

Change the current selected page.

| paramater    | Description       |
| ------------ | ----------------- |
| page: number | Page to change to |

##### clearFilters(update)

Clear filters being applied to. Update can be set to false to prevent instant filtering in cases where you may be applying filters right after.

| paramater       | Description             |
| --------------- | ----------------------- |
| update: boolean | Clear filters imedietly |

##### clearSelected()

Clear all selected rows.

##### selectAll()

Select all rows. Ignores pagination but not filtering.

##### sort(columnIndex: number, desc?: boolean)

Sort the grid by column index

| paramater           | Description                  |
| ------------------- | ---------------------------- |
| columnIndex: number | Column index to sort by      |
| desc: boolean       | Sort ascending or descending |

##### updateSelected(index)

Virtually click on row causing selection/expanding/collapsing

| paramater     | Description   |
| ------------- | ------------- |
| index: number | Row to select |

### Column

Exported As: `Column`

#### Properties

| Name                       | Description                         |
| -------------------------- | ----------------------------------- |
| cssClass: string           | Style to add to column header       |
| hide: boolean              | Hide column                         |
| hideMobile: boolean        | Hide column on mobile devices       |
| initialSort: 'asc'/'desc'  | Sort the column initially           |
| label: string              | Column header label                 |
| property: string           | Property to display in dot notation |
| sort: boolean              | Enable/Disable sorting              |
| sortFn: (a, b) => 1/0/-1   | Custom function to sort rows by     |
| template: TemplateRef<any> | Template to render row with         |
| width: number/string       | CSS width property                  |
