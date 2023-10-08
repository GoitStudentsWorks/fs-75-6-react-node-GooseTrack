import React, { useState } from 'react';
import { DatePickerCustom } from '../DatePickerCustom/DatePickerCustom';
import { ReactComponent as ArrowLeft } from '../../assets/icons/chevron-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/chevron-right.svg';
import {
  PaginatorBtn,
  PeriodPaginatorContainer,
  PaginatorBtnWrapper,
  DayTitle,
} from './PeriodPaginator.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentDay,
  setCurrentMonth,
  setCurrentYear,
} from 'redux/tasks/tasksSlice';
import { selectFullDate } from 'redux/selectors';
export const PeriodPaginator = ({
  currentDateMonth,
  currentDateYear,
  periodType,
  changePeriod,
  checkDate,
}) => {
  const reduxDate = useSelector(selectFullDate);
  const currentDate = new Date(reduxDate);
  const dispatch = useDispatch();
  const [filterMonth, setFilterMonth] = useState(currentDate.getMonth());
  const [filterYear, setFilterYear] = useState(currentDate.getFullYear());
  const currentMonth = currentDateMonth;
  const currentYear = currentDateYear;
  const handlePrevMonth = () => {
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    setFilterMonth(prevMonthDate.getMonth());
    setFilterYear(prevMonthDate.getFullYear());
    dispatch(setCurrentMonth(prevMonthDate.getMonth()));
    dispatch(setCurrentYear(prevMonthDate.getFullYear()));
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setFilterMonth(nextMonthDate.getMonth());
    setFilterYear(nextMonthDate.getFullYear());
    dispatch(setCurrentMonth(nextMonthDate.getMonth()));
    dispatch(setCurrentYear(nextMonthDate.getFullYear()));
  };

  const handlePrevDay = () => {
    const prevDayDate = new Date(currentDate);
    prevDayDate.setDate(prevDayDate.getDate() - 1);
    setFilterMonth(prevDayDate.getMonth());
    dispatch(setCurrentDay(prevDayDate.getDate()));
    dispatch(setCurrentMonth(prevDayDate.getMonth()));
    dispatch(setCurrentYear(prevDayDate.getFullYear()));
  };

  const handleNextDay = () => {
    const nextDayDate = new Date(currentDate);
    nextDayDate.setDate(nextDayDate.getDate() + 1);
    setFilterMonth(nextDayDate.getMonth());
    dispatch(setCurrentDay(nextDayDate.getDate()));
    dispatch(setCurrentMonth(nextDayDate.getMonth()));
    dispatch(setCurrentYear(nextDayDate.getFullYear()));
  };

  return (
    <PeriodPaginatorContainer>
      {periodType === 'month' ? (
        <DatePickerCustom
          filterMonth={filterMonth}
          setFilterMonth={setFilterMonth}
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          changePeriod={changePeriod}
        />
      ) : (
        <DayTitle>
          {currentDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </DayTitle>
      )}
      <PaginatorBtnWrapper>
        {periodType === 'month' ? (
          <PaginatorBtn
            direction={'left'}
            type="button"
            onClick={handlePrevMonth}
            disabled={
              filterMonth === currentMonth && filterYear === currentYear
            }
            disabledStyle={
              filterMonth === currentMonth && filterYear === currentYear
                ? true
                : false
            }
          >
            <ArrowLeft />
          </PaginatorBtn>
        ) : (
          <PaginatorBtn
            direction={'left'}
            type="button"
            onClick={handlePrevDay}
            disabled={checkDate(currentDate)}
            disabledStyle={checkDate(currentDate)}
          >
            <ArrowLeft />
          </PaginatorBtn>
        )}
        {periodType === 'month' ? (
          <PaginatorBtn
            direction={'right'}
            type="button"
            onClick={handleNextMonth}
          >
            <ArrowRight />
          </PaginatorBtn>
        ) : (
          <PaginatorBtn
            direction={'right'}
            type="button"
            onClick={handleNextDay}
          >
            <ArrowRight />
          </PaginatorBtn>
        )}
      </PaginatorBtnWrapper>
    </PeriodPaginatorContainer>
  );
};
