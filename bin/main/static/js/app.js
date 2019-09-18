var Module = (function () {

    var selectedAuthorName;
    var bpList=[];

    return {
      authorNameChanged: function () {
        selectedAuthorName = document.getElementById("authorName").value;
        document.getElementById("authorsNameLabel").innerHTML = selectedAuthorName;
      }
    };
  
  })();