import { FiltersGeneration, FiltersType } from '../data/filters';
type filtersProps = {
  type: string;
  generation: string;
  setSelectedGeneration: (value: string | number) => void;
  setSelectedType: (value: string | number) => void;
};
import { useTranslation } from "react-i18next"
function Filters({
  type,
  generation,
  setSelectedGeneration,
  setSelectedType,
}: filtersProps) {
<<<<<<< HEAD
  const {t} = useTranslation();
  const FiltersType = [

    { value: 'normal', label: '🌀 Normal' },
    { value: 'fighting', label: '🥊 Fighting' },
    { value: 'flying', label: '🦅 Flying' },
    { value: 'poison', label: '💀 Poison' },
    { value: 'ground', label: '🌍 Ground' },
    { value: 'rock', label: '🪨 Rock' },
    { value: 'bug', label: '🐛 Bug' },
    { value: 'ghost', label: '👻 Ghost' },
    { value: 'steel', label: '🛠️ Steel' },
    { value: 'fire', label: '🔥 Fire' },
    { value: 'water', label: '💧 Water' },
    { value: 'grass', label: '🌿 Grass' },
    { value: 'electric', label: '⚡ Electric' },
    { value: 'psychic', label: '🔮 Psychic' },
    { value: 'ice', label: '❄️ Ice' },
    { value: 'dragon', label: '🐉 Dragon' },
    { value: 'dark', label: '🌑 Dark' },
    { value: 'fairy', label: '🧚‍♀️ Fairy' },
  ];

  const FiltersGeneration = [
    { value: 1, label: 'I' },
    { value: 2, label: 'II' },
    { value: 3, label: 'III' },
    { value: 4, label: 'IV' },
    { value: 5, label: 'V' },
    { value: 6, label: 'VI' },
  ];

  return (
    <div className='flex m-6 gap-8'>
      <label className='w-[229px] h-[48px] bg-[#4181D5] flex justify-between pt-2 pr-4 pb-2 pl-4 sm:p-2 rounded-xl  text-white text-base'>
          {t("Tipo")}
=======
 

  return (
    <div className='md:flex  m-6 gap-8'>
      <label className=' mb-4 md:mb-[0px] w-[20vh] h-[48px] bg-[#4181D5] flex justify-between pt-2 pr-4 pb-2 pl-4 sm:p-2 rounded-xl  text-white text-base'>
        Type
>>>>>>> be4813aaa9ae905f711988fe5c5864c1abe80cc5
        <select
          value={type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedType(e.target.value);
          }}
          name='selectedType'
          className='outline-none'
        >
          <option></option>
          {FiltersType.map(option => (
            <option
              className='bg-[#0D185B]'
              value={option.value}
              key={option.value}
            >
              {option.label}
              {option.value}
            </option>
          ))}
        </select>
      </label>
<<<<<<< HEAD
      <label className='w-[229px] h-[48px] bg-[#4181D5] flex justify-between pt-2 pr-4 pb-2 pl-4 sm:p-2 rounded-xl text-white text-base'
      >
        {t("Generacion")}
=======
      <label className='w-[20vh]  h-[48px] bg-[#4181D5] flex justify-between pt-2 pr-4 pb-2 pl-4 sm:p-2 rounded-xl text-white text-base'>
        Generation
>>>>>>> be4813aaa9ae905f711988fe5c5864c1abe80cc5
        <select
          value={generation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedGeneration(Number(e.target.value));
          }}
          name='selectedGeneracion'
          className='outline-none'
        >
          <option></option>
          {FiltersGeneration.map(option => (
            <option
              value={option.value}
              key={option.value}
              className='bg-[#0D185B]'
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export default Filters;
