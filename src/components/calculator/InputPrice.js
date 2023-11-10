const InputPrice = ({ label, value, dispatch, type, placeholder }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          dispatch({
            type,
            payload: event.target.value,
          })
        }
      />
    </div>
  );
};

export default InputPrice;
