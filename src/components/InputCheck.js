import React from 'react';

/**
 * A functional component that renders an input element of type "checkbox" or "radio" within a labeled form group.
 * The component validates the input type and only renders if the type is "checkbox" or "radio".
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.type - The type of the input element, either "checkbox" or "radio".
 * @param {string} props.name - The name attribute for the input element.
 * @param {string} props.value - The value attribute for the input element.
 * @param {boolean} [props.checked=false] - The checked state of the input element.
 * @param {string} props.label - The label text to display next to the input element.
 * @param {function} props.handleChange - The function to call when the input's checked state changes.
 * @returns {JSX.Element|null} - The JSX for the input element wrapped in a form group, or null if the type is invalid.
 */
export function InputCheck({
  type,
  name,
  value,
  checked = false,
  label,
  handleChange,
}) {
  // Supported input types
  const SUPPORTED_INPUTS = ["checkbox", "radio"];

  // Validate the input type
  const inputType = type.toLowerCase();

  if (!SUPPORTED_INPUTS.includes(inputType)) {
    return null;
  }

  return (
    <div className="form-group form-check">
      <label className="form-check-label">
        {/* Render the input element with the specified type */}
        <input
          type={inputType}
          className="form-check-input"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
        />{" "}
        {label}
      </label>
    </div>
  );
}

export default InputCheck;