function Filters() {
  return (
    <div className=' flex flex-wrap gap-4 justify-center items-center mb-4'>
      <label className='block text-center bg-sky-200 m-1 p-2  rounded-xl'>
        Type:
        <select name='selectedType'>
          <option value='Normal'>Normal</option>
          <option value='Pighting'>Pighting</option>
          <option value='Poison'>Poison</option>
        </select>
      </label>
      <label className='block text-center  bg-sky-200 p-2   rounded-xl'>
        Generation:
        <select name='selectedGeneracion'>
          <option value='I'>I</option>
          <option value='II'>II</option>
          <option value='III'>III</option>
          <option value='VI'>IV</option>
          <option value='V'>V</option>
          <option value='V'>VI</option>
        </select>
      </label>
    </div>
  );
}
export default Filters;
