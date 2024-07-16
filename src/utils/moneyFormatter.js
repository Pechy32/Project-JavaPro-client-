function moneyFormatter(value, prefix) {
    const formattedNumber = value ? value.toLocaleString() : 0;
  
    return <div>{formattedNumber}{prefix}</div>;
  }

  export default moneyFormatter;