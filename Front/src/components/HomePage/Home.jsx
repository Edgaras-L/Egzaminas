import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";

import './Home.css'

function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.user !== undefined) {
      navigate('/veikla');
    }
  })

  return (
    <>
      <div className='container-fluid home-page'>
        <div className="row d-flex justify-content-between">
          <div className="col-4">
            <Link to="/" className='text-warning mt-3 pt-2 pb-1 text-decoration-none fs-3'>
              <span className='text-center p-1 me-3 ms-2 fs-1'><FaBook /></span>
              <span className='text-secondary'>Biblioteka</span>
            </Link>
          </div>


          <div className="col-5 d-flex justify-content-end my-2 me-3">
            <Link to="/login" className='m-2 mt-2 btn btn-warning'>Prisijungimas</Link>
            <Link to="/signup" className='m-2 mt-2 btn btn-primary'>Registracija</Link>
          </div>
        </div>
        <div className="sidemenu">
          <div className="container-fluid">
            <div className="row">
              <div className="col-2">

              </div>
              <div className="col-8">
                <div className="container-fluid">
                  <div className="row m-4 pt-4">
                    <div className='col-5'>
                      <h3>Sveiki atvykę į mūsų elektroninės bibliotekos paieškos puslapį</h3>
                      <p className='text-dark'>
                      Tai integrali paieškos sistema, leidžianti ieškoti knygas ir juos rezervuoti.
                      Norėdami rasti elektroninius išteklius, užsisakyti surastus leidinius, naudotis bibliotekos skaitytojams skirtomis funkcijomis, prašytume prisijungti arba užsiregistruoti prie virtuoalios bibliotekos.
                      </p>
                    </div>
                    <img src="https://gizumokykladc.lt/wp-content/uploads/2018/04/knygos.jpg" className='col-5 w-50 h-50 m-2 rounded' alt="Budget" />
                    <p className='text-dark'>
                    Universiteto g. 3, LT-01122, Vilnius
                    El. paštas :mb@mb.vu.lt
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-2">

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Home