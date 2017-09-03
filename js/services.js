angular.module('ngApp.services', [])
.factory('MongooseService',function(){
  
  var mongoose = require('mongoose');
 
  
  var connection ;
  return {
    connect : function(info){
      
      mongoose.connect('mongodb://localhost/my_database',{useMongoClient:true});


    },
    test : function(){
        

    },
    close : function(){
    },
    find : function(table,offset,limit){

    }
  }
}) 
.factory('DBService',function(MongooseService){
    
    this.pageSize = 10;
    this.offset = 0;
    this.limit = 10;
    var self = this;    
    
    function size(table){

    }
    function find(table,offset,limit){
        return SQLService.find(table,offset,limit);
    }
    return {
      connect : function(info){
        MongooseService.connect(info);
        MongooseService.test();
      },
      getPager: async function(table,pageSize)
      {
          
          self.pageSize = pageSize;
          self.limit = self.pageSize;
          self.size = await size();
          var o =  {
              
              initialPage:function(){

                return find(table,self.offset,self.limit);
              },
              prevPage:function(){
                if(self.offset > 0 )
                { 
                  self.offset -= self.pageSize;
                } 
                 return find(table,self.offset,self.limit);         
              },
              nextPage:function(){
                  if(self.offset  + self.limit <= self.size )
                  {  
                    self.offset +=  self.pageSize;
                  }
                  return find(table,self.offset,self.limit);  
              }
          }
          return o;
          
      }        
    }
});
