import { ShowWithSetlist } from "@ontour/archive";
import React from "react";

interface Props {
  show: ShowWithSetlist;
}

export const SetlistView = ({ show }: Props) => {
  const notesAggregate = [];

  return (
    <div className="px-0 md:px-2 py-4 flex flex-col">
      <div className="space-y-6 mt-4 text-slate-700 leading-7 text-base">
        {show.setlist.map((set) => (
          <div>
            <span className="font-bold mr-2">{set.name}</span>
            {set.tracks.map((track, tIndex) => {
              const isLastSong = set.tracks.length - 1 < tIndex;
              return (
                <span>
                  {track.song.name}
                  {track.notes.map((note) => {
                    notesAggregate.push(note);
                    return (
                      <sup className="text-xs whitespace-nowrap ml-[0.1rem]">
                        [{notesAggregate.length}]
                      </sup>
                    );
                  })}
                  {track.segue ? " > " : isLastSong ? "" : ", "}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-3 text-slate-700">
        <p className="font-semibold">Notes</p>
        <ol className="ml-2 mt-1">
          {notesAggregate.map((note, nIndex) => (
            <li className="text-sm">
              {nIndex + 1}. {note}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
