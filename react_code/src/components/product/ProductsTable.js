//component for holding table header and rows
import React, { Component } from 'react';
import ProductRow from './ProductRow';

class ProductsTable extends Component {
    render() {
        var rows = this.props.products
        .map(function(product, i) {
            return (
                <ProductRow
                    key={i}
                    product={product}
                    changeAppMode={this.props.changeAppMode } />
            );
        }.bind(this));

        return (
            !rows.length
            ? <div className="alert alert-danger">No Products Found.</div>
            : <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
              </table>
        );
    }
}

export default ProductsTable;