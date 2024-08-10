function compile() {
    var html = document.getElementById("htmlCode");
    var css = document.getElementById("cssCode");
    var js = document.getElementById("jsCode");
    var code = document.getElementById("output").contentWindow.document;
  
    document.body.onkeyup = function() {
      code.open();
      code.writeln(
        html.value +
          "<style>" +
          css.value +
          "</style>" +
          "<script>" +
          js.value +
          "</script>"
      );
      code.close();
    };
}
function copy(text){
    navigator.clipboard.writeText(text).then(() => {
    console.log('Content copied to clipboard');
    /* Resolved - text copied to clipboard successfully */
    },() => {
    console.error('Failed to copy');
    /* Rejected - text failed to copy to the clipboard */
    });
}
function copyContenth(){
    let text = document.getElementById("htmlCode").value;
    copy(text);
}
function copyContentc(){
    let text = document.getElementById("cssCode").value;
    copy(text);
}
function copyContentj(){
    let text = document.getElementById("jsCode").value;
    copy(text);
}

  
compile();