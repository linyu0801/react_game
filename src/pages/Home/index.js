import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    console.log(12321);
  }, []);
  const a = 1;

  return (
    <div className='bg-slate-300 text-center min-h-screen flex items-center justify-center w-full'>
      <div className='space-y-4'>
        <h1>HomePage12</h1>
      </div>
    </div>
  );
}

export default Home;
