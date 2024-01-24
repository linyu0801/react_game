import styled from 'styled-components';

function Home() {
  // var a =1
  const Box = styled.div`
    background: red;
    padding: 16px;
  `;
  return (
    <div className='bg-slate-300 text-center min-h-screen flex items-center justify-center w-full'>
      <div className='space-y-4'>
        <h1>HomePage123</h1>
      </div>

      <Box></Box>
    </div>
  );
}

export default Home;
