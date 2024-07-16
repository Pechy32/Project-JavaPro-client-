import InputSelect from '../components/InputSelect';
import InputField from '../components/InputField';

const InvoiceFilter = (props) => {

    const handleChange = (e) => {
        props.handleChange(e);
    };

    const handleSubmit = (e) => {
        props.handleSubmit(e);
    };

    const handleReset = (e) => {
        props.handleReset(e);
    };


    const filter = props.filter;

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "10px" }}>

            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <InputSelect
                        name="sellerId"
                        items={props.personList}
                        handleChange={handleChange}
                        label="Dodavatel"
                        prompt="nevybrán"
                        value={filter.sellerId ? filter.sellerId : ""}
                    />
                </div>
                <div className="col-sm-6 col-md-4">
                    <InputSelect
                        name="buyerId"
                        items={props.personList}
                        handleChange={handleChange}
                        label="Odběratel"
                        prompt="nevybrán"
                        value={filter.buyerId ? filter.buyerId : ""}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6 col-md-4">
                    <InputSelect
                        name="productId"
                        items={props.productList}
                        handleChange={handleChange}
                        label="Produkt"
                        prompt="nevybrán"
                        value={filter.productId ? filter.productId : ''}
                    />
                </div>
                <div className="col-sm-6 col-md-4">
                    <InputField
                        type="number"
                        min="0"
                        name="minPrice"
                        handleChange={handleChange}
                        label="Minimální cena"
                        prompt="neuvedena"
                        value={filter.minPrice ? filter.minPrice : ""}
                    />
                </div>
                <div className="col-sm-6 col-md-4">
                    <InputField
                        type="number"
                        min="0"
                        name="maxPrice"
                        handleChange={handleChange}
                        label="Maximální cena"
                        prompt="neuvedena"
                        value={filter.maxPrice ? filter.maxPrice : ""}
                    />
                </div>
            </div>

            <div className='row'>
                <div className='col-sm-6 col-md-4'>
                    <InputField
                        type="date"
                        name="dateFrom"
                        handleChange={handleChange}
                        label="Datum od"
                        prompt="neuveden"
                        value={filter.dateFrom ? filter.dateFrom : ''}
                    />
                </div>
                <div className='col-sm-6 col-md-4'>
                    <InputField
                        type="date"
                        name="dateTo"
                        handleChange={handleChange}
                        label="Datum do"
                        prompt="neuveden"
                        value={filter.dateTo ? filter.dateTo : ''}
                    />
                </div>
                <div className="col-sm-6 col-md-4">
                    <InputField
                        type="number"
                        min="1"
                        name="limit"
                        handleChange={handleChange}
                        label="Limit faktur"
                        prompt="neuveden"
                        value={filter.limit ? filter.limit : ''}
                    />
                </div>
            </div>

            <div className="row">
                <div className='col'>
                    <div className="btn-group float-right">
                        <input
                            type="submit"
                            className="btn btn-secondary mt-2"
                            value={props.confirm}
                        />
                        <button type='button' className='btn btn-warning mt-2' onClick={handleReset}>Resetovat filtry ({props.filtersCount})</button>
                    </div>
                </div>
            </div>

        </form>
    );
};

export default InvoiceFilter;