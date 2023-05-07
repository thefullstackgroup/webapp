import { CountryDropdown } from 'react-country-region-selector';

const CountrySelect = ({ countryName, setCountryName }) => {
  return (
    <CountryDropdown
      value={countryName}
      onChange={(val) => setCountryName(val)}
      className="text-input"
    />
  );
};

export default CountrySelect;
