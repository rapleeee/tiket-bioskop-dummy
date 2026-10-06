import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { films, dates, seats, fee, occupiedSeats, toggleSeat, totalPrice, isComplete } from './booking';
import './style.css';
const rupiah = value => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);
function Poster({film}) {
  return <div className={`poster ${film.id}`} aria-hidden="true"><span className="poster-top">LAYARKITA PICTURES</span><div className="art"><i/><b/><em/></div><div className="poster-copy"><small>{film.subtitle}</small><strong>{film.title}</strong><span>SEBUAH CERITA UNTUK LAYAR LEBAR</span></div></div>;
}
function App() {
  const observation = new URLSearchParams(location.search).get('mode') === 'observasi';
  const [filmId,setFilmId] = useState(observation?'orbit':'');
  const [date,setDate] = useState(observation?dates[0].id:'');
  const [time,setTime] = useState(observation?'16.15':'');
  const [selected,setSelected] = useState(observation?['B3','B4']:[]);
  const [notice,setNotice] = useState('');
  const [confirmed,setConfirmed] = useState(false);
  const film = films.find(f=>f.id===filmId);
  const occupied = occupiedSeats(filmId,date,time);
  const ready = Boolean(film && date && time);
  const complete = isComplete(film,date,time,selected);
  function chooseFilm(id) { if(id!==filmId){setFilmId(id);setTime('');setSelected([]);setNotice('');} }
  function chooseDate(id) { if(id!==date){setDate(id);setSelected([]);setNotice('');} }
  function chooseTime(value) { if(value!==time){setTime(value);setSelected([]);setNotice('');} }
  function chooseSeat(seat) {
    if(!ready) return;
    setNotice(selected.length===2 && !selected.includes(seat)?'Maksimal 2 kursi. Lepaskan salah satu kursi untuk mengganti pilihan.':'');
    setSelected(toggleSeat(selected,seat,occupied));
  }
  return <><header><a className="brand" href={observation?'?mode=observasi':'./'} aria-label="LayarKita beranda"><span className="brand-icon">▰</span>Layar<span>Kita</span><sup>®</sup></a><div className="header-caption">CERITA DIMULAI DI SINI.</div><div className="location"><span>⌖</span> Kota Arunika <span className="location-divider">|</span> Studio Merdeka</div></header>
  <main><section className="promo"><div className="promo-content"><div className="eyebrow">BIG SCREEN. BIG FEELINGS.</div><h1>Dua kursi.<br/>Seribu cerita.</h1><p>Waktunya rehat sejenak. Temukan duniamu di layar lebar.</p></div><div className="promo-offer"><span>LEBIH DEKAT DENGAN SINEMA</span><strong>MULAI <b>40</b><em>RB</em></strong><p>Setiap cerita layak ditonton bersama.</p></div><div className="promo-art" aria-hidden="true"><div className="ticket">LK<span>ADMIT TWO</span><i>••••••••••••</i></div><div className="star">✳</div></div></section>
  <div className="booking-layout"><div className="selection-column"><section className="movies"><div className="section-title"><h2>Sedang tayang</h2><span>Temukan cerita pilihanmu</span></div><div className="film-grid">{films.map(f=><button key={f.id} className={`film-card ${filmId===f.id?'film-active':''}`} onClick={()=>chooseFilm(f.id)} aria-pressed={filmId===f.id} aria-label={`Pilih film ${f.title}`}><Poster film={f}/><div className="film-info"><div className="film-heading"><h3>{f.title}</h3><span>{f.tag}</span></div><p>{f.genre} <span>• {f.duration} menit</span></p><div className="film-price">{rupiah(f.price)}<small>/ tiket</small></div></div></button>)}</div></section>
  <div className="lower-grid"><section className="schedule panel"><div className="section-title"><h2>Jam tayang</h2><span>2D</span></div><p>Studio Merdeka · Reguler</p><div className="time-options">{(film?.times ?? films[0].times).map(t=><button key={t} disabled={!film} className={time===t?'time-active':''} aria-pressed={time===t} onClick={()=>chooseTime(t)}>{t}</button>)}</div><p className="schedule-note">{film?'Pintu studio dibuka 15 menit sebelum film.':'Pilih film untuk melihat jadwal.'}</p></section>
  <section className="seat-panel panel"><div className="section-title"><h2>Pilih kursi</h2><span>{selected.length} / 2 kursi</span></div><div className="screen">LAYAR BIOSKOP</div><div className="seat-grid">{seats.map(s=><button key={s} aria-label={`Kursi ${s}${occupied.includes(s)?', terisi':''}`} aria-pressed={selected.includes(s)} disabled={!ready || occupied.includes(s)} className={`seat ${occupied.includes(s)?'occupied':''} ${selected.includes(s)?'selected':''}`} onClick={()=>chooseSeat(s)}>{s}</button>)}</div><p className="seat-note" role="status">{notice || (ready?'Pilih 2 kursi untuk pengalaman menontonmu.':'Pilih film, tanggal, dan jam terlebih dahulu.')}</p></section></div></div>
  <aside className="order-column"><section className="date-panel panel"><div className="section-title"><h2>Tanggal</h2><span>Oktober 2026</span></div><div className="date-options">{dates.map(d=><button key={d.id} onClick={()=>chooseDate(d.id)} className={date===d.id?'date-active':''} aria-pressed={date===d.id}><span>{d.day}</span><strong>{d.date}</strong></button>)}</div></section>
  <section className="summary panel"><div className="section-title"><h2>Pesananmu</h2><span className="mini-mark">LK / TICKET</span></div><h3>{film?.title || 'Belum ada film'}</h3><p className="summary-cinema">Studio Merdeka · 2D · Reguler</p><dl><div><dt>Tanggal</dt><dd>{dates.find(d=>d.id===date)?.label ?? '—'}</dd></div><div><dt>Jam</dt><dd>{time || '—'}</dd></div><div><dt>Kursi</dt><dd>{selected.join(', ') || '—'}</dd></div><div><dt>Jumlah tiket</dt><dd>{selected.length} tiket</dd></div><div><dt>Harga satuan</dt><dd>{film?rupiah(film.price):'—'}</dd></div></dl><div className="subtotal"><span>Harga tiket</span><span>{rupiah((film?.price??0)*selected.length)}</span></div><p className="service-fee">Biaya layanan per pesanan <span>{rupiah(selected.length?fee:0)}</span></p><div className="total"><span>Total</span><strong>{rupiah(totalPrice(film,selected))}</strong></div><button className="continue" disabled={!complete} onClick={()=>setConfirmed(true)}>Lanjut <span>↗</span></button><p className="simulation">Simulasi pemesanan. Tidak ada transaksi nyata.</p></section></aside></div>
  <footer><span>© 2026 LayarKita <span className="footer-dot">•</span> Ruang untuk setiap cerita.</span><span>Seluruh film, lokasi, dan jadwal bersifat fiktif.</span></footer></main>
  {confirmed&&<div className="modal-backdrop"><section className="confirmation" role="dialog" aria-modal="true" aria-labelledby="confirmation-title"><span className="confirmation-icon">✓</span><p className="eyebrow">LAYARKITA / KONFIRMASI</p><h2 id="confirmation-title">Pilihanmu sudah siap.</h2><p>{film.title} · {dates.find(d=>d.id===date).label}<br/>{time} · Kursi {selected.join(' & ')}</p><div className="confirmation-total">2 tiket · {rupiah(totalPrice(film,selected))}</div><p>Ini hanya simulasi. Tidak ada pembayaran atau transaksi nyata, dan tidak ada tiket yang diterbitkan.</p><button className="continue" autoFocus onClick={()=>setConfirmed(false)}>Kembali ke pesanan <span>↗</span></button></section></div>}</>;
}
createRoot(document.getElementById('root')).render(<App/>);
