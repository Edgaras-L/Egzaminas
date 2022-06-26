import React, { useState, useEffect } from 'react';
import { MdCancel, MdInventory, MdOutlineCheckBox } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";


import './Styles/edit.css';

function EditUserDataForm({ defaultData, id, subId, onCancel, onSubmit }) {
    const [restaurant, setRestaurant] = useState(defaultData.restaurant)

    const [editpopup, setEditPopUp] = useState(false);
    const [load, setLoad] = useState(true)
    let [restaurants, setDataRestaurants] = useState([]);
    const toggleEditPopUp = () => {
        setEditPopUp(!editpopup)
    }

    const editFlows = () => {
        let dataSet = {
            restaurant: restaurant,
        };
        onSubmit(id, subId, dataSet, defaultData)
    }

    const getAllRestaurants = async () => {

        fetch('http://localhost:3000/api/v1/restaurant')
            .then(res => res.json())
            .then((json) => {
                setDataRestaurants(json.data.restaurants[0].restaurant);
                setLoad(false)
            })
    }
    useEffect(() => {
        getAllRestaurants();
    }, [])




    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // resolver: yupResolver(budgetSchema)
    });

    return (
        <>
            <tr className='editinputs text-center'>
                <td>
                {!load && <select
                        {...register('restaurant')}
                        defaultValue=''
                        onChange={(e) => setRestaurant(e.target.value)}
                        className='border bg-transparent text-muted'>
                        <option value='' disabled>--Pasirinkite Restorana--</option>
                        {restaurants.map(item => {
                            return (<option  value={item.value}>{item.value}</option>)
                        })}
                    </select>}
                    {errors.description &&
                        <p className='error1 p-1 pt-4'>{errors.restaurant?.message}</p>}
                </td>
                
                < td className='editbuttons'>
                    <button onClick={() => onCancel()} className='btn border-0 me-1'><MdCancel /></button>
                    <button onClick={handleSubmit(editFlows)} className='btn border-0 me-1' type='submit'><MdOutlineCheckBox /></button>
                    <button onClick={toggleEditPopUp} className='btn bg-transparent text-dark'>...</button>
                    {editpopup &&
                        <div className='tools-content'>
                            <div>
                                <button onClick={() => onCancel()} className='btn bg-transparent border-0'><MdCancel className='text-danger me-3' />
                                    <span className='text-secondary'>Atšaukti</span>
                                </button>
                            </div>
                            <div>
                                <button onClick={handleSubmit(editFlows)} className='btn bg-transparent border-0'><MdOutlineCheckBox className='text-primary me-3' />
                                    <span className='text-secondary'>Koreguoti</span>
                                </button>
                            </div>
                        </div>
                    }
                </td >
            </tr >
        </>
    )
}

export default EditUserDataForm