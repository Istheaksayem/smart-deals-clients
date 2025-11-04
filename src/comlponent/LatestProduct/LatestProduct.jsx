import React, { use } from 'react';
import Product from '../Product/Product';

const LatestProduct = ({ LatestProductPromise }) => {

    const products = use(LatestProductPromise)
    console.log(products)
    return (
        <div>
            <h2 className='text-[#000A31] font-bold text-2xl text-center mt-4 mb-4'>Recent <span className='text-primary'>Products</span></h2>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default LatestProduct;