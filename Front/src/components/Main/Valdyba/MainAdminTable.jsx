import React, { useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineAccountCircle, MdOutlineAdminPanelSettings, MdOutlineCategory } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { BsJournals } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { RiAddFill, RiUserSettingsLine } from "react-icons/ri";
import { getAllCategoryBooks } from '../../../api/lib/CategoryBookAPI';
import { getAllUsers } from '../../../api/lib/TransactionsAPI';
import CreateCategoryBookForm from './CreateCategoryBookForm';
import CategoryBookTable from './CategoryBookTable';
import { Link, useNavigate } from "react-router-dom";
import './Styles/admin.css';

function MainAdminTable() {
  const [accountpopup, setAccountPopUp] = useState(false);
  const [all, setAll] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [CategoryBookId, setCategoryBookId] = useState(false);
  const [render, setRender] = useState(false);
  const [userId, setId] = useState([]);
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  let text = localStorage.getItem("user");
  let obj = JSON.parse(text)

  let navigate = useNavigate();
  //User account menu popup
  const toggleAccountPopup = () => {
    setAccountPopUp(!accountpopup);
  }

  //---FetchData---//

  useEffect(() => {
    getAllUsers().then((res) => {
        const userdata = res.data.data.transactions; //Fetch all existing data from database
        let userAllIds = userdata.filter((data) => data._id === obj); //Take All users Ids
        setId(...userAllIds.map((data) => data._id)); //Take User Id
        let roles = userAllIds.map((data) => data._id === obj ? (data.roles):(''));
        if(roles[0] !== 'admin'){navigate('/veikla')};
    });
  })


  useEffect(() => {

    getAllCategoryBooks().then((res) => {
      const categoryBookdata = res.data.data.categoryBook;
      setCategoryBooks(categoryBookdata)
      setCategoryBookId(...categoryBookdata.map((data) => data._id));
    });
  }, [render, CategoryBookId]);
  useEffect(() => {
    let tempAll = [...categoryBooks];
    setAll(tempAll);
  }, [categoryBooks])


  function vardas() {
    if (localStorage.user !== undefined) {
      let getVardas = localStorage.getItem("username")
      return getVardas.replace(/['"]+/g, '')
    }
  }

  useEffect(() => {
    if (localStorage.user !== undefined) {
      setUser(localStorage.getItem("user").replace(/['"]+/g, ''))
    }
  }, []);

  function clearUser() {
    localStorage.clear();
    navigate('/');

  }

  const toggleAddPopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='container-fluid p-0 m-0'>
      <div className='row d-flex flex-row flex-nowrap p-0 m-0'>
        <div className='sidenav text-warning d-lg-flex d-md-none d-sm-none flex-column flex-wrap'>
          <p className='mt-3 pt-2 pb-1 text-decoration-none'><span className='text-center p-1 me-3 fs-1'><GiWallet /></span><span>Biblioteka</span></p>
          <Link to="/veikla" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><AiOutlineTransaction /></span>
            <span className='text-light'>Veikla</span>
          </Link>
          <Link to="/admin" className='p-3 text-decoration-none text-muted'>
            <span className='text-center text-primary p-1 text-decoration-none'><MdOutlineAdminPanelSettings /></span>
            <span className='text-light'>Valdyba</span>
          </Link>
        </div>
        <div className='mainadmincontent p-0 m-0'>
          <div className='header'>

            {/* Visible on medium and small screens */}
            <nav className="d-lg-none d-md-flex d-sm-flex flex-column flex-wrap navbar border-bottom">
              <p className='w-100 p-2 fs-5 text-decoration-none text-muted text-center'><span className='text-center text-primary p-1 me-3 fs-1'><GiWallet /></span>BudgetSimple</p>
              <div className='links d-flex flex-row justify-content-center fs-5'>
                <Link to="/veikla" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><AiOutlineTransaction /></span><span className='text-light'>Veikla</span></Link>
                <Link to="/admin" className='p-3 text-decoration-none text-muted'><span className='text-center text-warning p-1 me-2 text-decoration-none border-bottom border-warning'><MdOutlineAdminPanelSettings /></span><span className='text-light'>Valdyba</span></Link>
                <div className='account d-flex flex-row justify-content-end p-3'>
                  <div className='d-flex user' onClick={toggleAccountPopup}>
                    <div className='fs-5 ps-1 pe-1 text-warning border-bottom border-warning'><MdOutlineAccountCircle className='text-light' /></div>
                    <div className='fs-5 ps-1 pe-1 text-light'>{vardas()}</div>
                    <span className='fs-5 ps-2 pe-5 text-light'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                    {accountpopup &&
                      <div className="acc-content shadow rounded">
                        <button className='btn' onClick={clearUser}>Atsijungti</button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </nav>

            {/* Visible on large screens */}
            <div className='account d-lg-flex d-md-none d-sm-none flex-row justify-content-end py-4 border-bottom'>
              <div className='d-flex user' onClick={toggleAccountPopup}>
                <div className='fs-5 ps-1 pe-1 d-block'><MdOutlineAccountCircle className='text-light' /></div>
                <div className='fs-5 ps-1 pe-1 text-light'>{vardas()}</div>
                <span className='fs-5 ps-2 pe-5 text-light'><IoIosArrowDown style={accountpopup ? { transform: 'rotate(180deg)' } : ''} /></span>
                {accountpopup &&
                  <div className="acc-content shadow rounded">
                    <button className='btn' onClick={clearUser}>Atsijungti</button>
                  </div>
                }
              </div>
            </div>
            <div className='nav ps-5'>
              <Link to="/users" className='p-2 text-decoration-none text-light'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><MdOutlineCategory /></span>Vartotojai</Link>
              <Link to="/admin" className='p-2 text-decoration-none text-light'><span className='text-center text-warning p-1 me-2 border-bottom border-warning'><BsJournals /></span>Knygu kategorijos</Link>
            </div>
          </div>
          <div className='mainadmin pt-5 text-light'>
            <div className='row activitiestable mx-auto p-3 w-100'>
              <div className='row d-flex flex-row pb-3'>
                <h5 className='w-25 p-0 m-0 pb-3 pt-1'>Kategorij?? s??ra??as</h5>
                <div className='w-25'>
                  <button
                    onClick={toggleAddPopup}
                    className='btn border border-1 p-1'>
                    <RiAddFill className='text-center' />
                    <span>Prid??ti kategorij??</span>
                  </button>
                </div>
              </div>
                <CategoryBookTable
                  CategoryBookId={CategoryBookId}
                  setAll={setAll}
                  all={all}
                  setRender={setRender}
                  render={render}
                  userId={user}
                />
            </div>
            {isOpen &&
              <CreateCategoryBookForm
                handlepopupClose={toggleAddPopup}
                setRender={setRender}
                userId={user}
                render={render}
                setId={setId}
              />}
          </div>
        </div>
      </div >
    </div>
  )
}

export default MainAdminTable