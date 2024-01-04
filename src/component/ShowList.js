import React, { useEffect, useState } from 'react'
import './style.css'
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

function ShowList(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [gears, setGears] = useState('Gears');
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        let filtered = props.List;
        if (searchQuery) {
            filtered = filtered.filter((task) =>
                task.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (priorityFilter !== 'All') {
            filtered = filtered.filter((task) => task.priority === priorityFilter);
        }
        if (gears !== "Gears") {
            let TodayDate = new Date().toLocaleDateString().split("/")
            const formattedDate = `${TodayDate[2]}-${TodayDate[0].padStart(2, '0')}-${TodayDate[1].padStart(2, '0')}`
            if (gears == "Upcoming") {
                filtered = filtered.filter((task) => task.dueDate > formattedDate)
            }
            else if (gears == "Overdue") {
                filtered = filtered.filter((task) => task.dueDate <= formattedDate)
            }
            else if (gears == "Completed") {
                filtered = filtered.filter((task) => task.complete == "complete")
            }
        }
        setFilteredTasks(filtered);
    }, [searchQuery, priorityFilter, gears, props.List]);



    const totalItems = filteredTasks.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handlePriorityFilter = (e) => {
        setPriorityFilter(e.target.value);
        setCurrentPage(1);
    };
    const handlesGears = (e) => {
        setGears(e.target.value)
        setCurrentPage(1);
    }


    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className='tbldesign'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Task List</h3>
                <div className='search-bar'>
                    <input type='text' placeholder='Search' value={searchQuery} onChange={handleSearch} />
                    <select value={priorityFilter} onChange={handlePriorityFilter}>
                        <option value='All'>All Priorities</option>
                        <option value='High'>High</option>
                        <option value='Medium'>Medium</option>
                        <option value='Low'>Low</option>
                    </select>
                    <select value={gears} onChange={handlesGears}>
                        <option value='Gears'>Gears</option>
                        <option value='Upcoming'>Upcoming Task</option>
                        <option value='Overdue'>Overdue Task</option>
                        <option value='Completed'>Completed Task</option>
                    </select>
                </div>
            </div>
            <div>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Complete</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((data, index) => {
                            const itemIndex = (currentPage - 1) * itemsPerPage + index + 1;
                            return (
                                <tr key={index}>
                                    <td>{itemIndex}</td>
                                    <td>{data.title}</td>
                                    <td>{data.description}</td>
                                    <td>{data.dueDate}</td>
                                    <td>{data.priority}</td>
                                    <td>{data.complete}</td>
                                    <td>
                                        <AiFillEdit style={{ color: 'green', margin: '0px 5px', fontSize: '20px', }} onClick={() => props.editData(data)} />
                                        <MdDelete style={{ color: 'red', margin: '0px 5px', fontSize: '20px', }} onClick={() => props.deleteData(data)} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {totalPages > 1 && (
                    <div>
                        <button onClick={() => goToPage(currentPage - 1)} className='next-prev-btn' disabled={currentPage === 1}>
                            Previous
                        </button>
                        {getPageNumbers().map((pageNumber) => (
                            <button key={pageNumber} className={pageNumber === currentPage ? 'active' : ''} onClick={() => goToPage(pageNumber)} >
                                {pageNumber}
                            </button>
                        ))}
                        <button onClick={() => goToPage(currentPage + 1)} className='next-prev-btn' disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowList
