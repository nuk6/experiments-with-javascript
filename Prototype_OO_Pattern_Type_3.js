{    
      let log = console.log;
      var Person = {
            legs : 2,
            init : function(name,age){
                  this.name = name;
                  this.age = age;
            },
            getNameAge : function(){
                   log(`Hi I am ${this.name} and my age is ${this.age}`);
            }
      }
      //Better way
      function getPersons(name,age,job){
            var professional = Object.create(Person);//Does nothing but adds Person to the prototype of professional
            professional.name = name;
            professional.job = job;
            professional.age = age
            professional.getNameAgeJob = function(){log(`${this.name}#${this.age}#${this.job}`);};
            return professional;
      }
      // NOTE : NO "new" here , as we're allocationg using Object.create()
      var emp1 = getPersons('Jon Doe',22,'SDE');
      emp1.getNameAge(); // Outputs : Hi I am Jon Doe and my age is 22
      emp1.getNameAgeJob();// Outputs : Jon Doe#22#SDE
}