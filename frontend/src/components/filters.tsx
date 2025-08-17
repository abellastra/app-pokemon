type FiltersProps = {
  selectedGeneration: number;
  setSelectedGeneration: (generation: number) => void;

  selectedType: string;
  setSelectedType: (type: string) => void;
};

const filterType = [
  { value: 'Bug', label: '🐛 Bug' },
  { value: 'Dark', label: '🌑 Dark' },
  { value: 'Dragon', label: '🐉 Dragon' },
  { value: 'Electric', label: '⚡ Electric' },
  { value: 'Fairy', label: '🧚‍♀️ Fairy' },
  { value: 'Fighting', label: '🥊 Fighting' },
  { value: 'Fire', label: '🔥 Fire' },
  { value: 'Flying', label: '🦅 Flying' },
  { value: 'Ghost', label: '👻 Ghost' },
  { value: 'Grass', label: '🌿 Grass' },
  { value: 'Ground', label: '🌍 Ground' },
  { value: 'Ice', label: '❄️ Ice' },
  { value: 'Normal', label: '🌀 Normal' },
  { value: 'Poison', label: '💀 Poison' },
  { value: 'Psychic', label: '🔮 Psychic' },
  { value: 'Rock', label: '🪨 Rock' },
  { value: 'Steel', label: '🛠️ Steel' },
  { value: 'Water', label: '💧 Water' },
  { value: 'Shadow', label: 'Shadow' },
];

const filterGeneration = [
  { value: '1', label: 'I' },
  { value: '2', label: 'II' },
  { value: '3', label: 'III' },
  { value: '4', label: 'IV' },
  { value: '5', label: 'V' },
];

function Filters({
  selectedGeneration,
  setSelectedGeneration,
  selectedType,
  setSelectedType,
}: FiltersProps) {
  return (
    <div className=' flex flex-wrap gap-4 justify-center items-center mb-4'>
      <label className='block text-center bg-sky-200 m-1 p-2  rounded-xl'>
        Type:
        <select
          name='selectedType'
          value={selectedType}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedType(e.target.value);
          }}
        >
          <option value=''>All</option>
          {filterType.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <label className='block text-center  bg-sky-200 p-2   rounded-xl'>
        Generation:
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedGeneration(Number(e.target.value));
          }}
          name='selectedGeneracion'
          value={String(selectedGeneration)}
        >
          <option value=''>All</option>
          {filterGeneration.map(generation => (
            <option key={generation.value} value={generation.value}>
              {generation.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
export default Filters;
