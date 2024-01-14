import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    console.log(12321);
  }, []);
  // var a =1
  const a = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });

  const reduce = (array = []) =>
    array.reduce((acc, current) => acc + current, 0);

  return (
    <div className='bg-slate-300 text-center min-h-screen flex items-center justify-center w-full'>
      <div className='space-y-4'>
        <h1>HomePage123</h1>
      </div>
    </div>
  );
}

export default Home;
