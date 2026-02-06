
const Loader = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-50'>
    <div className='loading flex justify-center items-center w-[100px] h-[100px] gap-[6px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
           className='w-[4px] h-[50px] bg-[#4c86f9]'
           key={index}></span>
        ))}
    </div>
    </div>
  )
}

export default Loader