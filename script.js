const q = console.log;
const body = document.querySelector("body");
let noteNum = 0;
//////////////LocalStorage////////////////////////
/////3 items://///////////////////////////
///// noteNum from beginning (0) just increase to keep generating unique Id s//////
//// note Id in one: [note1,note2,...] //notesId///
////, note text seprated: localStorage.setItem("note1", "...")///////////////
const textToArray = (text) => {
  let result = "";
  let array = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== ",") {
      result += text[i];
    } else {
      array.push(result);
      result = "";
    }
  }
  array.push(result);

  return array;
};

const arrayToText = (array) => {
  let result = "";
  if (array.length !== 0) {
    for (let i = 0; i < array.length - 1; i++) {
      result += `${array[i]},`;
    }
    result += array[array.length - 1];
    return result;
  } else {
    return result;
  }
};

//////////////get data from LocalStorage and set////////////////////
let notesId = [];
if (localStorage.getItem("notesId") == null) {
  q("no item");
  notesId = [];
} else {
  notesId = textToArray(localStorage.getItem("notesId"));
  q(notesId);

  noteNum = Number(localStorage.getItem("noteNum"));
  q(noteNum);

  q(localStorage.getItem(notesId[0]));

  function idToIndex(noteId) {
    let i = 0;
    let result = 0;
    while (noteId[noteId.length - 1 - i] !== "e") {
      result += Number(noteId[noteId.length - 1 - i]) * 10 ** i;
      i++;
    }
    return result;
  }
  q(idToIndex("note6784"));

  for (let i = 0; i < notesId.length; i++) {
    let newNote = document.createElement("div");
    newNote.id = `noteArea${idToIndex(notesId[i])}`;
    newNote.classList.add("note");

    newNote.innerHTML = `<div class="noteHeader">
    <i class="fa fa-edit" style="font-size:25px;" onclick="openTextArea(${idToIndex(
      notesId[i]
    )})"></i>
    <i class="fa fa-trash-o" style="font-size:23px;" onclick="deleteTextArea(${idToIndex(
      notesId[i]
    )})"></i>
    </div>
    <div id="text${idToIndex(
      notesId[i]
    )}" class="textarea">${localStorage.getItem(notesId[i])}</div>
    <textarea id="note${idToIndex(
      notesId[i]
    )}" class="hidden" onfocusout="closeTextArea(${idToIndex(
      notesId[i]
    )})"></textarea>`;

    body.appendChild(newNote);
  }
}

/////////////////////////////////////////////////

const openTextArea = (index) => {
  // eval(`focusedArea${index}` + `=` + `true;`);
  document.getElementById(`note${index}`).classList.remove("hidden");
  document.getElementById(`note${index}`).value = document.getElementById(
    `text${index}`
  ).innerText;

  document.getElementById(`note${index}`).focus();

  // q(eval(`focusedArea${index}`));
};

const closeTextArea = (index) => {
  document.getElementById(`text${index}`).innerText = document.getElementById(
    `note${index}`
  ).value;

  document.getElementById(`note${index}`).classList.add("hidden");

  //////////////LocalStorage////////////////////////
  localStorage.setItem(
    `note${index}`,
    `${document.getElementById(`text${index}`).innerText}`
  );
  /////////////////////////////////////////////////
};

const deleteTextArea = (index) => {
  let deletedNote = document.getElementById(`noteArea${index}`);
  body.removeChild(deletedNote);

  //////////////LocalStorage////////////////////////

  // Removing the specified element by value from the array
  for (let i = 0; i < notesId.length; i++) {
    if (notesId[i] === `note${index}`) {
      notesId.splice(i, 1);
    }
  }
  q(notesId);
  localStorage.setItem("notesId", `${arrayToText(notesId)}`);
  if (notesId.length == 0) {
    localStorage.clear();
  }
  q(localStorage.getItem("notesId"));
  /////////////////////////////////////////////////
};

const addNote = () => {
  noteNum += 1;

  //////////////LocalStorage////////////////////////
  localStorage.setItem("noteNum", `${noteNum}`);
  localStorage.setItem(`note${noteNum}`, "");

  notesId.push(`note${noteNum}`);
  localStorage.setItem("notesId", `${arrayToText(notesId)}`);
  q(localStorage.getItem("notesId"));
  /////////////////////////////////////////////////

  let newNote = document.createElement("div");
  newNote.id = `noteArea${noteNum}`;
  newNote.classList.add("note");

  newNote.innerHTML = `<div class="noteHeader">
<i class="fa fa-edit" style="font-size:25px;" onclick="openTextArea(${noteNum})"></i>
<i class="fa fa-trash-o" style="font-size:23px;" onclick="deleteTextArea(${noteNum})"></i>
</div>
<div id="text${noteNum}" class="textarea"></div>
<textarea id="note${noteNum}" class="hidden" onfocusout="closeTextArea(${noteNum})"></textarea>`;

  body.appendChild(newNote);
};

//////////////////////////////////////////////////

// window.addEventListener("unload", () => {
//   localStorage.setItem("note1", "someData");
// });
// localStorage.clear();
