export const films = [
  { id: 'orbit', title: 'Orbit Terakhir', genre: 'Petualangan · Sci-Fi', duration: 118, price: 45000, tag: '13+', subtitle: 'JARAK BUKAN AKHIR PERJALANAN', times: ['13.00', '16.15', '19.30'] },
  { id: 'pulang', title: 'Jalan Pulang', genre: 'Drama · Keluarga', duration: 104, price: 40000, tag: 'SU', subtitle: 'SETIAP JALAN MENYIMPAN CERITA', times: ['12.30', '15.00', '18.45'] },
  { id: 'senja', title: 'Selepas Senja', genre: 'Romansa · Drama', duration: 112, price: 50000, tag: '13+', subtitle: 'ADA RASA YANG TINGGAL', times: ['14.00', '17.15', '20.00'] },
];
export const dates = [{id:'2026-10-16',day:'JUM',date:'16',label:'Jumat, 16 Oktober 2026'},{id:'2026-10-17',day:'SAB',date:'17',label:'Sabtu, 17 Oktober 2026'},{id:'2026-10-18',day:'MIN',date:'18',label:'Minggu, 18 Oktober 2026'}];
export const seats = ['A','B','C','D'].flatMap(row => Array.from({length:8},(_,i)=>`${row}${i+1}`));
export const fee = 3000;
export function occupiedSeats(film, date, time) {
  const key = `${film}|${date}|${time}`;
  const n = [...key].reduce((sum,c)=>sum+c.charCodeAt(0),0)%3;
  return [['A2','A3','B5','C1','C7','D4'],['A5','B1','B2','C6','D7','D8'],['A1','A8','B6','C2','C3','D5']][n];
}
export function toggleSeat(selected, seat, occupied) {
  if (!seats.includes(seat) || occupied.includes(seat)) return selected;
  if (selected.includes(seat)) return selected.filter(s=>s!==seat);
  return selected.length<2 ? [...selected,seat].sort() : selected;
}
export function totalPrice(film, selected) { return (film?.price ?? 0)*selected.length + (selected.length ? fee : 0); }
export function isComplete(film, date, time, selected) {
  return Boolean(film && dates.some(d=>d.id===date) && film.times.includes(time) && selected.length===2 && new Set(selected).size===2 && selected.every(s=>seats.includes(s) && !occupiedSeats(film.id,date,time).includes(s)));
}
