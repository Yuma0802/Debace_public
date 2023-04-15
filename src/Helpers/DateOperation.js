
export const getNowDate = (dt,range) => {
  var Y = dt.getFullYear();
  var M = ('00' + (dt.getMonth()+1)).slice(-2);
  var D = ('00' + dt.getDate()).slice(-2);

  if(range === 'd') {
    return D;
  }else if(range === 'md') {
    return M +'/' + D;
  }else{
    return Y +'/'+ M +'/' + D;
  }
  
};

export const getAfterNdays = (n, range) => {
  var dt = new Date();
  dt.setDate(dt.getDate()+n);
  return getNowDate(dt,range);
};

export const getNowTime = (dt, range) => {

  const h = ("00" + dt.getHours()).slice(-2)
  const m = ("00" + dt.getMinutes()).slice(-2)
  const s = ("00" + dt.getSeconds()).slice(-2)

  if(range === 'h') {
    return h;
  }else if(range === 'hm') {
    return h +':' + m;
  }else{
    return h +':'+ m +':' + s;
  }
}