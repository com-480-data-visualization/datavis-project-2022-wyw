/*
===
AI style transferring
===
*/

let inputImg, styleImg, style;
let data = part_data;

var loadFile = function(event) {
	var image = document.getElementById('output');
	image.src = URL.createObjectURL(event.target.files[0]);
};

function download_img(el) {
  // get image URI from canvas object
  var canvas = document.getElementById("stylized");
  var imageURI = canvas.toDataURL("image/jpg");
  el.href = imageURI;
};

function updateStyle(input) {
  if (input.src) {
    styleImg = input.src;
    style = input.id;
  }
  console.log('Update style');
  console.log(style);


  let showStyleImg = document.getElementById('selectStyle');
  showStyleImg.src = styleImg;

  let text = 'You select style: ' + style;
  document.getElementById("StyleText").innerHTML = text;

};

function styleTransfer(this1) {
  this1.disabled = true;
  this1.innerHTML='<i class="fa fa-spinner fa-spin"></i> Loading…';


  const model = new mi.ArbitraryStyleTransferNetwork();
  const contentImg = document.getElementById('output');
  const styleImg = document.getElementById(style);
  const stylizedCanvas = document.getElementById('stylized');
	const stylizedCanvas1 = document.getElementById('sty1');
	const stylizedCanvas2 = document.getElementById('sty2');

  console.log(styleImg);

  function model1Stylize() {
    model.stylize(contentImg, styleImg).then((imageData) => {
      stylizedCanvas1.getContext('2d').putImageData(imageData, 0, 0);
			stylizedCanvas.getContext('2d').putImageData(imageData, 0, 0);
      console.log('Style transferring');
    });
  }

  function model2Stylize() {
    styleImg.style.height = '200px';
    styleImg.style.width = '300px';
    model.stylize(styleImg, contentImg).then((imageData) => {
      console.log(imageData);
      stylizedCanvas2.getContext('2d').putImageData(imageData, 0, 0);
      console.log('Style transferring');
    });
  }

  model.initialize().then(() => {
    model1Stylize();
    model2Stylize();
    styleImg.style.height= '';
    styleImg.style.width = '';
  });

  // Do the style transferring and wait for 5 second.
  setTimeout(function(){
      console.log("Style Transferring done!");
      // When the work is done, reset the button to original state
      this1.innerHTML = 'Create';
  }, 5000);
  this1.disabled=false;

};
