import React from 'react'
import { useTable, usePagination, useFilters, useExpanded } from 'react-table'
import { matchSorter }  from 'match-sorter'
import pharmacyInformation from '../Files/pharmacyInformation.json'
import { STable, STBody, STBodyTR, STD, STH, STHead, STHeadTR } from './styles';
import * as FaIcons from "react-icons/fa";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search by name...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

// Our table component
function PharmacyTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Pharmacy Directory',
        columns: [
            {
              // Make an expander cell
              Header: () => null, // No header
              id: 'expander', // It needs an ID
              Cell: ({ row }) => (
                <span {...row.getToggleRowExpandedProps()}>
                  {row.isExpanded ? <FaIcons.FaMinus/> : <FaIcons.FaPlus/>}
                </span>
              ),
            },
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Pharmacy',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Address',
                accessor: 'address',
            },
            {
                Header: 'City',
                accessor: 'city',
                filterable: true,
                Filter: SelectColumnFilter,
            },
            {
                Header: 'County',
                accessor: 'county',
                filterable: true,
                Filter: SelectColumnFilter,
            }
            ],
        },
        {
        Header: 'Contact',
        columns: [
            {
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Website',
                accessor: 'website',
            }
            ],
        },
    ],
    []
  )

  const data = React.useMemo(() => pharmacyInformation.features, [])

  const renderRowSubComponent = React.useCallback(
    ({ row }) => {
        const html = (row.values.website == "NO KNOWN WEBSITE" ? "#" : row.values.website);
        return(
            <div style={{
                fontSize: '15px',
                }}>
                <strong>License ID: </strong> {row.values.id} <br/>
                <strong>City: </strong> {row.values.city} <br/>
                <strong>County: </strong> {row.values.city} <br/>
                <strong>Phone: </strong> {row.values.phone}<br/>
                <strong>Website: </strong> <a href = {html} class = 'title' id = {`link-${row.values.id}`}>
                {row.values.website} </a>
            </div>
        );

    },
    []
  )
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageIndex: 0, hiddenColumns: ['phone', 'website'] },
    },
    useFilters, // useFilters!
    useExpanded,
    usePagination,
  )

  return (
    <>
    <div>
      <STable {...getTableProps()}>
        <STHead>
          {headerGroups.map(headerGroup => (
            <STHeadTR {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <STH {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.filterable ? column.render('Filter') : null}</div>
                </STH>
              ))}
            </STHeadTR>
          ))}
        </STHead>
        <STBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <React.Fragment {...row.getRowProps()}>
                <STBodyTR>
                  {row.cells.map(cell => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </STBodyTR>
                {row.isExpanded ? (
                  <STBodyTR>
                    <STD colSpan={visibleColumns.length}>
                      {renderRowSubComponent({ row })}
                    </STD>
                  </STBodyTR>
                ) : null}
              </React.Fragment>
            )
          })}
        </STBody>
      </STable>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>
    </>
  )
}

export default PharmacyTable;