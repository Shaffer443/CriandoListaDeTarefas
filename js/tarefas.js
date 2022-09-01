//alert('Olá');

let inputNovaTarefa = document.querySelector('#inputNovaTarefa');
let btnAddTarefa = document.querySelector('#btnAddTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let fecharJanelaEdicao = document.querySelector('#fecharJanelaEdicao');
let botaoAtualizarTarefa = document.querySelector('#botaoAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');

/*o algoritimo abaixo, verifica quando clicarmos na TECLA enter. Que tem seu keyCode = 13*/
/* Pode-se pesquisar no google por keycode.info, para saber os códigos de cada tecla do teclado*/

/* Na variável Tarefa (let tarefa), criamos um obejeto e pegamos os valores correspondentes*/ 
/*o id: é um verificador único, um contador, como um auto increment no SQL. Como não está conectado (até aqui), com um BD, vamos criar um contador manual ou um gerador de id*/
/*Math.floor(Math.random()*1000), significa que vai gerar um numero entre 1 a 1000 aleatoriamente. Posso tentar melhorar para ser sequencial ou linka com um BD.
o Math.floor, retorna o numero interio mais proximo que o random indicar, já que o random pode retornar um float*/ 

function gerarId(){
    return Math.floor(Math.random()*1000);
}

inputNovaTarefa.addEventListener("keypress", (e) => {
    

    if(e.keyCode == 13){ //13 = teclaenter

        let tarefa = {
            nome: inputNovaTarefa.value,
            id: gerarId(),
        }

        adicionarTarefa(tarefa); // Add Tarefa ao HTML
    }

    

});
//(e) - Erom funcion
fecharJanelaEdicao.addEventListener('click', (e)=>{
    alterarJanelaEdicao();
})


btnAddTarefa.addEventListener('click', (e) =>{

    
    let tarefa = {
        nome: inputNovaTarefa.value,
        id: gerarId(),
    }
    

    adicionarTarefa(tarefa); // Add Tarefa ao HTML

});

botaoAtualizarTarefa.addEventListener('click', (e) =>{
    
    e.preventDefault(); //prevenção e evitando para não submeter os dados para dentro da mesma página.
    
    //Recuperar o ID da tarefa que esta editando e editar
    let idTarefa = idTarefaEdicao.innerHTML.replace('#', ''); // replace (), faz a alteração pelo que for digitado.

    //atualizando a tarefa,criando um novo objeto.

    let tarefa = {
        nome: inputTarefaNomeEdicao.value, //Adicionando os valores das alterações
        id: idTarefa //o mesmo ID
    }

    //Atualizar a nossa tarefa atual

    let tarefaAtual= document.getElementById(''+idTarefa+'');

    if(tarefaAtual){
        
        let li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual); //trocando a tarefa atual pela nova tarefa, e assim atualizando
        alterarJanelaEdicao(); //para concretizar a alteração

    }else { //Apenas alguma informação caso não seja encontrado o elemento <LI>. Mais um feedback visual.
        alert('Element HTML não encontrado...');
    }


});


/*Evento do botão add tarefa, onde foi criada uma função para adicionar tarefa, onde criaremos o <LI> dinâmicamente com o JS */
/* Dentro da tag li (let li = document.createElement('li')), além do <span>, tem o notão de adcionar e remover tarefa*/

function adicionarTarefa(tarefa){

    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);

    inputNovaTarefa.value=''; // atribuindo um valor vazio, após adicionar a tarefa
    
};


function criarTagLI(tarefa){

    let li = document.createElement('li');

    li.id = tarefa.id; //adicionamso um ID = a um numero de id gerado automaticamente pela função geradora,e  com isso podemos manipula pelo este id a exclusão ou edição
    
    let span = document.createElement('span'); // Adicionando a class = 'textotarefa'
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome; /*aparece o nome da tarefa */
    
    let div = document.createElement('div');


    let botaoEditar = document.createElement('button');
    botaoEditar.classList.add('btnAcao');
    botaoEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    botaoEditar.setAttribute('onClick', 'editarTarefa('+tarefa.id+')'); //Quando clicar, vai receber o id gerado, da tarefa que queremos editar, q é uam função

    let botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('btnAcao');
    botaoExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    botaoExcluir.setAttribute('onClick', 'excluirTarefa('+tarefa.id+')'); //Quando clicar, vai receber o id gerado, da tarefa que queremos excluir, q é uma função

    /* adicionando na div */

    div.appendChild(botaoEditar);
    div.appendChild(botaoExcluir);

    /*Adionando elementos na tag LI */

    li.appendChild(span);
    li.appendChild(div);
    
    return li; /* tag que retornará da função será a LI adicionada ou excluida */
};

//Implementando a função Excluir e Editar

function editarTarefa(idTarefa){
    //alert(idTarefa);

    let li = document.getElementById(''+ idTarefa +''); 
    if(li){
        idTarefaEdicao.innerHTML = '#' + idTarefa; //Recebendo o ID (#) idTarefa
        //abrindo uma janela de edição, construindo esta janela priemeiro
        inputTarefaNomeEdicao.value = li.innerText; // mostra na edição da tarefa o texto que será editado.
        alterarJanelaEdicao();
    
    }else { //Apenas alguma informação caso não seja encontrado o elemento <LI>. Mais um feedback visual.
        alert('Element HTML não encontrado...');
    }


};

function excluirTarefa(idTarefa){
    //alert(idTarefa);

    //implementação de exlução do itém pelo id gerado e viculado

    let confirmacao = window.confirm('Excluir a tarefa?'); //window = Recebe uma pergunta do navegador, em uma janela de confirmação
    if(confirmacao){
        let li = document.getElementById(''+ idTarefa +''); 
        if(li){
            listaTarefas.removeChild(li); //passando a tag que queremos remover
        }else { //Apenas alguma informação caso não seja encontrado o elemento <LI>. Mais um feedback visual.
            alert('Element HTML não encontrado...');
        }
    
    }


};

function alterarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}
