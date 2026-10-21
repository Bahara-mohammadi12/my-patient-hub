import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp.js';
import './login.css';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\+?[0-9][0-9\s()-]{7,14}$/;
export default function Login() {
  const [mode, setMode] = useState('signin');
  const [method, setMethod] = useState('email');
  const [values, setValues] = useState({ fullName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const { signIn } = useApp();
  const navigate = useNavigate();
  const update = (event) => { setValues({ ...values, [event.target.name]: event.target.value }); setErrors({ ...errors, [event.target.name]: '' }); setNotice(''); };
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    if (mode === 'signup' && values.fullName.trim().length < 2) next.fullName = 'Enter your full name.';
    if (method === 'email' && !emailPattern.test(values.email.trim())) next.email = 'Enter a valid email address.';
    if (method === 'phone' && !phonePattern.test(values.phone.replace(/\s/g, ''))) next.phone = 'Enter a valid phone number.';
    if (values.password.length < 6) next.password = 'Password must be at least 6 characters.';
    if (mode === 'signup' && values.password !== values.confirmPassword) next.confirmPassword = 'Passwords do not match.';
    const saved = JSON.parse(localStorage.getItem('mphRegisteredUsers') || '[]');
    const identifier = method === 'email' ? values.email.trim().toLowerCase() : values.phone.replace(/\s/g, '');
    if (!Object.keys(next).length && mode === 'signup' && saved.some((item) => item.identifier === identifier)) next[method] = 'An account with this contact already exists.';
    if (!Object.keys(next).length && mode === 'signin') {
      const account = saved.find((item) => item.identifier === identifier && item.password === values.password);
      const activeUser = account;
      if (!activeUser) next.password = 'We could not find a matching account. Please sign up first.';
      else { signIn({ fullName: activeUser.fullName, email: activeUser.email || '', phone: activeUser.phone || '', method: activeUser.method || method, identifier: activeUser.identifier || identifier }); navigate('/'); return; }
    }
    if (Object.keys(next).length) { setErrors(next); return; }
    const account = { fullName: values.fullName.trim(), email: method === 'email' ? values.email.trim().toLowerCase() : '', phone: method === 'phone' ? values.phone.trim() : '', password: values.password, identifier, method };
    localStorage.setItem('mphRegisteredUsers', JSON.stringify([...saved, account]));
    signIn({ fullName: account.fullName, email: account.email, phone: account.phone, method, identifier });
    navigate('/');
  };
  const switchMode = (next) => { setMode(next); setErrors({}); setNotice(''); };
  return <main className="auth-screen"><div className="auth-decoration auth-decoration-one"/><div className="auth-decoration auth-decoration-two"/>
    <section className="auth-card"><div className="auth-brand"><span className="auth-brand-mark"><i className="fa-solid fa-heart-pulse"/></span><span>Patient<span>HUB</span></span><small>AFGHANISTAN</small></div>
      <div className="auth-intro"><span className="auth-eyebrow">YOUR HEALTH, IN ONE PLACE</span><h1>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1><p>{mode === 'signup' ? 'Join your personal healthcare workspace.' : 'Sign in to manage your care with confidence.'}</p></div>
      <div className="auth-tabs"><button className={mode === 'signin' ? 'selected' : ''} onClick={() => switchMode('signin')} type="button">Sign in</button><button className={mode === 'signup' ? 'selected' : ''} onClick={() => switchMode('signup')} type="button">Create account</button></div>
      <form className="auth-form" onSubmit={submit} noValidate>
        {mode === 'signup' && <label>Full name<div className="auth-input"><i className="fa-regular fa-user"/><input name="fullName" value={values.fullName} onChange={update} placeholder="Your full name" autoComplete="name"/></div>{errors.fullName && <small className="field-error">{errors.fullName}</small>}</label>}
        <div className="auth-method-label">Continue with</div><div className="auth-method-switch"><button type="button" className={method === 'email' ? 'chosen' : ''} onClick={() => { setMethod('email'); setErrors({}); }}> <i className="fa-regular fa-envelope"/> Email</button><button type="button" className={method === 'phone' ? 'chosen' : ''} onClick={() => { setMethod('phone'); setErrors({}); }}><i className="fa-solid fa-mobile-screen"/> Phone number</button></div>
        {method === 'email' ? <label>Email address<div className="auth-input"><i className="fa-regular fa-envelope"/><input type="email" name="email" value={values.email} onChange={update} placeholder="you@example.com" autoComplete="email"/></div>{errors.email && <small className="field-error">{errors.email}</small>}</label> : <label>Phone number<div className="auth-input"><i className="fa-solid fa-phone"/><input type="tel" name="phone" value={values.phone} onChange={update} placeholder="+93 7X XXX XXXX" autoComplete="tel"/></div>{errors.phone && <small className="field-error">{errors.phone}</small>}</label>}
        <label>Password<div className="auth-input"><i className="fa-solid fa-lock"/><input type="password" name="password" value={values.password} onChange={update} placeholder="At least 6 characters" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}/></div>{errors.password && <small className="field-error">{errors.password}</small>}</label>
        {mode === 'signup' && <label>Confirm password<div className="auth-input"><i className="fa-solid fa-shield-halved"/><input type="password" name="confirmPassword" value={values.confirmPassword} onChange={update} placeholder="Enter password again" autoComplete="new-password"/></div>{errors.confirmPassword && <small className="field-error">{errors.confirmPassword}</small>}</label>}
        {notice && <p className="auth-notice">{notice}</p>}
        <button className="auth-submit" type="submit">{mode === 'signup' ? 'Create account' : 'Sign in'} <i className="fa-solid fa-arrow-right"/></button>
      </form>
      <p className="auth-terms">Demo account only. Your details stay in this browser; real email/SMS verification requires a secure backend.</p>
    </section><aside className="auth-side"><div className="auth-side-content"><span className="auth-side-chip"><i className="fa-solid fa-shield-heart"/> CARE THAT CONNECTS</span><h2>Healthcare, made simpler.</h2><p>Find trusted providers, keep track of appointments and bring everyday care into one calm, organized space.</p><div className="auth-benefits"><span><i className="fa-solid fa-check"/> Discover local doctors and clinics</span><span><i className="fa-solid fa-check"/> Keep appointments in one place</span><span><i className="fa-solid fa-check"/> Manage care for your family</span></div><div className="auth-side-art"><div className="auth-art-circle"><i className="fa-solid fa-heart-pulse"/></div><span className="auth-art-plus">+</span><span className="auth-art-dot"/></div></div><small className="auth-side-footer">© 2026 Patient HUB · Afghanistan edition</small></aside>
  </main>;
}
