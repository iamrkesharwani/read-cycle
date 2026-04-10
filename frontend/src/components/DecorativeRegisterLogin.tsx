const DecorativeRegisterLogin = () => {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-14 flex gap-1 px-1.5 opacity-[0.07] pointer-events-none">
      <div className="flex-1 rounded-sm" style={{ background: '#0d9488' }} />
      <div
        className="flex-1 rounded-sm"
        style={{ background: '#f59e0b', height: '65%', marginTop: '10%' }}
      />
      <div
        className="flex-1 rounded-sm"
        style={{ background: '#0d9488', height: '85%', marginTop: '5%' }}
      />
      <div className="flex-1 rounded-sm" style={{ background: '#f59e0b' }} />
      <div
        className="flex-1 rounded-sm"
        style={{ background: '#0d9488', height: '50%', marginTop: '30%' }}
      />
    </div>
  );
};

export default DecorativeRegisterLogin;
