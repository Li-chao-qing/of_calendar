window.onload=function(){
  	var date=new Date();
	document.onmousedown=function(e){
	  e.preventDefault();
	};

  	var $=function(e){
  		return document.getElementById(e);
  	};

    // var ZHENG=24*60*60*1000;
    var xiao=document.getElementsByClassName('xiao');
    // qian
    //dang 
    // xia
    // var CURR;
    //红线的位置
    
 

    var jintian_d=date.getDate();  
    var jintian_m=date.getMonth();  
    var jintian_y=date.getFullYear(); 
    var jintian_w=date.getDay();

    var L;
    var nowdate=new Date(Date.now());
    var isrunnian=function(year){
      if(year%4==0&&year%100!=0||year%400==0){
        return true;
      }else{
        return false;
      }
    };



    //onmousedown
    //每月天数
    var meiyuetianshu=[31,28,31,30,31,30,31,31,30,31,30,31];
    var shangyige;
    // 
    var addClass=function(el,s){
        var tmp=el.getAttribute('class').split(' ');
        var dict={};
        for(var i=0;i<tmp.length;i++){
          dict[tmp[i]]=true;
        }
        if(!dict[s]){
          el.setAttribute('class',el.getAttribute('class')+' '+s);
        }
    };
   var removeClass=function(el,s){
      	var tmp=el.getAttribute('class').split(' ');
        var dict={};
        for(var i=0;i<tmp.length;i++){
          dict[tmp[i]]=true;
        }
        delete dict[s];
        var ns='';
        for(var name in dict){
          ns+=' '+name;
        }
        el.setAttribute('class',ns);
    };
    //画日历
    var huarili=function(){

      var i=0;
      var tmp=date.getDate();//今天是几号
      date.setDate(1);//今天变成 1号 这个月的第一天是星期几
      var xingqi=date.getDay();//这个月1号星期几
      date.setDate(tmp);//还原到今天
      L=xingqi==0?6:xingqi-1;//前面空几天
      for(var k=0;k<xiao.length;k++){
        removeClass(xiao[k],'fense');
        removeClass(xiao[k],'jintian_');
      }
      if(date.getMonth()==1&&isrunnian(date.getFullYear())){
          meiyuetianshu[1]=29;
      }
      else if(date.getMonth()==1&&!isrunnian(date.getFullYear())){
         meiyuetianshu[1]=28;
      }

      if(date.getMonth()==0){
        var shangyuetianshu=31;
      }
      else{
        var shangyuetianshu=meiyuetianshu[date.getMonth()-1];
        //上月天数     
      }
      //前一月
      for(;i<L;i++){
       //26 27 28 29 30 31
        xiao[i].innerHTML=shangyuetianshu-(L-i-1);
        xiao[i].removeAttribute('id');
        xiao[i].setAttribute('pr',true);
        xiao[i].style.color='#ccc';

      }
      //当月
     
      for(;i<meiyuetianshu[date.getMonth()]+L;i++){
        xiao[i].innerHTML=i-L+1;
        xiao[i].setAttribute('id','d'+(i-L+1));
        if(jintian_y==date.getFullYear()&&jintian_m==date.getMonth()&&xiao[i].innerHTML==jintian_d){
            xiao[i].style.color='red';
            addClass(xiao[i],'fense');
        }else{
            xiao[i].style.color='black';
        }
          


        xiao[i].removeAttribute('pr');
        xiao[i].removeAttribute('nx');
        if(jintian_y==date.getFullYear()&&jintian_d==tmp&&jintian_m==date.getMonth()&&xiao[i].innerHTML==tmp){
          addClass(xiao[i],'hong');
          xiao[i].style.color='white';
        }
          

      }
      

      // 下一月
      var D=i;
      for(;i<xiao.length;i++){

        xiao[i].innerHTML=i-D+1;
        xiao[i].removeAttribute('id');
        xiao[i].style.color='#ccc';

        xiao[i].setAttribute('nx',true);
      }
    };
    huarili();
   
    //数据结构
 var prevMonth=function(){
      var currentyear=date.getFullYear();
      var currentmonth=date.getMonth();
      var currentdate=date.getDate();

      var targetyear,targetmonth,targetdate;
      targetdate=1;
      if(currentmonth==2&&isrunnian(currentyear)){
        meiyuetianshu[1]=29;
      }
      if(currentmonth==2&&!isrunnian(currentyear)){
        meiyuetianshu[1]=28;
      }
      if(currentmonth==0){
      	targetmonth=11;
      	targetyear=currentyear-1;
      }else{
      	targetmonth=currentmonth-1;
      	targetyear=currentyear;
      }  
      date=new Date(targetyear,targetmonth,targetdate);

      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());

    };
    var prevDay=function(){
      var currentyear=date.getFullYear();
      var currentmonth=date.getMonth();
      var currentdate=date.getDate();

      var targetyear,targetmonth,targetdate;
     
      targetdate=currentdate-1;
      if(targetdate==0){
        targetyear=currentyear;
        targetmonth=currentmonth-1;
        if(targetmonth==-1){
          targetyear=currentyear-1;
          targetmonth=11;
        }
        if(targetmonth==1){
          if(isrunnian(targetyear)){
            meiyuetianshu[1]=29;
          }
          else{
            meiyuetianshu[1]=28;
          }
        }
        targetdate=meiyuetianshu[targetmonth];

      }else{
         targetmonth=currentmonth;
          targetyear=currentyear;
      }
     
     
      date=new Date(targetyear,targetmonth,targetdate);
      
      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());

    };

 var nextMonth=function(){
      // console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
      var currentyear=date.getFullYear();
      var currentmonth=date.getMonth();
      var currentdate=date.getDate();

      var targetyear,targetmonth,targetdate;
      targetdate=1; 
      if(currentmonth+1==1&&isrunnian(currentyear)){
        meiyuetianshu[1]=29;
      }
      if(currentmonth+1==1&&!isrunnian(currentyear)){
        meiyuetianshu[1]=28;
      }
      
      if(currentmonth==11){
      	targetmonth=0;
      	targetyear=currentyear+1;
      }else{
      	targetyear=currentyear;
      	targetmonth=currentmonth+1;
      }
      date=new Date(targetyear,targetmonth,targetdate);
      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
    };



    var nextDay=function(){
      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
      var currentyear=date.getFullYear();
      var currentmonth=date.getMonth();
      var currentdate=date.getDate();

      var targetyear,targetmonth,targetdate;
      if(currentmonth+1==1&&isrunnian(currentyear)){
        meiyuetianshu[1]=29;
      }
      if(currentmonth+1==1&&!isrunnian(currentyear)){
        meiyuetianshu[1]=28;
      }
  
      targetdate=currentdate+1;
      
      if(meiyuetianshu[currentmonth]<targetdate){
        targetyear=currentyear;
        targetmonth=currentmonth+1;
       
        if(targetmonth==12){
          targetyear=currentyear+1;
          targetmonth=0;

        }
        targetdate=1;
      }else{
        targetmonth=currentmonth;
         targetyear=currentyear;

      }
       
     
      date=new Date(targetyear,targetmonth,targetdate);
      console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
    };
    var nowC;
    var week=['日','一','二','三','四','五','六'];
    var ondatechange=function(){  
      if(shangyige){ 
        removeClass(shangyige,'hui');
      }
      var xx=date.getDate();
      var el=document.getElementById('d'+xx);
      addClass(el,'hui');

      if(jintian_d==xx&&jintian_m==(date.getMonth())&&jintian_y==date.getFullYear()){
        el.style.color='red';

        removeClass(el,'hui');
        if(jintian_w==6||jintian_w==0){

          // a_ri.style.background='#F7F7F7';
           addClass(el,'jintian_1');

        }else{
            addClass(el,'jintian_');
        }
         
        
        addClass(el,'hong');

        el.style.color='white';
        // hongxian.style.display='block';
      }else{
        removeClass(el,'hong');
   
      }
     
      shangyige=el;


      // today.innerHTML=date.getDate();
      var ss=date.getFullYear()+' 年 '+(date.getMonth()+1)+' 月 '+date.getDate()+' 日'+' 星期'+week[date.getDay()];
      // detail.innerHTML=ss;
      var yuedx=['January','February','March','April','May','June','July','August','September','October','November','December']
      
      ye_mo_d.innerHTML=yuedx[date.getMonth()]+"&nbsp;&nbsp;"+date.getFullYear();
      // y_www.innerHTML=ss.slice(-3);

		$('date_1').innerHTML=(date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();

      // dangtianpic();
    };
    ondatechange();

    for(var i=0;i<xiao.length;i++){

      xiao[i].onclick=function(){
        for(var j=0;j<xiao.length;j++){
          if(xiao[j].getAttribute('class').indexOf('hong')!=-1){
             removeClass(xiao[j],'hong');
             xiao[j].style.color='red';
          } 
        }

        // hongxian.style.display='none';
        if(this.getAttribute('class').indexOf('xiu')!=-1){
          // a_ri.style.background='#f7f7f7';
        }else{     
            // a_ri.style.background='white';
           
        }

        this.onmousedown=function(e){
          e.preventDefault();
        };
        // console.log(date.getFullYear(),date.getMonth()+1,date.getDate());
        var a=date.getFullYear();
        var b=date.getMonth();
        var c=date.getDate();
        var x,y,z;
        if(this.hasAttribute('id')){
          date.setDate(this.innerHTML);
          ondatechange();     
        }
        else if(this.hasAttribute('pr')){
          z=this.innerHTML;
          y=b-1;
          x=a;
          date=new Date(x,y,z);
          huarili();
           ondatechange();
        }
        else if(this.hasAttribute('nx')){

          z=this.innerHTML;
          
          y=b+1;
          x=a;

          date=new Date(x,y,z);
            // 根据abc得到逻辑正确的xyz
          huarili();
             
          ondatechange();
        }

          
        
      };
    }
    
    le_but.onclick=function(){
      
     
		clearTimeout(t);
      	le_but.style.color='#aaa';
      	var t=setTimeout(function(){
      		le_but.style.color='red';

      	},200)
      for(var j=0;j<xiao.length;j++){
          if(xiao[j].getAttribute('class').indexOf('hong')!=-1){
             removeClass(xiao[j],'hong');
             xiao[j].style.color='red';
          }     
      }
      // prevDay();
      prevMonth();
      huarili();
      ondatechange();
    };
    le_but.onmousedown=function(e){
      e.preventDefault();
    };
    ri_but.onmousedown=function(e){
      e.preventDefault();
    };
    ri_but.onclick=function(){
    	clearTimeout(t);
      	ri_but.style.color='#aaa';
      	var t=setTimeout(function(){
      		ri_but.style.color='red';

      	},200)
       for(var j=0;j<xiao.length;j++){
            if(xiao[j].getAttribute('class').indexOf('hong')!=-1){
               removeClass(xiao[j],'hong');
               xiao[j].style.color='red';

            }
          
           
          }
        // hongxian.style.display='none';
        if(this.getAttribute('class').indexOf('xiu')!=-1){
          // a_ri.style.background='#f7f7f7';
        }else{
            // a_ri.style.background='white';           
        }
          // nextDay();
          nextMonth();
       huarili();
      ondatechange();
    };
    //前往今天
    $("go_j").onclick=function(){
      date=new  Date();
      huarili();
      ondatechange();
    };
 

//红心大战

};//最后