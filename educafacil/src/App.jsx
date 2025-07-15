import { useState } from 'react';
import './App.css';

import questoes5A from './data/portugues_5a.json';
import questoes6A from './data/portugues_6a.json';
import questoes7A from './data/portugues_7a.json';
import questoes8A from './data/portugues_8a.json';

const questoes = {
  portugues: {
    "5a": questoes5A,
    "6a": questoes6A,
    "7a": questoes7A,
    "8a": questoes8A
  }
};


function App() {
  const [materia, setMateria] = useState(null);
  const [ano, setAno] = useState(null);
  const [fase, setFase] = useState('inicio');
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);

  const iniciarQuiz = () => {
    setFase('quiz');
    setQuestaoAtual(0);
    setPontuacao(0);
    setMostrarResultado(false);
  };

  const questoesAtuais = materia && ano ? questoes[materia][ano] : [];

  const responder = (opcao) => {
    const correta = opcao === questoesAtuais[questaoAtual].resposta;
    if (correta) {
      setPontuacao(pontuacao + 1);
    }
    const proxima = questaoAtual + 1;
    if (proxima < questoesAtuais.length) {
      setQuestaoAtual(proxima);
    } else {
      setMostrarResultado(true);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      color: '#000080',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1>EducaFácil</h1>

      {fase !== 'inicio' && (
  <div className="botao-voltar">
    <button onClick={() => {
      setMateria(null);
      setAno(null);
      setFase('inicio');
    }}>
      Voltar
    </button>
  </div>
)}

    {/* Tela Inicial */}
    {fase === 'inicio' && (
      <>
          <h2>Escolha a matéria:</h2>
          <button onClick={() => setMateria('portugues')}>Português</button>
          <button onClick={() => setMateria('matematica')}>Matemática</button>

          {materia && (
            <>
              <h2>Escolha o ano:</h2>
              <button onClick={() => setAno('5a')}>5ª Série</button>
              <button onClick={() => setAno('6a')}>6ª Série</button>
              <button onClick={() => setAno('7a')}>7ª Série</button>
              <button onClick={() => setAno('8a')}>8ª Série</button>
              
        {ano && (
          <div className="botao-iniciar">
            <button onClick={iniciarQuiz}>Iniciar Quiz</button>
          </div>
        )}
      </>
    )}
  </>
)}

      {fase === 'quiz' && (
        mostrarResultado ? (
          <>
            <h2>Quiz finalizado!</h2>
            <p>Pontuação: {pontuacao} de {questoesAtuais.length}</p>
            <button onClick={() => {
              setMateria(null);
              setAno(null);
              setFase('inicio');
            }}>Voltar ao início</button>
          </>
        ) : (
          <>
            <h2>{questoesAtuais[questaoAtual].pergunta}</h2>
            {questoesAtuais[questaoAtual].opcoes.map((opcao, index) => (
              <button key={index} onClick={() => responder(opcao)}>
                {opcao}
              </button>
            ))}
            <p>Questão {questaoAtual + 1} de {questoesAtuais.length}</p>
            <p>Pontuação atual: {pontuacao}</p>
          </>
        )
      )}
    </div>
  );
}

export default App;
