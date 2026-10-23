import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp.js';
const products = [
 {id:'food-1',name:'Fresh Fruit Basket',category:'Grocery',price:450,image:'/food1.jpg',description:'Seasonal fruit selection for the family.',source:'Fresh Basket'},
 {id:'food-2',name:'Afghan Family Meal',category:'Restaurant',price:850,image:'/food2.jpg',description:'A hearty local meal prepared fresh.',source:'Kabul Kitchen'},
 {id:'food-3',name:'Daily Essentials Pack',category:'Grocery',price:600,image:'/food3.jpg',description:'Everyday pantry essentials in one pack.',source:'Daily Market'},
 {id:'food-4',name:'Breakfast Selection',category:'Dairy & Breakfast',price:380,image:'/food4.jpg',description:'A simple selection for a nourishing breakfast.',source:'Morning Table'},
];
export default function Market({ isClosed, setIsClosed }) {
 const [search,setSearch]=useState(''); const [category,setCategory]=useState('All'); const {addToCart,cart}=useApp();
 const filtered=useMemo(()=>products.filter((p)=>`${p.name} ${p.category} ${p.source} ${p.description}`.toLowerCase().includes(search.toLowerCase())&&(category==='All'||p.category===category)),[search,category]);
 return <main className={`catalog-page ${isClosed?'sidebar-closed':''}`}>

 
 <section className="catalog-hero market-hero"><div>
    <span className="catalog-hero-tag"><i className="fa-solid fa-location-dot"/> LOCAL PICKS · AFGHANISTAN</span>
 <h2>Good things, close to home.</h2><p>Explore fresh food, groceries and breakfast favorites from local businesses.</p>
 </div><div className="catalog-hero-art"><i className="fa-solid fa-basket-shopping"/><span>LOCAL<br/>& FRESH</span></div>
 


 </section><div className="catalog-toolbar"><label className="catalog-search"><i className="fa-solid fa-magnifying-glass"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search food, groceries or stores..."/></label><div className="catalog-categories">{['All','Grocery','Restaurant','Dairy & Breakfast'].map((item)=><button className={category===item?'active':''} key={item} onClick={()=>setCategory(item)}>{item}</button>)}</div></div><div className="catalog-section-title"><div><span>CURATED FOR YOU</span><h2>Shop local favorites</h2></div><small>{filtered.length} products</small></div><section className="catalog-grid">{filtered.map((product)=><article className="catalog-product-card" key={product.id}><div className="catalog-product-image"><img src={product.image} alt={product.name}/><span>{product.category}</span></div><div className="catalog-product-body"><small className="catalog-store"><i className="fa-solid fa-store"/> {product.source}</small><h3>{product.name}</h3><p>{product.description}</p><div className="catalog-product-bottom"><strong>{product.price.toLocaleString()} <small>AFN</small></strong><button onClick={()=>addToCart({...product,source:'Marketplace'})}><i className="fa-solid fa-plus"/> Buy Now</button></div></div></article>)}</section>{!filtered.length&&<div className="catalog-no-results"><i className="fa-solid fa-basket-shopping"/><h3>No items match your search</h3><button onClick={()=>{setSearch('');setCategory('All')}}>Clear filters</button></div>}<p className="catalog-demo-note"><i className="fa-solid fa-circle-info"/> Marketplace orders are demo orders; checkout does not process real payments.</p></main>;
}
