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
    { value: 1, label: '🌀 Normal' },
    { value: 2, label: '🥊 Fighting' },
    { value: 3, label: '🦅 Flying' },
    { value: 4, label: '💀 Poison' },
    { value: 5, label: '🌍 Ground' },
    { value: 6, label: '🪨 Rock' },
    { value: 7, label: '🐛 Bug' },
    { value: 8, label: '👻 Ghost' },
    { value: 9, label: '🛠️ Steel' },
    { value: 10, label: '🔥 Fire' },
    { value: 11, label: '💧 Water' },
    { value: 12, label: '🌿 Grass' },
    { value: 13, label: '⚡ Electric' },
    { value: 14, label: '🔮 Psychic' },
    { value: 15, label: '❄️ Ice' },
    { value: 16, label: '🐉 Dragon' },
    { value: 17, label: '🌑 Dark' },
    { value: 18, label: '🧚‍♀️ Fairy' },
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
    <div className=' flex flex-wrap gap-4 justify-center items-center mb-4'>
      <label className='block text-center bg-sky-200 m-1 p-2  rounded-xl'>
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
      <label className='block text-center  bg-sky-200 p-2   rounded-xl'>
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
