import test from 'node:test';
import assert from 'node:assert/strict';
import {films, dates, seats, fee, occupiedSeats, toggleSeat, totalPrice, isComplete} from '../src/booking.js';
test('semua 27 jadwal memiliki pasangan kursi tersedia tanpa melintasi lorong',()=>{
  for(const film of films) for(const date of dates) for(const time of film.times){
    const taken=occupiedSeats(film.id,date.id,time);
    assert.ok(['A','B','C','D'].some(row=>[1,2,3,5,6,7].some(n=>![`${row}${n}`,`${row}${n+1}`].some(s=>taken.includes(s)))));
    for(const seat of taken) assert.deepEqual(toggleSeat([],seat,taken),[]);
  }
});
test('maksimal dua kursi, dapat dibatalkan dan diganti',()=>{
  let selection=toggleSeat([],'B3',[]);
  selection=toggleSeat(selection,'B4',[]);
  assert.deepEqual(toggleSeat(selection,'B5',[]),['B3','B4']);
  selection=toggleSeat(selection,'B3',[]);
  assert.deepEqual(toggleSeat(selection,'B5',[]),['B4','B5']);
  assert.deepEqual(toggleSeat([],'Z1',[]),[]);
});
test('subtotal dan biaya per pesanan benar untuk semua film',()=>{
  for(const film of films){
    assert.equal(totalPrice(film,[]),0);
    assert.equal(totalPrice(film,['B3']),film.price+fee);
    assert.equal(totalPrice(film,['B3','B4']),film.price*2+fee);
  }
});
test('konfirmasi ditolak untuk pilihan tidak lengkap atau tidak valid',()=>{
  const f=films[0], d=dates[0].id, t='16.15', s=['B3','B4'];
  assert.equal(isComplete(f,d,t,s),true);
  for(const args of [[undefined,d,t,s],[f,'',t,s],[f,d,'',s],[f,d,t,[]],[f,d,t,['B3']],[f,d,t,['B3','B3']],[f,d,t,['Z1','Z2']],[f,d,'12.30',s],[f,'2027-01-01',t,s],[f,d,t,[occupiedSeats(f.id,d,t)[0],'B3']]]) assert.equal(isComplete(...args),false);
});
test('mode observasi: B3 dan B4 tersedia dan total Rp93.000',()=>{
  assert.equal(isComplete(films[0],dates[0].id,'16.15',['B3','B4']),true);
  assert.equal(totalPrice(films[0],['B3','B4']),93000);
});
