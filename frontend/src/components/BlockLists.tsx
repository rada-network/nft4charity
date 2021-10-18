export type ListItem = {
  title: string;
  content: string;
  rate: string;
};

export type BlockListProps = {
  listBlock: ListItem[];
};

export const BlockLists = ({ listBlock }: BlockListProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {listBlock.map((item: ListItem, index: number) => {
        return (
          <div
            className="shadow-main w-auto text-center rounded-md mr-5 mt-5 p-5"
            key={`${item?.title}+${index}`}
          >
            <p className="font-Merriweather font-bold text-sm">{item.title}</p>
            <p className="font-Open font-bold text-xl my-5">{item.content}</p>
            <p className="font-Open italic text-sm">{item.rate}</p>
          </div>
        );
      })}
    </div>
  );
};
