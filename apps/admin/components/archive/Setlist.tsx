import { Set } from '@ontour/archive';
import { SetForm } from 'components';

interface Props {
  setlist: Set[];
  setSetlist: (setlist: Set[]) => void;
}

export const Setlist = ({ setlist, setSetlist }: Props) => {
  const updateSetlist = (targetSet: Set) => {
    const updatedSetlist = [...setlist, targetSet];
    setSetlist(updatedSetlist);
  };

  return (
    <div>
      <h2>Setlist</h2>
      <div>
        {setlist.map((set) => (
          <SetForm set={set} updateSet={updateSetlist} />
        ))}
      </div>
      <button className="bg-slate-200" onClick={() => {}}>
        Add another set
      </button>
    </div>
  );
};
