import useCountDown from 'hooks/useCountDown';
import { useEffect } from 'react';

export const CountDown = ({ timeOTP, setExpired }: { timeOTP: any; setExpired: any }) => {
  const { minutes, seconds, expired, isLoading } = useCountDown(timeOTP);
  useEffect(() => {
    setExpired(!!expired);
  }, [expired]);
  return !isLoading ? (
    <div className="flex flex-ro text-sm font-normal ml-2 text-green-600">{`${minutes}: ${seconds}`}</div>
  ) : null;
};
