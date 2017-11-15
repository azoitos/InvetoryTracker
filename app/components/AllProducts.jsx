import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Grid, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

import { getAllProducts, decrementProduct, incrementProduct } from '../reducers/products.jsx';

import AddProduct from './AddProduct.jsx'
import DropdownButton from './common/DropdownButton'


class AllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            filter: 'productId',
        }
        this.updateSearch = this.updateSearch.bind(this);
        this.onDropdownChange = this.onDropdownChange.bind(this)
    }

    //Update products page to filter by what is being typed
    updateSearch(event) {
        this.setState({
            search: event.target.value,
        })
    }

    componentDidMount() {
        this.props.getAllProducts();
    }

    //Change dropdown
    onDropdownChange(event) {
        this.setState({
            filter: event.target.value
        })
    }
    render() {
        const products = this.props.products
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={3}><h4>Search Products</h4>
                            <input
                                type="text"
                                value={this.state.search}
                                onChange={this.updateSearch} />
                            <DropdownButton onDropdownChange={this.onDropdownChange} /></Col>
                        <Col md={6}><h3>Add New Product</h3><AddProduct /></Col>
                    </Row>
                </Grid>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th>View Item</th>
                            <th>ProductId</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Add to Quantity</th>
                            <th>Remove Item</th>
                            <th>Add to Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!this.state.search.length ? products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td>
                                        <NavLink to={`/products/${product.id}`}><Button>View Product</Button></NavLink>
                                    </td>
                                    <td>{product.productId}</td>
                                    <td>{product.category}</td>
                                    <td>{product.description}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td><Button onClick = {() => {
                                        this.props.incrementProduct(product.productId)}}>+</Button></td>
                                    <td><Button onClick = {() => {
                                        this.props.decrementProduct(product.productId)}}>-</Button></td>
                                    <td><Button>$+</Button></td>
                                </tr>
                            )
                        }) : products.map(product => {
                            if (product[this.state.filter].toString().toLowerCase().includes(this.state.search.toLowerCase())) {
                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <NavLink to={`/products/${product.id}`}><Button>View Product</Button></NavLink>
                                        </td>
                                        <td>{product.productId}</td>
                                        <td>{product.category}</td>
                                        <td>{product.description}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.price}</td>
                                        <td><Button onClick = {() => {
                                        this.props.incrementProduct(product.productId)}}>+</Button></td>
                                        <td><Button onClick = {() => {
                                        this.props.decrementProduct(product.productId)}}>-</Button></td>
                                        <td><Button>$+</Button></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </Table>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { products: state.products }
}


export default connect(mapStateToProps, { getAllProducts, decrementProduct, incrementProduct})(AllProducts);
