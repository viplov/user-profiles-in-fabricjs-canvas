export default function debounce(func : any, timeout : any){
  let timer : any;
    return (...args : any) => {
  clearTimeout(timer);
  timer = setTimeout(() => { func.apply(this, args); }, timeout);
};
}