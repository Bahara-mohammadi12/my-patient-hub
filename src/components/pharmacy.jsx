import { useState } from "react";
function Pharmacy({ isClosed, setIsClosed }) {

    const [search, setSearch] = useState("");
    const [tableSearch, setTableSearch] = useState("");

    const products = [
        {
            name: "Carry Medical",
            category: "Esomephrazole",
            price: "10 AFG",
            image: "/ph1.jpg",
            description: "As Uber works through a huge amound of internal management turmoil."
        },
        {
            name: "Pool Medical",
            category: "Esomephrazole",
            price: "12 AFG",
            image: "/ph2.jpg",
            description: "Music is something that every person has his or that every person has his or"
        },
        {
            name: "OK Pharmacy",
            category: "Esomephrazole",
            price: "15 AFG",
            image: "/ph3.jpg",
            description: "Different people have different taste, and various types of music."
        },
        {
            name: "Hamza Pharma",
            category: "Esomephrazole",
            price: "20 AFG",
            image: "/ph4.jpg",
            description: "Different people have different taste, and various types of music."
        }
    ];

    const filteredProducts = products.filter((products) =>
    products.name.toLowerCase().includes(search.toLowerCase()));

    const  filteredTableProducts = products.filter((product) => 
    product.name.toLowerCase().includes(tableSearch.toLowerCase()) || 
    product.category.toLowerCase().includes(tableSearch.toLowerCase()));

    return (
        <section className={`pharmacy-page ${isClosed ? "sidebar-closed" : ""}`}>
            {/* header */}
            <div className="pharmacy-header">
               <div className="pharmacy-tittle">
                  <div className="bread">
                    <a href="/"><i className="fa-solid fa-house"></i></a>
                    <span>/</span>
                    <span>Pharmacyplace</span>
                  </div>
                  <h3>Pharmacyplace</h3>
               </div>
               {/* menu button */}
               <button id="menuBtn"
               className="menu-btn"
               onClick={() => setIsClosed(!isClosed)}>
                <i className="fa-solid fa-bars"></i>
               </button>

               {/* header right */}
               <div className="pharmacy-header-right">
                  <div className="pharmacy-search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                    type="text"
                    placeholder="type here..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                  </div>
                  <span className="logout">
                    <i className="fa-solid fa-circle-user"></i>Logout
                  </span>
                  <button className="pharmacy-icon">
                    <i className="fa-solid fa-bell"></i>
                  </button>
               </div>

            </div>

            {/* main market */}
            <div className="pharmacy-container">
                <h2>Search Phaemacies for Medicine</h2>
                {/* product cards */}
                <div className="pharmacy-product">
                    {filteredTableProducts.map((product, index) => (
                        <div className="pharmacy-card" key={index}>
                            <img src={product.image} alt={product.name} />
                            <div className="pharmacy-card-info">
                                <div className="pharmacy-category">
                                    <span>{product.category}</span>
                                    <strong>{product.price}</strong>
                                </div>
                                <h3><i className="fa-solid fa-circle"></i>{product.name}</h3>
                                <p>{product.description}</p>
                                <button className="buy-btn">BUY NOW</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* other result */}
            <div className="other-result">
                <h2>6 Medicine returned for the Esso</h2>
                <div className="table-top">
                    <select>
                        <option>5</option>
                        <option>7</option>
                        <option>10</option>
                        <option>12</option>
                        <option>20</option>
                    </select>
                    <span>entries per page</span>
                    <input type="text"
                    placeholder="search..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)} />
                </div>

                {/* table */}
                <div className="pharmacy-table">
                    <div className="table-header">
                        <span>NAME</span>
                        <span>CATEGORY</span>
                        <span>SERVIECE BY</span>
                        <span>DISCOUNT</span>
                        <span>PRICE</span>
                        <span>ID</span>
                    </div>
                    {filteredTableProducts.map((product,index) => (
                        <div className="table-row" key={index}>
                            <div className="table-name">
                                <img src={product.image} alt={product.name} />
                                <strong>{product.category}</strong>
                            </div>
                            <span>Food</span>
                            <span>{product.name}</span>
                            <span>0%</span>
                            <span>{product.price}</span>
                            <span>{243598234 + index}</span>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default Pharmacy;