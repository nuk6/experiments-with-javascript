
{    
      let log = console.log;
      var Human = {
            legs : 2,
            init : function(name,age){
                  this.name = name;
                  this.age = age;
            },
            speak : function(){
                   log(`Hi I am ${this.name} and my age is ${this.age}`);
            }
      }
      var professional = Object.create(Human);
      professional.init('Jon',90);
      professional.speak();
}

/*
	Even this would work :O
{    
      let log = console.log;
      var Human = {
            legs : 2,
            init : function(name,age){
                  this.name = name;
                  this.age = age;
            },
            speak : function(){
                   log(`Hi I am ${this.name} and my age is ${this.age}`);
            }
      }
      var professional = {};
      professional.__proto__ = Human;
      professional.init('N',90);
      professional.speak();
}*/