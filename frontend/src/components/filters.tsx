import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Filters() {
  const [selectedGeneration, setSelectedGeneration] = useState(Number);
  const navigate=useNavigate()

  useEffect(() => {
    if(selectedGeneration >=1 &&selectedGeneration <=6  ){
      
    pokemonesForGeneration();
    }
  }, [selectedGeneration]);

  const pokemonesForGeneration = async () => {
    const response = await fetch(
      `http://localhost:3000/pokemones/generation/${selectedGeneration}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.ok) {
      const data = await response.json()
      console.log(data)

    }
  };

  return (
    <div className=' flex flex-wrap gap-4 justify-center items-center mb-4'>
      <label className='block text-center bg-sky-200 m-1 p-2  rounded-xl'>
        Type:
        <select name='selectedType'>
          <option value='Normal'>Normal</option>
          <option onChange={() => {}} value='Pighting'>
            Pighting
          </option>
          <option value='Poison'>Poison</option>
        </select>
      </label>
      <label className='block text-center  bg-sky-200 p-2   rounded-xl'>
        Generation:
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            navigate('/pokemones/generation/' + e.target.value);
            setSelectedGeneration(Number(e.target.value));
          }}
          name='selectedGeneracion'
        >
          <option></option>

          <option value={1}>I</option>
          <option value={2}>II</option>
          <option value={3}>III</option>
          <option value={4}>IV</option>
          <option value={5}>V</option>
          <option value={6}>VI</option>
        </select>
      </label>
    </div>
  );
}
export default Filters;
