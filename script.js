Parse.serverURL = 'https://parseapi.back4app.com'; 
Parse.initialize(
  'NYibFhFk9bAG530PtyhMf2YLNZTNWDjMRmlSlfhe', 
  'YKVWxKPvoH50zXNueCt4oWXFtFQ3eBrZk5OhUoRi' 
);


const div = document.getElementById("div");
const inputDescri = document.getElementById("adicTarefa");
const btnInserir = document.getElementById("inserir");

let vetTarefa = [];

function gerarLista() {
  div.innerHTML = "";
  for (let i = 0; i < vetTarefa.length; ++i) {

    const li = document.createElement("li");

    const txt = document.createTextNode(
      `${vetTarefa[i].get("Descricao")}`
    );
    const div2 = document.createElement("div");
    div2.className = "podeir"

    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = "check";
    check.checked = vetTarefa[i].get("Concluido");
    check.onclick = (evt) => checkTarefa(evt, vetTarefa[i], div2);

    const btnRemover = document.createElement("button");
    btnRemover.innerHTML = 'REMOVER';
    btnRemover.className = "btn";
    btnRemover.onclick = (evt2) => removeTarefa(evt2, vetTarefa[i]);

    li.appendChild(check);
    div2.appendChild(txt);
    li.appendChild(div2);
    div.appendChild(li);
    li.appendChild(btnRemover);
  }
}

const lista = async () => {
  const Tarefa = Parse.Object.extend('Tarefa');
  const query = new Parse.Query(Tarefa);
  try {
    const results = await query.find();
    vetTarefa = results;
    gerarLista();
  } catch (error) {
    console.error('Error while fetching Tarefa', error);
  }
};

const inserir = async () => {
  const myNewObject = new Parse.Object('Tarefa');
  myNewObject.set('Descricao', inputDescri.value);
  myNewObject.set('Concluido', false);
  inputDescri.value = "";
  inputDescri.focus();
  try {
    const result = await myNewObject.save();
    console.log('Tarefa created', result);
    lista();
  } catch (error) {
    console.error('Error while creating Tarefa: ', error);
  }
};

const checkTarefa = async (evt, tarefa, div2) => {
  tarefa.set('Concluido', evt.target.checked);

  if(evt.target.checked){
    div2.className = "risco";
  }else{
    div2.className = "semRisco"
  }

  try {
    const response = await tarefa.save();
    console.log(response.get('Concluido'));
    console.log('Tarefa updated', response)
  } catch (error) {
    console.error('Error while updating Tarefa', error);
  }
};

const removeTarefa = async (evt2, tarefa) => {
  tarefa.set(evt2.target.remove);
  try {
    const response = await tarefa.destroy();
    console.log('Delet ParseObject', response);
    lista();
  } catch (error) {
    console.error('Error while updating Tarefa', error);
  }
};

btnInserir.onclick = inserir;
lista();
gerarLista();