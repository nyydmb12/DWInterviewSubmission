import React from 'react'
import styled from 'styled-components'
import Moment from 'moment'
import { useTable, usePagination, useRowSelect, useSortBy } from 'react-table'
import { Table, Button } from 'reactstrap';
import * as ReferralActions from "../../Actions/ReferralAction"
import referralStore from '../../Stores/ReferralStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faAngleRight, faAngleDoubleRight, faAngleLeft, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function ReactTable({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    passedPageIndex,
    passedPageSize,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: passedPageIndex, pageSize: passedPageSize}, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    )

    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    // Render the UI for your table
    return (
        <>
         
            <Table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} onClick={() => onRowClick(cell, row.original)}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                    <tr>
                        {loading ? (
                            // Use our custom loading state to show a loading indicator
                            <td colSpan="10000">Loading...</td>
                        ) : (
                                <td colSpan="10000">
                                    Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
                                </td>
                            )}
                    </tr>
                </tbody>
            </Table>
            {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
            <div className="pagination">
                <Button className="maxButton" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <FontAwesomeIcon icon={faAngleDoubleLeft} />
                </Button>{' '}
                <Button className="minButton" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </Button>{' '}
                <Button className="minButton" onClick={() => nextPage()} disabled={!canNextPage}>

                    <FontAwesomeIcon icon={faAngleRight} />
                </Button>{' '}
                <Button className="maxButton" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <FontAwesomeIcon icon={faAngleDoubleRight} />
                </Button>{' '}
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
        </>
    )
}


function onRowClick(cell, rowData) {
    if (cell.column.Header != "Delete") {//ignore clicks on delete column
 
        ReferralActions.SetReferral(rowData);
    }
    }


  function ReferralsTable(props) {
    let serverData; //= props.data;
    const columns = React.useMemo(
        () => [
            {
                Header: 'Referrals',
                columns: [
                    {
                        Header: 'Referral',
                        accessor: d=> `${d.firstName} ${d.lastName}`,
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Amount',
                        accessor: 'amountFormatted',
                    },
                    {
                        Header: 'Member/Program',
                        accessor: d => `${d.programName} ${d.referringMemberName}`
                    },
                
                    {
                        Header: 'Created Date',
                        accessor: d => {
                            return Moment(d.createDate)
                                .local()
                                .format("MM/DD/YYYY")
                        }
					
                    },
                    {
                        Header: 'Qualified Date',
                        accessor: d => {
                            if (d.qualifiedDate == null)
                                return null
                            else {
                               return Moment(d.qualifiedDate)
                                    .local()
                                    .format("MM/DD/YYYY")
                            }
                        }

                    },
                    {
                        Header: 'Approved Date',
                        accessor: d => {
                            if (d.approvedDate == null) {
                                return null
                            }
                            else {
                                return Moment(d.approvedDate)
                                    .local()
                                    .format("MM/DD/YYYY")
                            }
                        }

                    }, {
                        Header: 'Delete',
                        accessor: "N/A",
                        Cell: ({ row }) => (

                            <Button color="danger"  onClick={() => props.deleteHandler(row.original)}>
                                 <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        )
                        },

                    
                ],
            },
      
        ],
        []
    )
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [pageCount, setPageCount] = React.useState(0)
    const fetchIdRef = React.useRef(0)

    const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
 
        // This will get called when the table needs new data
        // You could fetch your data from literally anywhere,
        // even a server. But for this example, we'll just fake it.

        // Give this fetch an ID
        const fetchId = ++fetchIdRef.current

        // Set the loading state
        setLoading(true)


            // Only update the data if this is the latest fetch
        if (fetchId === fetchIdRef.current) {
            referralStore.tablePageIndex = pageIndex;
            referralStore.tablePageSize = pageSize;
            const startRow = pageSize * pageIndex
                const endRow = startRow + pageSize
               ReferralActions.UpdateQuery("offSet", startRow)
                ReferralActions.UpdateQuery("Count", pageSize)
            props.populateHandler();
            setData(props.data)
            setPageCount(Math.ceil(referralStore.serverCount / referralStore.tablePageSize))


                // Your server could send back total page count.
                // For now we'll just fake it, too
             //   setPageCount(referralStore.serverCount)

                setLoading(false)
            }
      
    }, [])
    return (
            <ReactTable
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            pageCount={pageCount}
            passedPageIndex={referralStore.tablePageIndex}
            passedPageSize={referralStore.tablePageSize}
            />
      
    )
}


export default ReferralsTable
