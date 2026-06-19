export default function PeopleSelect({ value, onChange, onNext }) {
  const options = [1, 2, 3, 4];
  return (
    <>
      <h1>Berapa orang?</h1>
      <div className="grid">
        {options.map((n) => (
          <button
            key={n}
            className={value === n ? "" : "secondary"}
            onClick={() => onChange(n)}
          >
            {n} orang
          </button>
        ))}
      </div>
      <button onClick={onNext}>Lanjut</button>
    </>
  );
}