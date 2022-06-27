import React, {useState} from 'react'
import Swal from 'sweetalert2';
import ListCategoryBook from './ListCategoryBook'
import EditCategoryBook from './EditCategoryBook'
import { updateCategoryBook, getAllCategoryBooks, deleteCategoryBook } from '../../../api/lib/CategoryBookAPI';

function CategoryBookTable({setAll, CategoryBookId, all, setRender, userId}) {

    const [editId, setEditId] = useState([]);

    //---OpenEditForm---//
    const handleEdit = (e, subId) => {
        e.preventDefault();
        setEditId(subId); //Open edit form on choosen transaction type
    };
    //---HandleEdit---//
    const submitEdit = async (id, subId, data) => {
        await updateCategoryBook(id, subId, data).then(() =>
        getAllCategoryBooks()
        );
        setRender(prevState => !prevState)
        setEditId()
    }
    

    //---CancelEdit---//
    function cancelEdit() {
        setEditId('');
        console.log('canceling');
    }

    const handleDelete = (e, data, subId, id) => {
        e.preventDefault();        
            Swal
                .fire({
                    title: 'Ar tikrai norite pašalinti?',
                    text: 'Šio įrašo informacija bus prarasta negražinamai',
                    icon: 'question',
                    showCancelButton: true,
                    cancelButtonText: 'Atšaukti',
                    confirmButtonText: 'Panaikinti',
                })
                
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal
                            .fire({
                                title: 'Jūsų kategorijų įrašas sėkmingai pašalintas!',
                                icon: 'success',
                                confirmButtonText: 'Puiku!'
                            })
                        deleteCategoryBook(subId) //Delete choosen transaction type form database;
                        setAll(all.filter((data) => data._id !== subId))
                        setRender(prevState => !prevState)
                    } else if (result.isDenied) {
                        Swal.close()
                    }
                })
    }


    function sortByDate(a, b) {
        
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        return 0;
    }

      all.sort(sortByDate);
    return (
        <>{all.length === 0 ? (
            <p className='fs-5 text-center'>Nėra pridėtų išrašų</p>
        ) : (
            <>
            <table>
                <thead>
                    <tr>
                        <th>Kategoryjos</th>
                    </tr>
                </thead>
                <tbody>
                    {all.map((data) => (
                        <React.Fragment key={data._id}>
                        {data.value === "" ? (
                                <></>
                        ) : (
                            editId === data._id ? (
                                <EditCategoryBook
                                    subId ={data._id}
                                    id={CategoryBookId}
                                    defaultData={data}
                                    onCancel={cancelEdit}
                                    onSubmit={submitEdit}
                            />
                            ) : (
                                <ListCategoryBook
                                    key={data._id}
                                    subId ={data._id}
                                    defaultData={data}
                                    value={data.value}
                                    text={data.text}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                            />
                            )
                        )
                        }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            </>
            )}
        </>
    );
}

export default CategoryBookTable