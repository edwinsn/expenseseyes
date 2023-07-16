import React, { useEffect, useState } from 'react';

const MonthSelector = ({ setMonthSelected }) => {

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setMonthSelected(month)
  }, [month, setMonthSelected])

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const handleNextMonth = () => {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  };

  return (
    <div className='flex'>
      <button onClick={handlePrevMonth}>&lt;</button>
      <span className='mx-1'>{months[month]} {year}</span>
      <button onClick={handleNextMonth}>&gt;</button>
    </div>
  );
};

export default MonthSelector;