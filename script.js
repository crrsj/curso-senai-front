function cadastrarRegistro(titulo,autor,anoPublicacao) {
    
    // Captura os valores do formulário
    
    var  titulo = document.getElementById( "titulo" ).value;
    var  autor = document.getElementById ("autor").value;
    var  anoPublicacao = document.getElementById("anoPublicacao").value;
  
    // Cria um objeto com os dados a serem enviados
    var data = {
        
        titulo: titulo,
        autor: autor,      
        anoPublicacao: anoPublicacao
        
        
        
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/api/livro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
    
     document.getElementById("titulo").value ="";
     document.getElementById("autor").value ="";
     document.getElementById("anoPublicacao").value ="";
     
    
   
}


    function validarFormulario() { 
    
    var titulo = document.getElementById('titulo').value;
    var autor = document.getElementById('autor').value;
    var anoPublicacao = document.getElementById('anoPublicacao').value;
   
 
    if (titulo === '') {
        alert('Por favor, preencha o campo Titulo.');
        return false;
    }
    if (autor === '') {
        alert('Por favor, preencha o campo Autor.');
        return false;
    }
   
    if (anoPublicacao === '') {
        alert('Por favor, preencha o campo Ano de publicação .');
        return false;
    }

  
     cadastrarRegistro(titulo,autor,anoPublicacao);

    
    return true;
}

// Função para buscar dados da API e preencher a tabela
async function fetchDataAndPopulateTable() {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API
      const response = await fetch('http://localhost:8080/api/livro');
      const data = await response.json();

      // Limpa a tabela antes de inserir novos dados
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';

      // Preenche a tabela com os dados recebidos da API
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
         
          
          <td>${item.id}</td> 
          <td>${item.titulo}</td>       
          <td>${item.autor}</td>   
          <td>${item.anoPublicacao}</td>          
          <td><button  class="btn btn-eye" title="Visualizar"  onclick="buscarDados(${item.id})"><i class="fas fa-eye"></i></button></td>
          <td><button  class="btn btn-trash" title="Excluir" onclick="deletarRegistro(${item.id})"> <i class="fas fa-trash-alt"></i></button></td> `;
                                           
        
          
          tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao buscar e preencher dados:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para buscar e preencher os dados quando a página carrega
   fetchDataAndPopulateTable();
});


async function buscarDados(id) {
  try { 
      // URL da API, substitua pela sua URL
      const response = await fetch(`http://localhost:8080/api/livro/${id}`);

      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
          throw new Error('Erro ao buscar dados');
      }

      // Converte a resposta em JSON
      const data = await response.json();
      
    

    document.getElementById('id').value = data.id;      
    document.getElementById('titulo').value = data.titulo;
    document.getElementById('autor').value = data.autor;  
    document.getElementById('anoPublicacao').value = data.anoPublicacao;    
  
    fazerAlgo();

  } catch (error) {
  console.error('Erro:', error);
 }

}
  
function openModal() {

  // Seleciona o modal pelo ID
     var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
  
  // Abre o modal
    myModal.show();
  
  
  }



async function deletarRegistro(id) {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
      const response = await fetch(`http://localhost:8080/api/livro/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Adicione cabeçalhos adicionais, se necessário
        },
      });
      var resposta = confirm("Tem certeza que deseja deletar este livro?")
      if (resposta){
      if (response.ok) {
       
        console.log(`Livro com ID ${id} deletado com sucesso.`);
       } // Atualiza a tabela após a exclusão
        fetchDataAndPopulateTable();
      } else {
        console.error('Erro ao deletar Livro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
    }
  }
  
 
    async function updateUserData() {    
      const idInput =  document.getElementById("id");   
      const tituloInput = document.getElementById("titulo");     
      const autorInput = document.getElementById("autor");
      const anoPublicacaoInput = document.getElementById("anoPublicacao");    
    
        
      const updateId =  idInput.value    
      const updateTitulo = tituloInput.value  
      const updateAutor =  autorInput.value
      const updateAnoPublicacao =  anoPublicacaoInput.value
     
     
     
    
      try {
        const response =  await fetch(`http://localhost:8080/api/livro`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: updateId,                  
            titulo: updateTitulo, 
            autor: updateAutor,
            anoPublicacao: updateAnoPublicacao,  
            
            
                      
          }),
        });
    
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
    
        alert('Dados do usuário atualizados com sucesso!');
        fetchDataAndPopulateTable();
        recarregarPagina();
      

      } catch (error) {
        console.error(`Erro durante a atualização dos dados: ${error.message}`);
      }
      ocument.getElementById("id").value = "";       
      document.getElementById("titulo").value = "";   
      document.getElementById("autor").value ="";
      ocument.getElementById("anoPublicacao").value = "";       
      
    }


    function fazerAlgo() {
      // Chama a função principal
      alert("Você chamou a função!");

      // Faz o botão desaparecer
      const botao = document.getElementById("meuBotao");
      botao.style.display = "none"; // Define 'display' como 'none' para ocultar
  }

  // Função para recarregar a página
  function recarregarPagina() {
    /*window.location.href = `http://127.0.0.1:5500/index.html`*/
    window.location.reload(true); 
}