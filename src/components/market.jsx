import { useState } from "react";
function Market({ isClosed, setIsClosed }) {

    const [search, setSearch] = useState("");
    const [tableSearch, setTableSearch] = useState("");
    const products = [
        {
            name: "Food Panda",
            category: "Healthy Diet",
            price: "5 AFG",
            image: "/food1.jpg",
            description: "As Uber works through a huge amound of internal management turmoil."
        },
        {
            name: "Grab Food",
            category: "Healthy Diet",
            price: "10 AFG",
            image: "/food2.jpg",
            description: "Music is something that every person has his or that every person has his or"
        },
        {
            name: "Deliveroo",
            category: "Healthy Diet",
            price: "15 AFG",
            image: "/food3.jpg",
            description: "Different people have different taste, and various types of music."
        },
        {
            name: "Minimalist",
            category: "Health Diet",
            price: "20 AFG",
            image: "/food4.jpg",
            description: "Different people have different taste, and various types of music."
        }
    ];

    const filteredProducts = products.filter((products) =>
    products.name.toLowerCase().includes(search.toLowerCase()));

    const filteredTableProducts = products.filter((product) => 
    product.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
    product.category.toLowerCase().includes(tableSearch.toLowerCase()));

    return (
        <section className={`market-page ${isClosed ? "sidebar-closed" : ""}`}>
            {/* header */}
            <div className="market-header">
               <div className="market-tittle">
                  <div className="bread">
                    <a href="/"><i className="fa-solid fa-house"></i></a>
                    <span>/</span>
                    <span>Marketplace</span>
                  </div>
                  <h3>Marketplace</h3>
               </div>
               {/* menu button */}
               <button id="menuBtn"
               className="menu-btn"
               onClick={() => setIsClosed(!isClosed)}>
                <i className="fa-solid fa-bars"></i>
               </button>

               {/* header right */}
               <div className="market-header-right">
                  <div className="market-search">
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
                  <button className="market-icon">
                    <i className="fa-solid fa-bell"></i>
                  </button>
               </div>

            </div>

            {/* main market */}
            <div className="market-container">
                <h2>Search Marketplaces and order what you need</h2>
                {/* product cards */}
                <div className="market-product">
                    {filteredProducts.map((product, index) => (
                        <div className="market-card" key={index}>
                            <img src={product.image} alt={product.name} />
                            <div className="market-card-info">
                                <div className="market-category">
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
                <h2>Other result for healty diet search</h2>
                <div className="table-top">
                    <select>
                        <option>5</option>
                        <option>7</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                    <span>entries per page</span>
                    <input type="text" 
                    placeholder="search..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)} />
                </div>

                {/* table */}
                <div className="market-table">
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

export default Market;