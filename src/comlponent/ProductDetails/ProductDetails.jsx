import React, { use, useEffect, useRef, useState } from 'react';
import { Link, useLoaderData } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const product = useLoaderData()
    const { _id: productId } = useLoaderData();
    const [bids, setBids] = useState([]);



    const bidModelRef = useRef(null);

    const { user } = use(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3000/productS/bids/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log('bids for the product', data)
                setBids(data)
            })
    }, [productId])

    console.log(product)

    const handleBidModalOpen = () => {
        bidModelRef.current.showModal()
    }

    const handleBidSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(productId, name, email, bid)
        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photoURL,

            bid_price: bid,
            status: 'pending'

        }
        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    bidModelRef.current.close();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your bid  has been placed",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    // add the new bid to the state
                    newBid._id =data.insertedId;
                    const newBids =[...bids,newBid];
                    newBids.sort((a,b) =>b.bid_price -a.bid_price)
                    setBids(newBids)
                }
            })
    }


    const { title,
        image,
        price_min,
        price_max,
        category,
        condition,
        usage,
        description,
        seller_name,
        seller_image,
        seller_contact,
        email,
        location,
        created_at,
        status, } = product
    return (
        <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image  & Description*/}
            <div>
                <img src={image} alt={title} className="rounded-2xl shadow-md" />
                <div className="border-t pt-3">
                    <h2 className="font-semibold text-lg mb-2">Product Description</h2>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Condition:</span> {condition}
                    </p>
                    <p className="text-gray-600 mb-2">
                        <span className="font-semibold">Usage:</span> {usage}
                    </p>
                    <p className="text-gray-700">{description}</p>
                </div>
            </div>

            {/* Details */}
            <div>
                <Link to="/" className="text-sm text-blue-500 underline mb-2 inline-block">
                    ← Back To Products
                </Link>
                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                <p className="text-lg text-green-600 font-semibold mb-3">
                    ${price_min} - {price_max}
                </p>
                <p className="text-gray-500 mb-4">Category: {category}</p>



                <div className="border-t pt-3 mt-4">
                    <h2 className="font-semibold text-lg mb-2">Seller Information</h2>
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={seller_image}
                            alt=""
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="font-semibold">{seller_name}</p>
                            <p className="text-sm text-gray-500">{email}</p>
                        </div>
                    </div>
                    <p className="text-gray-600"> Location: {location}</p>
                    <p className="text-gray-600"> Contact: {seller_contact}</p>
                    <p className="text-sm mt-2">Status: <span className="text-yellow-600 font-semibold">{status}</span></p>
                    <p className="text-sm text-gray-500 mt-1">
                        Posted: {new Date(created_at).toLocaleDateString()}
                    </p>
                </div>

                <button
                    onClick={handleBidModalOpen}
                    className="btn btn-primary w-full mt-5">
                    I Want Buy This Product
                </button>
                <dialog ref={bidModelRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-center">Give the best offer!</h3>
                        <p className="py-4 text-center">offer something seller can not resist</p>

                        <form onSubmit={handleBidSubmit}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    name='name'
                                    readOnly
                                    defaultValue={user?.displayName} />
                                {/* email */}
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    className="input"
                                    name='email'
                                    readOnly
                                    defaultValue={user?.email} />
                                {/* bid amount */}
                                <label className="label">Bid</label>
                                <input
                                    type="text"
                                    className="input"
                                    name='bid'
                                    placeholder='Your Bid'

                                />

                                <button className="btn btn-neutral mt-4">Please your Bid</button>
                            </fieldset>
                        </form>



                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div>
                <h3 className="text 5xl font-bold"> Bids For This Products: <span className='text-primary'>{bids.length}</span></h3>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                  SL NO.
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                          {
                            bids.map((bid,index) =>  <tr>
                                <th>
                                  {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {bid.buyer_email}
                                </td>
                                <td>{bid.bid_price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>)
                          }
                     
                        </tbody>
                    
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;