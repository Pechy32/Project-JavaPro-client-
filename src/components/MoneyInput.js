import { NumericFormat } from "react-number-format";

const MoneyInput = ({value, required}) => {


    return (
        <NumericFormat type="text" value={value} thousandsGroupStyle="thousand" thousandSeparator=" " required={required} />
    )
}

export default MoneyInput;

