import { useState } from 'react';
import './App.css';
import Logo from './assets/Logo.svg';
import ilustracao from './assets/illustration.png';

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
              <button onClick={() => setMateria('portugues')}>
                Português
              </button>
              <button onClick={() => setMateria('matematica')}>
                Matemática
              </button>
            </div>

            {materia && (
              <div className="card">
                <h2 className="subtitle">Escolha o ano:</h2>
                <div className="button-group">
                  <button onClick={() => setAno('5a')}>5ª Série</button>
                  <button onClick={() => setAno('6a')}>6ª Série</button>
                  <button onClick={() => setAno('7a')}>7ª Série</button>
                  <button onClick={() => setAno('8a')}>8ª Série</button>
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
