import { SetFormInput } from '@ontour/archive';
import React, { useState } from 'react';

interface Props {
  set: SetFormInput;
  onUpdate: (setName: string) => void;
}

export const SetNameInput = ({ set, onUpdate }: Props) => {
  const [value, setValue] = useState(set.name);
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="mb-4">
        <input
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1"
          onBlur={() => {
            onUpdate(value);
            setEditing(false);
          }}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          autoFocus
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="mb-4 px-4 py-2 hover:bg-slate-100 rounded-2xl -translate-x-4"
    >
      {set.name}
    </button>
  );
};
