import React, { useCallback, useEffect, useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import { getSuperHeroes } from '../services/SuperHeroesService';
import { debounce } from 'lodash';
import Card from './Card';
import { Link } from "react-router-dom";

function CharactersGrid({updateFavsArray}) {
    const [getHeroes, setHeroes] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(0);
    const [orderBy, setOrderBy] = useState('name');
    const [searchBy, setSearchBy] = useState('');
    const [first, setFirst] = useState(0);

    const [sortKey, setSortKey] = useState('');
    const sortOptions = [
        {label: 'Name ↑', value: 'name'},
        {label: 'Name ↓', value: '-name'},
        {label: 'Date ↑', value: 'modified'},
        {label: 'Date ↓', value: '-modified'},      
    ];

    const onSortChange = (event) => {
        const value = event.value;
        setSortKey(value);
        setOrderBy(value);
        loadData(0, value, searchBy);
        localStorage.setItem('localSortField', value);
    };

    // eslint-disable-next-line
    const loadData = useCallback(
        debounce((offset, orderByParam, searchTerm) => {
            setLoading(true);
            fetch(getSuperHeroes(offset, orderByParam, searchTerm))
                .then((res) => res.json())
                .then((res) => {
                    setFirst(offset);
                    setTotalRecords(res.data.total);
                    setHeroes(res.data.results);
                    setLoading(false);
                });
        }, 500),
        []
    );

    const gridItem = (heroe) => {
        return <Card heroe={heroe} updateFavsArray={updateFavsArray}/>
    };

    const header = () => {
        return (
            <>
                <div className="d-flex flex-column flex-md-row justify-content-md-between header-nav flex-wrap">
                    <div className="flex header-dropdown align-items-center flex-wrap justify-content-center">
                        <img src={require("../assets/icons/characters.png")} alt="characters"/>
                        <h2 className="title mr-4">Characters</h2>
                        <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort heroes" onChange={onSortChange} className="w-full sm:w-14rem" />
                    </div>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText 
                            placeholder="Search by name"
                            value={searchBy}
                            onChange={(event) => setSearchBy(event.target.value)}
                        />
                    </span>
                </div>
                <Link to="/favourites" className="mt-2 w-100 d-flex justify-content-center">
                    <span className="gotofavourites gotofavourites-navbar">Go to favourites</span>
                </Link>
            </>
        );
    };

    useEffect(() => {
        if(localStorage.getItem('localSortField') === null){
            setOrderBy('name');
        }
        else {
            setOrderBy(String(localStorage.getItem('localSortField')));
        }
        loadData(0, orderBy, searchBy);
    }, [searchBy, loadData, orderBy]);

    return (
        <>
            <DataView 
                value={getHeroes} 
                itemTemplate={gridItem} 
                layout={'grid'} 
                header={header()} 
                totalRecords={totalRecords} 
                loading={loading}
                lazy={true}  
                paginator
                rows={10} 
                onPage={($event)=> loadData($event.first,orderBy,searchBy)}
                first={first}
            />
        </>
    );
}

export default CharactersGrid;