import React, { Component } from 'react';
import api from '../../services/api';

import Main from '../template/Main';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
};

const initialState = {
    user: {
        name: '', 
        email: ''
    },
    list: []
};

export default class UserCrud extends Component {
    state = {
        ...initialState
    };

    componentDidMount() {
        api()
            .then(resp => {
                this.setState({ list: resp.data });
            });
    }

    clear() {
        this.setState({ user: initialState.user });
    }

    save() {
        const user = this.state.user;

        if(user.name && user.email) {
            const method = user.id ? 'put':'post';
            const URL = user.id ? `/${user.id}`:'';
    
            api[method](URL, user)
                .then(resp => {
                    const list = this.getUpdateList(resp.data);
                    this.setState({ user: initialState.user, list });
                })
                .catch(error => {
                    this.setState({ user: initialState.user });
                });
        }
    }

    getUpdateList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id);
        if(add) {
            list.unshift(user);
        }

        return list;
    }

    updateField(event) {
        const user = { ...this.state.user };
        user[event.target.name] = event.target.value;

        this.setState({ user });
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input required type="text" className="form-control" name="name" value={this.state.user.name} onChange={e => this.updateField(e)} placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input required type="email" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>
                <hr/>

                <div className="row">
                    <div className="col-12 d-flex justify-content-around">
                        <button className="btn btn-primary" onClick={e => this.save()}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary" onClick={e => this.clear()}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>  
        );
    }

    load(user) {
        this.setState({ user });
    }

    remove(user) {
        api.delete(`/${user.id}`)
            .then(resp => {
                const list = this.getUpdateList(user, false);

                this.setState({ list });
            });
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button onClick={e => this.load(user)} className="btn btn-warning">
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button onClick={e => this.remove(user)} className="btn btn-danger ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        );
    }
}