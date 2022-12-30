import { intervalToDuration, differenceInSeconds, isValid, differenceInDays } from 'date-fns';

export const formatStringReplace = (value?: string) => {
  if (!value) return;
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};

export const getDuration = (date: Date, startDate = new Date()) => {
  const diff = differenceInSeconds(date, startDate);
  const daysDuration = differenceInDays(date, startDate);

  if (!isValid(date) || diff <= 0)
    return {
      daysDuration: 0,
      objDuration: {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    };

  const objDuration = intervalToDuration({
    start: startDate,
    end: date,
  });

  return {
    daysDuration,
    objDuration,
  };
};

export const getNumZeroPadding = (num: number | string | undefined) => String(num).padStart(2, '0');
