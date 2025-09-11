type filtersProps = {
  type: string;
  generation: string;
  setSelectedGeneration: (value: string | number) => void;
  setSelectedType: (value: string | number) => void;
};

function Filters({
  type,
  generation,
  setSelectedGeneration,
  setSelectedType,
}: filtersProps) {
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
    <div className=' flex sm:flex-wrap gap-1 sm:gap-4 justify-center items-center mb-1 m-1 '>
      <label className='block text-center bg-sky-200 m-1 p-1.5 sm:p-2 rounded-xl border border-white'>
        Type:
        <select
          value={type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedType(e.target.value);
          }}
          name='selectedType'
        >
          <option>all</option>
          {FiltersType.map(option => (
            <option
              className='bg-[rgb(128,128,128)]'
              value={option.value}
              key={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <label className='block text-center  bg-sky-200 p-1.5 sm:p-2   rounded-xl border border-white'>
        Generation:
        <select
          value={generation}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedGeneration(Number(e.target.value));
          }}
          name='selectedGeneracion'
        >
          <option>all</option>
          {FiltersGeneration.map(option => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export default Filters;
