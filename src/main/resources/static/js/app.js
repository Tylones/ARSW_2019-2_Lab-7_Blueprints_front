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
                  var toAdd = '<tr><td>' + val.key + '</td><td>' + val.value + '</td><td></td></tr>';
                  $("#blueprintTable tbody").append(toAdd);
                })
            }
      };

    return {
      authorNameChanged: function () {
        selectedAuthorName = document.getElementById("authorName").value;
        

        apimock.getBlueprintsByAuthor(selectedAuthorName,updateList);
      }

      
    };
  
  })();