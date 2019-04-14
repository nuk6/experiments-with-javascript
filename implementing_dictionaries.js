{
      var hashProps = {
            init : function(){
                  this.map = {};
            },
            add : function(key,val){
                  if(this.map.hasOwnProperty(key)){
                       console.log(`${key} already exists`); 
                  }
                  else{
                        this.map[key] = val;
                  }
            },
            show : function(){
                  console.log(this.map);
            }
      }
      var myMap = Object.create(hashProps);
      myMap.init();
      myMap.add(0,1);
      myMap.show();

}