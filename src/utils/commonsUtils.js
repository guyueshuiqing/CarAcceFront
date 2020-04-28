export const  debounce = (fn, delay=100)=>{
  let timer
  return function(){
    clearTimeout(timer)
    let args = arguments;
    timer = setTimeout(() => {
      fn.apply(this,args)
    }, delay)
  }
}

export const throttle = (fn,delay=100) => {
  let canRun = true
  return function() {
    if(!canRun){
      return
    }
    canRun = false
    setTimeout(() => {
      fn.call(this,arguments)
      canRun = true
    }, delay)
  }
}
