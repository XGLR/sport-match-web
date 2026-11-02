const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function renderRadar(scores,dimensions){
 const axes=dimensions.slice(0,6).map(d=>({...d,score:Math.max(0,Math.min(6,Number(scores[d.id])||0))}));
 const point=(index,radius)=>{const angle=-Math.PI/2+index*Math.PI/3;return [170+Math.cos(angle)*radius,164+Math.sin(angle)*radius];};
 const coords=(radius,values)=>axes.map((d,i)=>point(i,values?radius*d.score/6:radius).map(n=>n.toFixed(2)).join(',')).join(' ');
 const description=axes.map(d=>`${d.name} ${d.score} / 6`).join('；');
 return `<figure class="radar"><svg viewBox="0 0 340 334" role="img" aria-labelledby="preference-radar-title preference-radar-desc"><title id="preference-radar-title">六维运动偏好</title><desc id="preference-radar-desc">${escape(description)}。分数表示偏好程度。</desc>${[1/3,2/3,1].map(level=>`<polygon class="radar-grid" points="${coords(98*level)}"/>`).join('')}${axes.map((d,i)=>{const [x,y]=point(i,98);return `<line class="radar-axis" x1="170" y1="164" x2="${x.toFixed(2)}" y2="${y.toFixed(2)}"/>`;}).join('')}<polygon class="radar-shape" points="${coords(98,true)}"/>${axes.map((d,i)=>{const [x,y]=point(i,98*d.score/6);return `<circle class="radar-point" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="3.5"/>`;}).join('')}${axes.map((d,i)=>{const [x,y]=point(i,139);return `<text class="radar-label" x="${x.toFixed(2)}" y="${(y-5).toFixed(2)}" text-anchor="middle" aria-hidden="true"><tspan x="${x.toFixed(2)}">${escape(d.name)}</tspan><tspan class="radar-score" x="${x.toFixed(2)}" dy="18">${d.score} / 6</tspan></text>`;}).join('')}</svg><figcaption>越靠近外圈，这项运动偏好越明显。</figcaption></figure>`;
}

