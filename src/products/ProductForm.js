import InputField from "../components/InputField"



const ProductForm = function (props) {


    const product = props.product;

    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="productName"
                    label="Nový produkt"
                    prompt="Zadejte název produktu"
                    value={product.name}
                    handleChange={props.handleChange}
                />
                <input type="submit" className="btn btn-success" value="Vytvořit produkt" />
            </form>
        </div>
    )
}
export default ProductForm;