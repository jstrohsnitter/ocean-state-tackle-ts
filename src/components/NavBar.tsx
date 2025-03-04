// import { Link } from 'react-router';
import { NavLink } from "react-router";
import { useState, useRef, useEffect } from 'react';

const NavBar = () => {

    const [dropdownArea, setDropdownArea] = useState<boolean>(false)
    
    const [dropdownFish, setDropdownFish] = useState<boolean>(false)
    
    const dropdownRefArea = useRef(null)
    
    const dropdownRefFish = useRef(null)

    const handleClickArea = () => {
        setDropdownArea(!dropdownArea)
        // if (dropdownFish) {
        //     setDropdownFish(false)
        // }
    }

    const handleClickFish = () => {
        setDropdownFish(!dropdownFish)
        // if (dropdownArea) {
        //     setDropdownFish(false)
        // }
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRefArea.current && 
            !dropdownRefArea.current.contains(event.target as Node)
        ) {
            setDropdownArea(false);
        }
    
        if (
            dropdownRefFish.current && 
            !dropdownRefFish.current.contains(event.target as Node)
        ) {
            setDropdownFish(false);
        }
    };
    

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);


    return (
    <>
    <nav>
        <ul className="navList">
            <li>
                <NavLink to='/'>Home</NavLink>
            </li>
            <ul className="fishList" ref={dropdownRefFish} onClick={handleClickFish}>
                Fish Species of Rhode Island
                {dropdownFish ? (
                <>
                            <li>
                                <NavLink to ='/species/freshwater'>Freshwater</NavLink>
                            </li>
                            <li>
                                <NavLink to ='/species/saltwater'>Saltwater</NavLink>
                            </li>
                            <li>
                                <NavLink to='/species/pelagic'>Pelagic</NavLink>
                            </li>
                </>) : ('')}
            </ul>
            <ul className="areasList" ref={dropdownRefArea} onClick={handleClickArea}>
                Fishing Areas of Rhode Island
                {dropdownArea ? (
                <>
                            <li>
                                <NavLink to='/areas/blockisland'>Block Island</NavLink>
                            </li>
                            <li>
                                <NavLink to='/areas/lowernarragansettbay'>Lower Narragansett Bay</NavLink>
                            </li>
                            <li>
                                <NavLink to='/areas/midnarragansettbay'>Mid Narragansett Bay</NavLink>
                            </li>
                            <li>
                                <NavLink to='/areas/uppernarragansettbay'>Upper Narragansett Bay</NavLink>
                            </li>
                            <li>
                                <NavLink to='/areas/offshore'>Offshore</NavLink>
                            </li>
                            <li>
                                <NavLink to='/areas/providence'>Providence</NavLink>
                            </li>
                            <li>
                                <NavLink to='/areas/southshore'>South Shore and Jetties</NavLink>
                            </li>
                </>) : ('')}
            </ul>
            <li>
                <NavLink to ='/fishingreport'>Fishing Report</NavLink>
            </li>
            <li>
                <NavLink to ='/blog'>Blog</NavLink>
            </li>
            <li>
                <NavLink to ='/brands'>Brands</NavLink>
            </li>
            <li>
                <NavLink to ='/bait'>Bait</NavLink>
            </li>
            <li>
                <NavLink to ='/charters'>Charters</NavLink>
            </li>
        </ul>
    </nav>
    </>
    );
  };
  
  export default NavBar;