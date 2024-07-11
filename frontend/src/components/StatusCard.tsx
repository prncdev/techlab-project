import { FC, useState, useEffect } from "react";

type Props = {
  title: string;
  count: string | number;
}

const StatusCard: FC<Props> = function ({ title, count }) {

  return (
    <aside className="w-60 py-2 px-4 bg-white rounded-md border-l-[6px] border-solid border-cyan-500 shadow-lg">
      <p className="text-gray-500">{title}</p>
      <h1 className="text-4xl text-black pt-1 font-semibold">{count}</h1>
    </aside>
  );
}

export default StatusCard;