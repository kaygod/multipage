

const service_ip = "www.wayforcloud.com"; //定义一些全局的静态常量


const add = (a,b)=>{
  return a+b;
}

/**
 * 测试一下es7
 */
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

/**
 * 如果想暴露给其他模块,一定在这里导出去
 */
export default {
  service_ip,
  add
}