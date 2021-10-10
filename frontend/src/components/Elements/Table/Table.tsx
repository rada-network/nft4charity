import { ArchiveIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import * as React from 'react';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  isShowHeader?: boolean;
};

export const Table = <Entry extends { id: string }>({
  data,
  columns,
  isShowHeader = true,
}: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <div className="bg-white text-gray-500 h-80 flex justify-center items-center flex-col">
        <ArchiveIcon className="h-16 w-16" />
        <h4>No Entries Found</h4>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              {isShowHeader && (
                <thead className="bg-gray-50">
                  <tr>
                    {columns.map((column, index) => (
                      <th
                        key={column.title + index}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="font-Open text-sm divide-y divide-gray-200">
                {data.map((entry, entryIndex) => (
                  <tr
                    key={entry?.id || entryIndex}
                    className={clsx(entryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100', '')}
                  >
                    <td className="text-sm font-bold w-14 text-center"> {entryIndex}. </td>
                    {columns.map(({ Cell, field, title }, columnIndex) => (
                      <td
                        key={title + columnIndex}
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {Cell ? <Cell entry={entry} /> : entry[field]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
