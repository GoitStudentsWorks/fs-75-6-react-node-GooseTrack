import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { CalendarToolbar } from 'layout/CalendarToolbar/CalendarToolbar';
import { useSelector } from 'react-redux';
import { selectDay, selectMonth, selectYear } from 'redux/selectors';
import { Loader } from 'components/Loader/Loader';

const CalendarPage = ({ updatePageName }) => {
  const navigate = useNavigate();
  const month = useSelector(selectMonth);
  const day = useSelector(selectDay);
  const year = useSelector(selectYear);

  useEffect(() => {
    updatePageName('Calendar');
  }, [updatePageName]);

  const [periodType, setPeriodType] = useState('month');
  const [currentDateMonth] = useState(month);
  const [currentDateYear] = useState(year);

  useEffect(() => {
    if (periodType === 'month') {
      navigate(`/calendar/month/${month}`);
    } else if (periodType === 'day') {
      navigate(`/calendar/day/${day}`);
    }
  }, [navigate, periodType, day, month]);

  const checkDate = data => {
    const currentDate = new Date(currentDateYear, currentDateMonth, 2);
    console.log(data);
    if (data > currentDate) {
      return false;
    }
    return true;
  };

  return (
    <>
      <CalendarToolbar
        currentDateMonth={currentDateMonth}
        currentDateYear={currentDateYear}
        periodType={periodType}
        changePeriod={setPeriodType}
        checkDate={checkDate}
      />
      <Suspense fallback={<Loader type={'suspense'} />}>
        <Outlet context={[setPeriodType, checkDate]} />
      </Suspense>
    </>
  );
};

export default CalendarPage;
