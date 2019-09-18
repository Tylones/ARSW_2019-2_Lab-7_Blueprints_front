var apimock = (function () {

    var mockdata=[];
    mockdata["author2"]=[{"author":"author2","points":[{"x":0,"y":1},{"x":1,"y":0}],"name":"Blueprint_b"}];
    mockdata["_authorname_"]=[{"author":"_authorname_","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"_bpname_ "}];
    mockdata["author1"]=[{"author":"author1","points":[{"x":88,"y":45},{"x":39,"y":64},{"x":1254,"y":546},{"x":7,"y":8},{"x":4,"y":2},{"x":11,"y":22}],"name":"Blueprint_a"}, {"author":"author1","points":[{"x":50,"y":1},{"x":1,"y":5}],"name":"School_blueprint"}];
    return {
      getBlueprintsByAuthor: function (author, callback) {
        callback(
            mockdata[author]
        );
      }
    };
  
  })();
