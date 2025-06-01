
import '../CountryStatusList/CountryStatusList.css'

type Country = {
  name: string;
  code: string;
  count: number;
};

type Props = {
  countries: Country[];
  selected: string;
  onSelect: (code: string) => void;
};

export default function CountryStatusList({ countries, selected, onSelect }: Props) {
  return (
    <div className="country-status-list">
      {countries.map((country) => (
        <div
          key={country.code}
          className={`country-box ${selected === country.code ? "active mobile-expand" : ""}`}
          onClick={() => onSelect(country.code)}
        >
          <span>{country.name}</span>
          {country.count > 0 && <span className="badge">{country.count}</span>}
        </div>
      ))}
    </div>
  );
}
