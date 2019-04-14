{    
      let log = console.log;
      var Human = {
            legs : 2,
            speak : function(){
                   log(`Hi I am ${this.name} and my age is ${this.age}`);
            }
      }
      var professional = Object.create(Human,{name : {value : 'Jon'}, age : {value : 48}, job : {value : 'SED'}});
      professional.speak();
}