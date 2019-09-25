# ARSW_2019-2_Lab-5_Blueprints_front


*This work has been done until the "NEXT WEEK" part during the 7th week. The "NEXT WEEK" part was finished at the beginning of the Lab 6.*


## Name :

```
Etienne Maxence Eugene REITZ
GitHub username : Tylones
```

## Build and test instructions : 

Go in the project directory :

* To build the project , run the command : ```mvn package```
* To test the project, run the command : ```mvn test```
* To compile the project, run the command : ```mvn compile```
* To run the project, run the command : ```mvn spring-boot:run```

## app.js

This is the file *apiapp.js* updating the list and the canvas depending on the user's action : 

```js
var Module = (function () {

    var selectedAuthorName;
    var bpList=[];

    var updateList = function (BPs) {
            if(BPs){
                document.getElementById("authorsNameLabel").innerHTML = selectedAuthorName;
                var newArray = BPs.map(function(val, index){
                    return {key:val.name, value:val.points.length}
                })

                $("#blueprintTable tbody").empty();
                newArray.map(function(val,index){
                  var toAdd = '<tr><td>' + val.key + '</td><td>' + val.value + '</td><td><button type="button" class="btn btn-secondary" onclick="Module.drawBluePrint(this.value)" value="'+val.key+'">Draw '+ val.key + '</button></td></tr>';
                  $("#blueprintTable tbody").append(toAdd);
                })

                var numberOfPoints = newArray.reduce(function(total, val){
                  return total.value + val.value;
                })

                document.getElementById("labelUserPoints").innerHTML = numberOfPoints;
            }
      };

    var draw = function (bp){
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      ctx.save();

      // Use the identity matrix while clearing the canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, c.width, c.height);

      // Restore the transform
      ctx.restore();
      bp.points.map(function(val,index){
        if(index==0){
          ctx.moveTo(val.x, val.y);
        }else{
          ctx.lineTo(val.x, val.y);
        }
        ctx.stroke();
      })

    }

    return {
      authorNameChanged: function () {
        selectedAuthorName = document.getElementById("authorName").value;
        

        apiclient.getBlueprintsByAuthor(selectedAuthorName,updateList);
      },

      drawBluePrint: function(bpName){
        selectedAuthorName = document.getElementById("authorName").value;

        apiclient.getBlueprintsByNameAndAuthor(selectedAuthorName, bpName, draw);

      }
      
    };
  
  })();

```

## apimock.js

The *apimock.js* simulating our backend :

```js
var apimock = (function () {

      var findElement = function (arr, propName, propValue) {
      for (var i=0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
          return arr[i];
    
      // will return undefined if not found; you could return a default instead
    }
  

    var mockdata=[];
    mockdata["author2"]=[{"author":"author2","points":[{"x":0,"y":1},{"x":1,"y":0}],"name":"Blueprint_b"}];
    mockdata["_authorname_"]=[{"author":"_authorname_","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"_bpname_ "}];
    mockdata["author1"]=[{"author":"author1","points":[{"x":88,"y":45},{"x":39,"y":64},{"x":1254,"y":546},{"x":7,"y":8},{"x":4,"y":2},{"x":11,"y":22}],"name":"Blueprint_a"}, {"author":"author1","points":[{"x":50,"y":1},{"x":1,"y":5}],"name":"School_blueprint"}];
    return {
      getBlueprintsByAuthor: function (author, callback) {
        callback(
            mockdata[author]
        );
      },

      getBlueprintsByNameAndAuthor: function(author, name, callback){
        callback(
          findElement(mockdata[author],"name", name)
        );
        
      }
    };


    
  
  })();


```


## apiclient.js

The *apiclient.js* requesting the data to our application using HTTP GET requests :

```js

var apiclient = (function () {

    var findElement = function (arr, propName, propValue) {
    for (var i=0; i < arr.length; i++)
      if (arr[i][propName] == propValue)
        return arr[i];
  
    // will return undefined if not found; you could return a default instead
  }


  
  return {
    getBlueprintsByAuthor: function (author, callback) {
        var str = "http://localhost:8080/blueprints/"+author;
        $.get(str, function(data){
            callback(
                data
            );
        });
    },

    getBlueprintsByNameAndAuthor: function(author, name, callback){
        var str = "http://localhost:8080/blueprints/"+author+"/"+name;
        $.get(str, function(data){
            callback(
                data
            );
        });
      
    }
  };


  

})();


```