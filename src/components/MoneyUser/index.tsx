import clsx from 'clsx';

export const MoneyUser = ({ classCss }: { classCss?: string }) => {
  return (
    <div className={clsx('flex justify-between ', classCss)}>
      <div className="font-bold italic text-lg">Số dư hiện tại:</div>
      <div className=" text-xl text-sky-900 font-semibold">1000000 VND</div>
    </div>
  );
};
