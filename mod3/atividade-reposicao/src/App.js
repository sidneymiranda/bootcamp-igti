export default function App() {
  const rush = [
    { id: 1, name: 'Greddy Lee', instrument: 'Bass', skill: 9 },
    { id: 2, name: 'Alex Lifeson', instrument: 'Guitar', skill: 8 },
    { id: 3, name: 'Neil Peart', instrument: 'Drums', skill: 10 },
  ];

  return (
    <>
      <span>
        {rush
          .sort((a, b) => a.name.length - b.name.length)
          .map((member) => member.instrument)
          .join(' @ ')}
      </span>
    </>
  );
}
