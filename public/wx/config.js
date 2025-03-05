const oa_name = "柚子成长站";
const oa_description = "汇聚点滴有所收获";
const web_beian = "鄂ICP备2025094437号-1";

function replaceText(elementId, newText) {
  var element = document.getElementById(elementId);
  if (element) {
      element.innerText = newText;
  } else {
      console.log("Element with ID '" + elementId + "' not found.");
  }
}

replaceText('wechatOA-name', oa_name);
replaceText('wechatOA-description', oa_description)
replaceText('web-beian', web_beian)