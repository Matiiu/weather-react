import { useState, ChangeEvent, FormEvent } from "react";
import { countries } from "../../data/countries";
import type { SearchType } from "../../types";

import style from "./Form.module.css";

import Alert from "../Alert/Alert";

type FormProps = {
    fetchWeather: (search: SearchType) => Promise<void>
}
export default function Form({ fetchWeather }: FormProps) {
  const initialSearch: SearchType = {
    city: "",
    country: "",
  };

  const [search, setSearch] = useState<SearchType>({ ...initialSearch });
  const [msgAlert, setMsgAlert] = useState("");

  type handleChange = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

  const handleChange = (e: handleChange) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validar si alguno de los valores está vacío
    const fieldEmpty = Object.values(search).some(
      (value) => !(value.trim() || "")
    );
    if (fieldEmpty) {
      setMsgAlert("Todos los campos son obligatorios");
      return;
    }
    setMsgAlert("");
    fetchWeather(search);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      {!!msgAlert && <Alert>{msgAlert}</Alert>}
      <div className={style.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={style.field}>
        <label htmlFor="country">Pais:</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="" hidden>
            -- Seleccione un Pais --
          </option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={style.submit} type="submit" value="Consultar Clima" />
    </form>
  );
}
