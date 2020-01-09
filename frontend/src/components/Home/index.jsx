import React from 'react';
import Main from '../template/Main';
import './Home.css';

export default props => (
    <Main icon="home" title="Início" subtitle="Segundo Projeto do capítulo de React">
        <div className="spotlight display-4 text-white">Bem Vindo!</div>
        <hr />
        <p className="mb-0 font-weight-bold">Sistema para exemplificar a construção de um cadastro desenvolvido em React!</p>
    </Main>
);