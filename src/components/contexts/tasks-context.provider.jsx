/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './paging.scss';
import useAjax from '../hooks/useajax';


const todoAPI = "https://api-js401.herokuapp.com/api/v1/todo";

export const CompletedTasks = React.createContext();

const IncompleteTasks = (props) => {
    let [handleRequest] = useAjax();
    let toggleMode = () => {
        setToggle(state.checked === false ? true : false)
    };

    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false)

    const [currentPage, setCurrentPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(3)
    const [pageNumberLimit, setPageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

    let pages = [];

    for (let i = 1; i < Math.ceil(data.length / itemPerPage); i++) {
        pages.push(i)
    }
    const handelClick = (e) => {
        setCurrentPage(Number(e.target.id))
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItem = data.slice(indexOfFirstItem, indexOfLastItem)


    const renderPageNumber = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {

            return <li key={number} id={number}
                onClick={handelClick}
                className={currentPage === number ? "active" : null} >

                {number}

            </li>
        } else {
            return null
        }
    })

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }

    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const handlerLimitPerPage = (e) => {

        e.preventDefault();
        setItemPerPage(e.target.number.value);
    }

    const [sort, setSort] = useState(currentItem)

    useEffect(() => {

    })




    const DifficultySortHandler = (e) => {
        let value = e.target.value;

        if (value === 'Ascending') {
            setItemPerPage(data.length)

            data.sort(function (a, b) {

                return a.difficulty - b.difficulty;
            });

        }

        else if (value === 'Descending') {

            setItemPerPage(data.length)

            data.sort(function (a, b) {

                return b.difficulty - a.difficulty;

            });

        }
    }


    let PagingState = { handlerLimitPerPage, handleNextPage, handlePrevPage, renderPageNumber, handelClick, DifficultySortHandler, currentPage, pages };
    let state = {
        checked: toggle,
        data: data,
        toggle: toggleMode,
        Page: pages,
        currentItem: currentItem,
        PagingState: PagingState
    }

    useEffect(() => {
        (async () => {

            let results = await handleRequest(todoAPI, 'get')
            let list = results.data.results.filter(val => val.complete === false);
            if (state.checked === false) {
                setData(list)

            } else if (state.checked === true) {
                results = await handleRequest(todoAPI, 'get')
                list = results.data.results.filter(val => val.complete === true);
                setData(list)
            }
        })();
    }, [state.checked])

    return (

        <CompletedTasks.Provider value={state}>

            {props.children}


        </CompletedTasks.Provider>

    )
}

export default IncompleteTasks;




