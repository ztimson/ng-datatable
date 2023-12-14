<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="https://git.zakscode.com/repo-avatars/066f56124662dc95ddacf70bdc8839b98462c885e106728b342abe8bfb5be36a" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### ng-datatable

  <!-- Description -->
  **Deprecated:** Angular Table Building Library

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/ng-datatable/tags&query=$[0].name)](https://git.zakscode.com/ztimson/ng-datatable/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/ng-datatable&query=open_pr_counter)](https://git.zakscode.com/ztimson/ng-datatable/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/ng-datatable&query=open_issues_count)](https://git.zakscode.com/ztimson/ng-datatable/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/ztimson/ng-datatable/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/ztimson/ng-datatable/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/ztimson/ng-datatable/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [ng-datatable](#top)
    - [About](#about)
      - [Demo](#demo)
      - [Built With](#built-with)
    - [Setup](#setup)
      - [Production](#production)
        - [Development](#development)
    - [Documentation](#documentation)
      - [NgDatatableComponent](#ngdatatablecomponent)
      - [Column](#column)
    - [License](#license)

## About

**Deprecated**


A lightweight, feature rich table to display data. It is built with twitter bootstrap in mind so it will be automatically styled if you have the css included but its simple table structure makes it easy to style.


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

### Built With
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

## Setup

<details>
<summary>
  <h3 id="production" style="display: inline">
    Production
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
 1. Install package `npm install @ztimson/ng-datatable --save`
 2. Import into module

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

 3. Add to template

```HTML
<ng-datatable [columns]="columns" [data]="data"></ng-datatable>
```
</details>

<details>
<summary>
  <h3 id="development" style="display: inline">
    Development
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install the dependencies: `npm install`
2. Start the Angular server: `npm run start`
3. Open [http://localhost:4200](http://localhost:4200)

</details>

## Documentation

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
| @Input() paginateCssClass: string                         | Class added to the paginator                              |
| @Input() selectionMode: null/'single'/'multi'             | Allow selecting none, single or multiple rows at once     |
| @Input() showCheckbox: boolean                            | Show checkbox' for mass selecting                         |
| @Input() tableLayout: 'auto'/'fixed'                      | CSS table layout. Defaults to 'auto'                      |
| @Output() filterChanged: EventEmitter<(a, b) => 1/0/-1[]> | Applied filters                                           |
| @Output() finished: EventEmitter<any[]>                   | Emits when finished processing data                       |
| @Output() pageChanged: EventEmitter<number>               | New page                                                  |
| @Output() processing: EventEmitter<any[]>                 | Emits when processing begins                              |
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

#### refresh()

Refreshes the grid

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


## License
Copyright © 2023 Zakary Timson | Available under the Apache 2.0 License

See the [license](./LICENSE) for more information.
