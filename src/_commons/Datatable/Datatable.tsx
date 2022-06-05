import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import _ from 'lodash';
import { DataTable as PrimeDataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";

interface Props {
  data?: any[],
  children: ReactElement[],
  paginator?: boolean,
  lazy?: boolean,
  defaultRowsPerPage?: number,
  defaultPage?: number,
  totalRecords?: number,
  rowsPerPageOptions?: number[],
  loading?: boolean,
  className?: string,
  rowClass?: any,
  header?: any,
  checkBox?: boolean,
  dataKey?: string,
  footer?: any,
  paginatorRight?: any,
  stripedRows?: boolean,
  resizableColumns?: boolean,
  isSelectedItemProps?: boolean,
  selectedItemsProps?: any,
  setSelectedItemProps?: any,
  setSelectedAllProp?: any,

  globalFilter?: boolean,
  headerRightTemplate?: any;
  headerLeftTemplate?: any;
  positionLeftTemplateNextToFilter?: 'before' | 'after';
  filterPlaceholder?: string;

  rowGroupHeaderTemplate?: any,
  rowGroupFooterTemplate?: any,

  scrollable?: boolean;
  scrollDirection?: string;
  scrollHeight?: string;

  onRowToggle?: (e: any) => void,
  onLoadLazyData?: (page: number, rowsPerPage: number) => void,

  globalFilterFields?: any[];
  filters?: any;
}

const DataTable: FunctionComponent<Props> = props => {

  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [first, setFirst] = useState((props.defaultRowsPerPage || 10) * (props.defaultPage || 0));
  const [rows, setRows] = useState(props.defaultRowsPerPage as number);
  const [page, setPage] = useState(props.defaultPage as number);

  useEffect(() => {
    if (props.onLoadLazyData && props.data?.length) props.onLoadLazyData(page, rows)
  }, [page, rows])


  const bodyTemplate = (rowData: any, template: any) => <>
    <span className="p-column-title">{template?.header}</span>
    {rowData[template?.field]}
  </>

  const tableHeader = <>
    {props.positionLeftTemplateNextToFilter === 'before' ? props.headerLeftTemplate : null}
    {props.globalFilter && <div className='p-input-icon-left'>
      <i className="pi pi-search" />
      <InputText
        type="search"
        className={
          `p-inputtext-sm w-full
          ${props.headerLeftTemplate ? 'ml-1' : ''} 
          ${props.positionLeftTemplateNextToFilter === 'after' ? 'mr-1' : ''}`
        }
        onChange={(e: any) => setGlobalFilter(e.target.value)}
        placeholder={props.filterPlaceholder}
        size={50}
        autoComplete='off'
        autoFocus
      />
    </div>}
    {props.positionLeftTemplateNextToFilter === 'after' ? props.headerLeftTemplate : null}
  </>;

  const onPage = (event: any) => {
    setRows(event.rows);
    setFirst(event.first);
    setPage(event.page);
  }

  let fieldProps: any = {
    selectionMode: "single",
  };

  return <>
    {props.globalFilter && <Toolbar
      className="p-4 flex my-5 board-section surface-0"
      left={tableHeader}
      right={props.headerRightTemplate}
    />}
    <PrimeDataTable
      value={props.data}
      className={props.className}

      paginator={props.paginator}
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate=""

      lazy={props.lazy}
      first={first}
      rows={rows}
      onPage={onPage}
      totalRecords={props.totalRecords}
      rowsPerPageOptions={!props.rowsPerPageOptions ? [5, 10, 25, 50, 75, 100] : props.rowsPerPageOptions}

      paginatorLeft={<div></div>}
      paginatorRight={props.paginatorRight || (props.lazy ? <div>{props.totalRecords} itens</div> : <div>{props.data?.length} itens</div>)}
      stripedRows={props.stripedRows}
      resizableColumns={props.resizableColumns}
      columnResizeMode="expand"
      loading={props.loading}
      header={props.header}
      globalFilter={props.globalFilter ? globalFilter : undefined}
      globalFilterFields={props.globalFilterFields}
      dataKey={props.dataKey}
      footer={props.footer}
      emptyMessage="Não há itens a serem exibidos."

      selection={props.isSelectedItemProps ? props.selectedItemsProps : selectedItems}
      onSelectionChange={props.isSelectedItemProps ? e => props.setSelectedItemProps(e.value) : e => setSelectedItems(e.value)}

      scrollable={props.scrollable}
      scrollHeight={props.scrollHeight}
      // responsiveLayout="scroll"

      {...fieldProps}
    >
      {
        props.children.map(col => [
          <Column
            {...col.props}
            body={!col.props.body ? bodyTemplate : col.props.body}
          />])
      }
    </PrimeDataTable >
  </>
}

DataTable.defaultProps = {
  data: [],
  paginator: true,
  lazy: false,
  defaultRowsPerPage: 10,
  defaultPage: 0,
  totalRecords: 0,
  checkBox: false,
  stripedRows: true,
  resizableColumns: true,
  isSelectedItemProps: false,
  globalFilter: false,
  positionLeftTemplateNextToFilter: 'before',
  scrollable: false,
  rowClass: () => { },
}

export default DataTable;