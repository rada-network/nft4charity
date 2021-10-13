import React from 'react';

import arrowBackSVG from '@/assets/icons/arrow_back.svg';
import arrowNextSVG from '@/assets/icons/arrow_next.svg';
import { ROWS_PER_PAGE } from '@/utils/const';

export type TablePaginationProps = {
  current?: number;
  total: number;
  onChange: (value: number) => void;
};

export type ArrayProps = {
  number?: number;
  type?: string;
};

export const TablePagination = ({ current = 1, total, onChange }: TablePaginationProps) => {
  const array = Array.from(Array(total).keys());

  let newCurrent = current;

  if (current < 1) newCurrent = 1;
  if (current > total) newCurrent = total;

  if (total < ROWS_PER_PAGE) {
    return (
      <div className="flex justify-center">
        <button onClick={() => onChange(current - 1)}>
          <img src={arrowBackSVG} alt="" />
        </button>
        {array.map((_e, i) => (
          <button
            key={i + 1}
            onClick={() => onChange(i + 1)}
            className={`${current === i + 1 ? 'current' : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => onChange(newCurrent + 1)}>
          <img src={arrowNextSVG} alt="" />
        </button>
      </div>
    );
  }

  const pages: Array<ArrayProps> = [];
  array.map((item, index) => {
    if (index === 2 && newCurrent === 1) {
      pages.push({
        number: 3,
      });
    }

    if (index === total - 3 && newCurrent === total) {
      pages.push({ number: total - 2 });
    }

    if (
      (index === 0 && newCurrent > 2) ||
      (index === 1 && newCurrent > 3) ||
      (index === 2 && newCurrent > 4) ||
      (index < newCurrent + 1 && index + 3 > newCurrent) ||
      (index === total - 3 && newCurrent < total - 3) ||
      (index === total - 2 && newCurrent < total - 2) ||
      (index === total - 1 && newCurrent < total - 1)
    ) {
      pages.push({
        number: index + 1,
      });
    }

    if ((index === 3 && newCurrent > 5) || (index === total - 4 && newCurrent < total - 4)) {
      pages.push({ type: 'etc' });
    }
  }, []);

  return (
    <div className="flex justify-center w-1/2 m-auto">
      <div className="flex justify-around w-full">
        <button className="text-sm font-bold" onClick={() => onChange(newCurrent - 1)}>
          <img src={arrowBackSVG} alt="" />
        </button>
        {pages &&
          pages.map((page, i) => {
            if (page?.type === 'etc') {
              return <span key={i}>...</span>;
            }
            return (
              <button
                className="font-bold text-sm"
                key={i}
                onClick={() => onChange(page?.number || 0)}
              >
                {page?.number}
              </button>
            );
          })}
        <button className="font-bold text-sm border-none" onClick={() => onChange(newCurrent + 1)}>
          <img src={arrowNextSVG} alt="" />
        </button>
      </div>
    </div>
  );
};
