function test(){
   
  return new Promise((resolve)=>{

    resolve(100);

  })

}


async function callFun(){
  
  let data = await test();

  return data+100;

}

callFun().then((v)=>{
   
  console.log(v);

})