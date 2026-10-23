import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp.js';
const doctors = [
  { id:'ahmad', name:'Dr. Ahmad Rahimi', specialty:'Cardiologist', hospital:'City Medical Center, Kabul, Afghanistan', image:'/doctor1.jpg.jpg', fee:900, languages:'Dari, Pashto, English', next:'Tomorrow · 10:30 AM' },
  { id:'ali', name:'Dr. Ali Mohammadi', specialty:'Dermatologist', hospital:'Kateb Medical Center, Kabul, Afghanistan', image:'/doctor2.jpg.jpg', fee:650, languages:'Dari, Pashto, English', next:'Tomorrow · 1:00 PM' },
  { id:'maryam', name:'Dr. Maryam Safi', specialty:'Family Medicine', hospital:'Shahr-e-Naw Health Clinic, Kabul, Afghanistan', image:'/clinic1.jpg', fee:500, languages:'Dari, Pashto', next:'Thursday · 9:00 AM' },
];
const tomorrow = () => { const d = new Date(); d.setDate(d.getDate()+1); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
export default function Doctor({ isClosed, setIsClosed, searchQuery = '' }) {

const { addAppointment } = useApp();
  const [search,setSearch] = useState(''); const [location,setLocation] = useState('Kabul'); const [specialty,setSpecialty] = useState('all'); const [view,setView] = useState('list'); const [selected,setSelected] = useState(null); const [booking,setBooking] = useState({ date: tomorrow(), time:'10:30', type:'In-person visit', notes:'' }); const [error,setError] = useState('');
const filtered = useMemo(() => {
  const term = (searchQuery.trim() || search).toLowerCase();

  return doctors.filter((d) =>
    `${d.name} ${d.specialty} ${d.hospital} ${d.languages}`
      .toLowerCase()
      .includes(term) &&
    d.hospital.toLowerCase().includes(location.toLowerCase()) &&
    (specialty === 'all' || d.specialty.toLowerCase() === specialty)
  );
}, [searchQuery, search, location, specialty]);
  const book = (e) => { e.preventDefault(); if (!booking.date || booking.date < tomorrow()) { setError('Please choose a future date.'); return; } addAppointment({ doctor:selected.name, specialty:selected.specialty, location:selected.hospital, date:booking.date,
     time:booking.time, type:booking.type, notes:booking.notes }); setSelected(null); setError(''); setBooking({ date:tomorrow(), time:'10:30', type:'In-person visit', notes:'' }); };
  return <section className={`find-doctor ${isClosed ? 'sidebar-closed' : ''}`}>
    <div className="doctor-banner"><div className="doctor-top"><div className="page-title"><Link to="/"><i className="fa-solid fa-house"/></Link><div><small>/ Healthcare / Providers</small><h3>Find a Doctor</h3></div></div><button className="menu-btn" onClick={() => setIsClosed(!isClosed)} aria-label="Toggle sidebar"><i className="fa-solid fa-bars"/></button><div className="header-right"><Link className="doctor-cart-link" to="/appointments"><i className="fa-regular fa-calendar-check"/> My appointments</Link><Link className="doctor-cart-link" to="/cart"><i className="fa-solid fa-bag-shopping"/> Cart</Link></div></div><div className="doctor-hero-copy"><span>CARE THAT FITS YOUR LIFE</span><h1>Find the right doctor for you.</h1><p>Explore healthcare providers in Kabul and book your visit in a few simple steps.</p></div><div className="search-area"><label><i className="fa-solid fa-magnifying-glass"/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Doctor name or specialty"/></label><label><i className="fa-solid fa-location-dot"/><input value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="City or clinic"/></label><button onClick={()=>setView('list')}>Search doctors <i className="fa-solid fa-arrow-right"/></button></div></div>
    <div className="doctor-workspace">
      <aside className="doctor-filter">
      <div className="doctor-filter-title"><h3>Refine results</h3><span>{filtered.length} found</span></div><label className="doctor-filter-label">Specialty<select value={specialty} onChange={(e)=>setSpecialty(e.target.value)}><option value="all">All specialties</option><option value="cardiologist">Cardiology</option><option value="dermatologist">Dermatology</option><option value="family medicine">Family medicine</option></select></label><div className="doctor-location-note"><i className="fa-solid fa-map-location-dot"/><div><b>Afghanistan</b><small>Kabul · Local providers</small></div></div><button className={`doctor-view-toggle ${view==='list'?'active':''}`} onClick={()=>setView('list')}><i className="fa-solid fa-list"/> List view</button><button className={`doctor-view-toggle ${view==='map'?'active':''}`} onClick={()=>setView('map')}><i className="fa-solid fa-map-location-dot"/> Map view</button><div className="doctor-help-card"><i className="fa-solid fa-heart-pulse"/><b>Not sure where to start?</b><p>Choose a specialty or search by a doctor's name.</p><Link to="/chat">Ask support <i className="fa-solid fa-arrow-right"/></Link></div></aside><div className="doctor-result"><div className="doctor-results-heading"><div><span>PROVIDERS NEAR YOU</span><h2>Available specialists</h2></div><span className="doctor-results-count">{filtered.length} providers</span></div>{view==='map' ?
<div className="doctor-map-panel">
  <div><span className="doctor-map-pin"> <i className="fa-solid fa-location-dot"/></span>
  <h3>Healthcare in Kabul</h3><p>Explore the Kabul, Afghanistan area. Map tiles are provided by Google Maps.</p>
  <a href="https://www.google.com/maps/search/clinics+and+doctors+in+Kabul+Afghanistan/"
target="_blank" rel="noreferrer">Open interactive map <i className="fa-solid fa-arrow-up-right-from-square"/></a>
</div>
<iframe title="Map of Kabul, Afghanistan" loading="lazy"
 src="https://maps.google.com/maps?q=Kabul%2C%20Afghanistan&t=&z=12&ie=UTF8&iwloc=&output=embed"/>
 </div> : filtered.length ? filtered.map((doctor)=><article className="doctor-card doctor-card-modern" key={doctor.id}>
  <img src={doctor.image} alt={doctor.name}/>
  <div className="doctor-details">
    <span className="doctor-verified">
      <i className="fa-solid fa-circle-check"/> Local provider · Demo profile</span><h2>{doctor.name}</h2><h4>{doctor.specialty}</h4><p><i className="fa-solid fa-location-dot"/> {doctor.hospital}</p><p><i className="fa-solid fa-language"/> {doctor.languages}</p><div className="doctor-fee"><span>Consultation fee</span><b>{doctor.fee.toLocaleString()} AFN</b></div></div><div className="doctor-action"><span className="available"><i className="fa-regular fa-clock"/> {doctor.next}</span><button className="doctor-book-button" onClick={()=>setSelected(doctor)}>
        Book appointment <i className="fa-solid fa-arrow-right"/></button></div></article>) : <div className="doctor-no-results"><i className="fa-solid fa-user-doctor"/><h3>No doctors found</h3><p>Try another name, specialty or location.</p><button onClick={()=>{setSearch('');setLocation('');setSpecialty('all')}}>Clear filters</button></div>}</div></div>
    {selected && <div className="doctor-modal-backdrop" role="presentation" onClick={(e)=>{if(e.target===e.currentTarget)setSelected(null)}}><section className="doctor-booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="doctor-modal-close" onClick={()=>setSelected(null)} aria-label="Close booking form">×</button><span className="doctor-modal-eyebrow">APPOINTMENT REQUEST</span><h2 id="booking-title">Book with {selected.name}</h2><p>{selected.specialty} · {selected.fee.toLocaleString()} AFN consultation</p><form onSubmit={book}><label>Appointment date<input type="date" min={tomorrow()} value={booking.date} onChange={(e)=>setBooking({...booking,date:e.target.value})} required/></label><label>Available time<select value={booking.time} onChange={(e)=>setBooking({...booking,time:e.target.value})}><option>09:00</option><option>10:30</option><option>11:30</option><option>13:00</option><option>14:30</option><option>16:00</option></select></label><label>Visit type<select value={booking.type} onChange={(e)=>setBooking({...booking,type:e.target.value})}><option>In-person visit</option><option>Video consultation (demo)</option></select></label><label>Note for doctor <textarea rows="3" value={booking.notes} onChange={(e)=>setBooking({...booking,notes:e.target.value})} placeholder="Optional reason for your visit"/></label>{error && <small className="doctor-booking-error">{error}</small>}<button type="submit" className="doctor-book-button">Confirm appointment <i className="fa-solid fa-check"/></button><small className="doctor-booking-note">Demo booking only. Your appointment will appear in My Appointments.</small></form></section></div>}
  </section>;
}
