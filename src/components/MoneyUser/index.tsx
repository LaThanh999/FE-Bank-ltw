import clsx from 'clsx';
import { formatNumberCurrent } from 'helper/number';

export const MoneyUser = ({ classCss, money }: { classCss?: string; money?: string }) => {
  return (
    <div className={clsx('flex justify-between ', classCss)}>
      <div className="font-bold italic text-lg">Số dư hiện tại:</div>
      <div className=" text-xl text-sky-900 font-semibold">{formatNumberCurrent(money)} VND</div>
    </div>
  );
};
