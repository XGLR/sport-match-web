import {API_BASE_URL} from './config.js';
const KEY='sport-match-session';

export function createAccessClient({storage=globalThis.localStorage,fetcher=globalThis.fetch,apiBaseUrl=API_BASE_URL}={}){
  const base=new URL(apiBaseUrl);
  if(!['https:','http:'].includes(base.protocol))throw new Error('Invalid API URL');
  const endpoint=base.href.replace(/\/+$/,'');
  let token=storage?.getItem(KEY)||'';
  async function call(path,{method='GET',body}={}){
    const response=await fetcher(`${endpoint}/${path}`,{method,mode:'cors',credentials:'omit',headers:{...(body?{'content-type':'application/json'}:{}),...(token?{'x-quiz-session':token}:{})},...(body?{body:JSON.stringify(body)}:{})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'请稍后重试');
    return data;
  }
  return {
    async restore(){if(!token)return {authorized:false,remaining:0,maxUses:3};try{return await call('session');}catch{return {authorized:false,remaining:0,maxUses:3};}},
    async enter(orderNumber){const result=await call('access',{method:'POST',body:{orderNumber}});token=result.sessionToken;storage?.setItem(KEY,token);return {authorized:true,remaining:result.remaining,maxUses:result.maxUses};},
    async complete(attemptId,answers,conditions){return await call('complete',{method:'POST',body:{attemptId,answers,conditions}});},
    clear(){token='';storage?.removeItem(KEY);},
  };
}
