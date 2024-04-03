import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom"; 
import "react-big-calendar/lib/css/react-big-calendar.css";
import Header from "./Header";

const localizer = momentLocalizer(moment);

function CalanderPage() {
  const navigate = useNavigate(); 

  const handleSlotSelect = (slot) => {
    const selectedDate = moment(slot.start).format("YYYY-MM-DD");

    try {
      navigate(`/notes/${selectedDate}`); 
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="App ">
      <Header/>
      <div className="row">
        <div className="col me-5 ms-5 p-4">
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSlotSelect}
            style={{ height: 550 }}
          />
        </div>        
      </div>      
    </div>
  );
}

export default CalanderPage;