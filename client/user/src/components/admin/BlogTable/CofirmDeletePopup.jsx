import React from 'react'
import "./confirmdeletepopup.css"

function CofirmDeletePopup({ onCancelDelete, onConfilmDelete }) {
    return (
        <div className='w-100 vh-100 position-fixed top-0 start-0 delete-popup'>
            <div className='delete-box d-flex gap-3 justify-content-center align-items-center flex-column'>
                <h5>Are you sure to delete this service ?</h5>
                <div className='w-75 d-flex justify-content-evenly align-items-center'>
                    <button className='btn btn-danger w-25' onClick={onConfilmDelete}>Yes</button>
                    <button className='btn btn-secondary w-25' onClick={onCancelDelete} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CofirmDeletePopup