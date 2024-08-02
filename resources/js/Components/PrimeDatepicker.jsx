import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const PrimeDatepicker = ({ selectionMode }) => {

    const [dates, setDates] = useState(null);
    
  return (
    <div className="card flex justify-content-center">
        <Calendar 
            value={dates} 
            onChange={(e) => setDates(e.value)} 
            selectionMode={selectionMode} 
            readOnlyInput 
            hideOnRangeSelection 
            pt={{
                root: "",
                panel: "p-5",
                dayLabel: "text-gray-900 text-sm font-medium ",
                input: "text-error-500",
                day: "text-primary-700 p-1",
                group: "flex flex-col gap-3",
                header: "flex justify-between",
                todayButton: "",
                weekDay: "text-gray-500 text-sm font-medium fontFamily"
            }}
        />
    </div>
)
}

export default PrimeDatepicker