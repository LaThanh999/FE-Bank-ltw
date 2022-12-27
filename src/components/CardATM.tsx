import { formatStringReplace } from 'helper/common';
import { formatNumberSpace } from 'helper/number';

export const CardATM = ({ numberCard, nameCard }: { numberCard?: string; nameCard?: string }) => {
  return (
    <div className="bg-[#4699EB] h-[220px] rounded-2xl p-8 flex flex-col justify-between text-zinc-200">
      <div className="flex justify-between items-center  text-lg">
        <div className="font-bold">Card</div>
        <div className="font-extrabold text-2xl ita">Visa</div>
      </div>
      <div className="flex items-center justify-between ">
        <div
          className="bg-[url('https://cdn4.iconfinder.com/data/icons/credit-card-15/200/329-512.png')] 
      w-[50px] h-[50px] bg-contain"
        ></div>
        <div className="text-2xl font-semibold italic">{formatNumberSpace(numberCard)}</div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-semibold italic">{formatStringReplace(nameCard)}</div>
      </div>
    </div>
  );
};
