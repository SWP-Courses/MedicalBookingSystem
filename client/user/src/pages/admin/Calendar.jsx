import React, { useState, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import AddAbsentModal from '~/components/admin/AddAbsentModal/AddAbsentModal'
import axios from "axios";
import ROUTER from '~/api/adminRouter';
import toastOption from '~/config/toast';
import { toast } from "react-toastify";

function Calendar() {
    const [modalOpen, setModalOpen] = useState(false);
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([])
    const [doctorList, setDoctorList] = useState();

    const getAllDoctor = async () => {
        try {
            const result = await axios.get(`${ROUTER}/api/users/doctors`);
            if (result.status === 200) {
                setDoctorList(result.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }


    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            title: event.title,
            start: event.date,
            allDay: true
        })
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            height: '500px',
            width: '500px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        getAllDoctor()
    }, [])

    const handleEventAdd = async (data) => {
        const dataAfterHandle = {
            doctor_id: ((doctorList.find(doctor => doctor.fullname === data.event._def.title) || {})._id),
            date: data.event._instance.range.start.toISOString().split('T')[0]
        }

        try {
            const res = await axios.post(`${ROUTER}/api/absent/create`, dataAfterHandle)
            if (res.status === 200) {
                window.location.reload();
                toast.success("Add absent Success!", toastOption);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Add absent Failed!", toastOption);
        }
    }

    const handleDateSet = async (data) => {
        try {
            const res = await axios.get(`${ROUTER}/api/absent`)
            setEvents(res.data.map((item) => ({
                title: item.doctor_name,
                start: item.date,
                allDay: true,
            })))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='m-2'>
            <button onClick={() => setModalOpen(true)} className="btn btn-primary mt-3 mb-3">Create an absence</button>

            <div style={{ position: 'relative', zIndex: '0' }}>
                <FullCalendar
                    ref={calendarRef}
                    events={events}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd={event => handleEventAdd(event)}
                    datesSet={(date) => handleDateSet(date)}
                    headerToolbar={{
                        start: 'today prev,next',
                        center: 'title',
                        end: 'dayGridMonth'
                    }}
                    height={'85vh'}
                />
            </div>

            <AddAbsentModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onEventAdded={(event) => onEventAdded(event)}
                customStyles={customStyles}
                doctorList={doctorList}
                eventList={events}
            />
        </div>

    )
}

export default Calendar