import React, { useState } from 'react'
import Modal from 'react-modal'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddAbsentModal.css'

const AddAbsentModal = ({ isOpen, onClose, onEventAdded, customStyles }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const onSubmit = (event) => {
        event.prentDefault();

        onEventAdded({
            title, date
        })

        onClose();
    }

    const handleDateChange = (date) => {
        setDate(date)
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <form onSubmit={onsubmit}>
                <input placeholder='DoctorName' value={title} onChange={e => setTitle(e.target.value)} />

                <DatePicker
                    showIcon
                    style={{
                        width: '50%',
                    }}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleDateChange}
                    selected={date}
                />

                <button type='submit' onClick={onSubmit}>Add absent</button>
            </form>
        </Modal>
    )
}

export default AddAbsentModal