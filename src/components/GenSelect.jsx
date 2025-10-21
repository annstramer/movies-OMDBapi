import React from 'react'

function GenSelect({ options, label, name, onChange, value }) {
  return (
    <div>
      <label htmlFor={name}></label>
      <select
        id = {name}
        name = {name}
        value = {value}
        onChange = {onChange}>
        <option value = "">{label}&nbsp;</option>
        {options.map((option) => (
          <option key = {option.value} value = {option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default GenSelect
