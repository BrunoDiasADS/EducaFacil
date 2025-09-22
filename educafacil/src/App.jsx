import { useState } from 'react';
import './App.css';
import Logo from './assets/Logo.svg';
import ilustracao from './assets/illustration.png';

import questoes1AP from './data/portugues_1a.json';
import questoes2AP from './data/portugues_2a.json';
import questoes3AP from './data/portugues_3a.json';

import questoes1AM from './data/matematica_1a.json';
import questoes2AM from './data/matematica_2a.json';
import questoes3AM from './data/matematica_3a.json';

const questoes = {
  portugues: {
    "1a": questoes1AP,
    "2a": questoes2AP,
    "3a": questoes3AP,
  },
  matematica: {
    "1a": questoes1AM,
    "2a": questoes2AM,
    "3a": questoes3AM,
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
    <div className="container">
      <div className="left-panel">
        <div className="promo-content">
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <h2 className="promo-title">
            Porque cada momento de <span className="highlight">aprendizado</span> conta
          </h2>
          <p className="promo-description">
           Nunca é tarde demais para aprender algo novo! EducaFácil é a plataforma ideal para você que quer estudar de forma simples e divertida. Escolha sua matéria, ano e comece seu quiz agora mesmo!
          </p>
          
          <img src={ilustracao} alt="Ilustração" />
     
        </div>
      </div>
      
      <div className="right-panel">
        <img className="main-title"src={Logo} alt="EducaFácil Logo" />

        {fase !== 'inicio' && (
          <button
            className="botao-voltar"
            onClick={() => {
              setMateria(null);
              setAno(null);
              setFase('inicio');
            }}
          >
            Voltar
          </button>
        )}

        {fase === 'inicio' && (
          <>
            <h2 className="subtitle">Escolha a matéria:</h2>
            <div className="button-group">
              <button onClick={() => setMateria('portugues')}> Português </button>
              <button onClick={() => setMateria('matematica')}> Matemática </button>
            </div>

            {materia && (
              <div className="card">
                <h2 className="subtitle">Escolha o ano:</h2>
                <div className="button-group">
                  <button onClick={() => setAno('1a')}>1º Ano</button>
                  <button onClick={() => setAno('2a')}>2º Ano</button>
                  <button onClick={() => setAno('3a')}>3º Ano</button>
                </div>

                {ano && (
                  <div className="iniciar-container">
                    <button className="botao-iniciar" onClick={iniciarQuiz}>
                      Iniciar Quiz
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {fase === 'quiz' && (
          <div className="card">
            {mostrarResultado ? (
              <>
                <h2 className="subtitle">Quiz finalizado!</h2>
                <p className="score">
                  {pontuacao} de {questoesAtuais.length}
                </p>
                <button
                  className="botao-iniciar"
                  onClick={() => {
                    setMateria(null);
                    setAno(null);
                    setFase('inicio');
                  }}
                >
                  Voltar ao início
                </button>
              </>
            ) : (
              <>
                <h2 className="question">
                  {questoesAtuais[questaoAtual].pergunta}
                </h2>
                <div className="options">
                  {questoesAtuais[questaoAtual].opcoes.map((opcao, index) => (
                    <button
                      key={index}
                      className="option-button"
                      onClick={() => responder(opcao)}
                    >
                      {opcao}
                    </button>
                  ))}
                </div>
                <div className="progress">
                  <p>Questão {questaoAtual + 1} de {questoesAtuais.length}</p>
                  <p>Pontuação atual: {pontuacao}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
