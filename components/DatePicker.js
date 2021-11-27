import React, { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addYears } from 'date-fns';

export default function DatePicker({ handleSelect }) {
    const [state, setState] = useState({
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      });
    useEffect(() => {
        handleSelect(state.selection);
    }, [state])
    return <DateRangePicker
                onChange={item => { setState({ ...item })}}
                months={1}
                minDate={addYears(new Date(), -30)}
                maxDate={addYears(new Date(), 1)}
                direction="vertical"
                scroll={{ enabled: true }}
                ranges={[state.selection]}
            />;
}