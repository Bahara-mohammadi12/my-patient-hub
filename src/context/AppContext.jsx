import { useEffect, useState } from 'react';
import { AppContext } from './AppContext.js';

const read = (key, fallback) => {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; }
  catch { return fallback; }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => read('mphUser', null));
  const [appointments, setAppointments] = useState(() => read('mphAppointments', []));
  const [cart, setCart] = useState(() => read('mphCart', []));
  const [notifications, setNotifications] = useState(() => read('mphNotifications', [
    { id: 'welcome', title: 'Welcome to My Patient HUB', detail: 'Your healthcare workspace is ready.', read: false }
  ]));
  const [toast, setToast] = useState('');
  useEffect(() => localStorage.setItem('mphUser', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('mphAppointments', JSON.stringify(appointments)), [appointments]);
  useEffect(() => localStorage.setItem('mphCart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('mphNotifications', JSON.stringify(notifications)), [notifications]);
  useEffect(() => { if (!toast) return undefined; const id = window.setTimeout(() => setToast(''), 3200); return () => window.clearTimeout(id); }, [toast]);

  const signIn = (nextUser) => { setUser(nextUser); setNotifications((n) => [{ id: `signin-${Date.now()}`, title: 'Signed in successfully', detail: 'Welcome back to your health workspace.', read: false }, ...n]); };
  const signOut = () => { setUser(null); };
  const addAppointment = (appointment) => {
    const next = { id: `apt-${Date.now()}`, status: 'Confirmed', createdAt: new Date().toISOString(), ...appointment };
    setAppointments((items) => [next, ...items]);
    setNotifications((n) => [{ id: `apt-note-${Date.now()}`, title: 'Appointment booked', detail: `${next.doctor} · ${next.date} at ${next.time}`, read: false }, ...n]);
    setToast('Appointment booked successfully.');
    return next;
  };
  const addToCart = (product) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...items, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} added to your cart.`);
  };
  const changeQuantity = (id, quantity) => setCart((items) => quantity <= 0 ? items.filter((item) => item.id !== id) : items.map((item) => item.id === id ? { ...item, quantity } : item));
  const checkout = () => {
    if (!cart.length) { setToast('Your cart is empty. Add an item first.'); return false; }
    setCart([]);
    setNotifications((n) => [{ id: `order-${Date.now()}`, title: 'Order placed successfully', detail: 'Your demo order has been recorded.', read: false }, ...n]);
    return true;
  };
  const markNotificationsRead = () => setNotifications((n) => n.map((item) => ({ ...item, read: true })));
  const value = { user, setUser, signIn, signOut, appointments, setAppointments, addAppointment, cart, addToCart, changeQuantity, checkout, notifications, markNotificationsRead, toast, setToast };
  return <AppContext.Provider value={value}>{children}{toast && <div className="app-toast" role="status"><span>✓</span>{toast}<button onClick={() => setToast('')} aria-label="Dismiss message">×</button></div>}</AppContext.Provider>;
}
