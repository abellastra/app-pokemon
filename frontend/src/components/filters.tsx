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
  const { t } = useTranslation();



  return (
    <div className='md:flex  m-6 gap-8'>
      <label className=' mb-4 md:mb-[0px] w-[20vh] h-[48px] bg-[#4181D5] flex justify-between pt-2 pr-4 pb-2 pl-4 sm:p-2 rounded-xl  text-white text-base'>
        {t("Tipo")}

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

      <label className='w-[20vh]  h-[48px] bg-[#4181D5] flex justify-between pt-2 pr-4 pb-2 pl-4 sm:p-2 rounded-xl text-white text-base'>
        {t("Generacion")}

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
