const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    	items = _items;
    	_form.addEventListener('submit', formHandler);

   	 // TODO láta hluti í _items virka
  	 _items.addEventListener("click", function(e) {
  	 	finish(e);
  	 	deleteItem(e);
  	 	edit(e);
  	});
	
  	_items.addEventListener("keydown", (e)=>{
  		commit(e);
  	});

  }
  

  function formHandler(e) {
    	e.preventDefault();
	let val = document.querySelector(".form__input").value;
	if(val.trim() != "") {
		add(val);
	}
	document.querySelector(".form__input").value = ""; 
  }
  
  // event handler fyrir það að klára færslu
  function finish(e) {
  	if(e.target.classList.contains("item__checkbox")) {
		  e.target.parentNode.classList.toggle("item--done");
	}
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
  	if(e.target.classList.contains("item__text")) {
		let text = e.target.innerHTML;
		let inp = el("input", "item__edit", null, "text");
		inp.value = text; 
		e.target.parentNode.replaceChild(inp, e.target);
		inp.focus();
	}
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
	  let element_active = document.activeElement;
          if (element_active.classList.contains("item__edit") && e.keyCode === ENTER_KEYCODE) {
                  let text = element_active.value;
                  let span = el("span","item__text",null);
                  span.innterHTML = text;
                  active_element.parentNode.replaceChild(span,active_element);
          }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
  	var li = el("li", "item", null);
	var cb = el("input", "item__checkbox", null, "checkbox");
	var span = el("span", "item__text", null);
	var button = el("button", "item__button", null);
  	button.innerHTML = "Eyða";
	span.innerHTML = value;
	li.appendChild(cb);
	li.appendChild(span);
	li.appendChild(button);
	items.appendChild(li);
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
	  if(e.target.classList.contains("item__button")) {
		  e.target.parentNode.remove();
	  }
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
	  let elem = document.createElement(type);
	  elem.classList.add(className);
	  return elem; 
  }

  return {
    init: init
  }
})();
