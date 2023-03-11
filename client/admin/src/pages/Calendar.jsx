import React, { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid'
import AddAbsentModal from '../components/AddAbsentModal/AddAbsentModal';

function Calendar() {
    const [modalOpen, setModalOpen] = useState(false);
    const calendarRef = useRef(null)

    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent(event)
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

    return (
        <>
            <button onClick={() => setModalOpen(true)}>Add event</button>

            <div style={{ position: 'relative', zIndex: '0' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                        center: 'title',
                        end: 'dayGridMonth' // will normally be on the right. if RTL, will be on the left
                      }}
                      height={'90vh'}
                />
            </div>

            <AddAbsentModal isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onEventAdded={event => onEventAdded(event)}
                customStyles={customStyles}
            />
        </>

    )
}

export default Calendar