import React, { useState } from 'react'
import Modal from 'react-modal'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AddAbsentModal.css'

const AddAbsentModal = ({ isOpen, onClose, onEventAdded, customStyles, doctorList, eventList }) => {

    const [title, setTitle] = useState();
    const [date, setDate] = useState('');
    const [msgErrorSelect, setMsgErrorSelect] = useState(false);
    const [msgErrorDate, setMsgErrorDate] = useState(false);
    const [error, setError] = useState(false);


    const onSubmit = (event) => {
        event.preventDefault();

        if (!title && !date) {
            setMsgErrorSelect('Please choose the doctor want to absent!');
            setMsgErrorDate('Please choose the day want to absent!');
            return;
        } else if (!title) {
            setMsgErrorSelect('Please choose the doctor want to absent!');
            return;
        } else if (!date) {
            setMsgErrorDate('Please choose the day want to absent!');
            return;
        } else if (error) {
            return;
        }
        
        const counts = {};

        for (const event of eventList) {
            const date = new Date(event.start);
            const yearMonth = `${date?.getFullYear()}-${date?.getMonth() + 1}`;
            if (!counts[yearMonth]) {
                counts[yearMonth] = {};
            }
            if (!counts[yearMonth][event.title]) {
                counts[yearMonth][event.title] = 0;
            }
            counts[yearMonth][event.title]++;
        }


        const year = date?.getFullYear();
        const month = date?.getMonth() + 1;
        const result = year + '-' + month;

        if(counts[result] && counts[result][title] === 4) {
            setMsgErrorDate(`${title} took 4 days off this month (${month}-${year}) so he/she can't absent any more!`);
            return;
        }

        onEventAdded({
            title,
            date
        })

        onClose();
    }

    const handleDateChange = (date) => {
        date.setHours(0, 0, 0, 0);
        if (eventList.filter(event => {
            const dateConvert = new Date(event.start);
            dateConvert.setHours(0, 0, 0, 0);
            return date.getTime() === dateConvert.getTime();
        }).length > (Math.ceil(doctorList?.length * 0.2))) {
            setError(true)
            setDate(date)
            setMsgErrorDate(`${date.toLocaleDateString('en-GB')} already has maximum doctor that is absent, please choose another date!`)
        } else {    
            setError(false)
            setMsgErrorDate('')
            setDate(date)
        }

        const dateNow = new Date();
        const oneWeekLater = new Date(dateNow);
        oneWeekLater.setDate(oneWeekLater.getDate() + 6);
        if(date.getTime() < oneWeekLater.getTime()) {
            setDate(date)
            oneWeekLater.setDate(oneWeekLater.getDate() + 1);
            setMsgErrorDate(`You can only apply absent from ${oneWeekLater.toLocaleDateString('en-GB')}!`)
            setError(true)
        }
    }

    const handleSelectChange = (event) => {
        setError(false)
        setMsgErrorSelect('')
        setTitle(event.target.value);
        setError(true)
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} ariaHideApp={false}>
            <form onSubmit={onsubmit}>
                <div className="mb-3">
                    <label htmlFor="selectDoctor" className="form-label">Doctor</label>

                    <select id="selectDoctor" className="form-select" onChange={handleSelectChange} required>
                        <option selected disabled value="">Choose option</option>
                        {doctorList?.map(obj => (
                            <option key={obj.fullname} value={obj.fullname}>{obj.fullname}</option>)
                        )}
                    </select>

                    <div className='msg-warning'>
                        <span >{msgErrorSelect}</span>
                    </div>

                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Choose Date</label>

                    <div className='d-flex input-date'>
                        <label htmlFor="date"><i className="ri-calendar-fill" ></i></label>

                        <DatePicker
                            id={'date'}
                            showIcon
                            style={{
                                width: '100%',
                            }}
                            dateFormat="dd/MM/yyyy"
                            onChange={handleDateChange}
                            selected={date}
                            minDate={new Date()}
                        />
                    </div>

                    <div className='msg-warning'>
                        <span>{msgErrorDate}</span>
                    </div>
                </div>


                <button type='submit' className="btn btn-primary" onClick={onSubmit}>Add absent</button>
            </form>
        </Modal>
    )
}

export default AddAbsentModal