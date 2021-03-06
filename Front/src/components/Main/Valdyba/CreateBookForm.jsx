import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { MdRestaurant } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { addNewBook } from '../../../api/lib/BookAPI';

function CreateBookForm({ handlepopupClose, render, setRender, userId }) {

    const [Book, setBook] = useState("");

    const budgetSchema = yup.object().shape({
        value: yup
            .string()
            .nullable(false)
            .strict()
            .min(2, 'Galimas minimalus 4-rių raidžių kiekis')
            .max(30, 'Galimas maksimalus 10-ties raidžių kiekis')
            .trim('Negalima įtraukti daugelio tarpų iš eilės ar priešais primąją raidę')
    })
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(budgetSchema)
    });


    const onSubmit = async (data) => {
        Swal.fire({
            title: 'Sukurimas sėkmingas!',
            text: 'Nauja kategorija pridėta prie sąrašo!',
            icon: 'success',
            confirmButtonText: 'Puiku!'
        });
        await addNewBook(data).then(() => { setRender(!render) })   //send data into database(depending on current UserId)
        handlepopupClose(false); //close create-pop-up after submit
        reset(''); //reset input values
    }


    return (
        <div className='popupform d-flex flex-column flex-nowrap'>
            <div className='formblock'>
                <div className='formtitle d-flex flex-row flex-nowrap pb-4 align-items-center p-4'>
                    <div className='border border-3 border-primary rounded text-center'><MdRestaurant className='text-dark' /></div>
                    <h4 className='ms-5 text-dark'>Naujas restoranas</h4>
                    <span onClick={handlepopupClose} className='px-1 text-end text-muted'>x</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column flex-wrap text-center'>
                    <label className='text-dark text-start'>Pavadinimas</label>
                    <input
                        {...register('value')}
                        type='text'
                        defaultValue=''
                        placeholder='Įveskite restorano pavadinimą'
                        onChange={(e) => setBook(e.target.value)}
                        className='border bg-transparent text-muted'>
                    </input>
                    <p className=' p-0 text-danger'>{errors.Book?.message}</p>
                    <div className='formfooter d-flex flex-row flex-wrap mt-5'>
                        <div className='me-4'>
                            <button
                                className='w-55 btn text-light'
                                type='submit' id="btn" disabled={!Book}>Sukurti
                            </button>
                        </div>
                        <div className='me-4'>
                            <button
                                className='w-55 btn text-dark'
                                onClick={handlepopupClose}
                                type='submit'>Atšaukti
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div>
    )
}

export default CreateBookForm