import React, { useEffect, useState } from 'react';
import { useParams, Route, useHistory, Link, useRouteMatch, Switch } from 'react-router-dom';
import ListaCategorias from './ListaCategorias';
import SubCategoria from '../paginas/SubCategoria';
import ListaPost from './ListaPost';
import '../assets/css/blog.css';
import { busca } from '../api/api';

const Categoria = () => {

    const history = useHistory();
    const { id } = useParams();
    const { url, path } = useRouteMatch();
    const [subcategorias, setSubcategorias] = useState([]);

    useEffect(() => {
        busca(`/categorias/${id}`, (categoria) => {
            setSubcategorias(categoria.subcategorias);
        }).catch(() => {
            history.push('/404');
        });
    }, [id, history]);

    return (
        <>
            <div className="container">
                <h2 className="titulo-pagina">Pet Notícias</h2>
            </div>
            <ListaCategorias />
            <ul className="lista-categorias container flex">
                {subcategorias.map((subcategoria) => (
                    <li className={`lista-categorias__categoria lista-categorias__categoria--${id}`} key={subcategoria}>
                        <Link to={`${url}/${subcategoria}`}>{subcategoria}</Link>
                    </li>
                ))}
            </ul>
            <Switch>
                <Route exact path={path}>
                    <ListaPost url={`/posts/?categoria=${id}`} />
                </Route>
                <Route exact path={`${path}/:subcategoria`}>
                    <SubCategoria url={`/posts/?categoria=${id}`} />
                </Route>
            </Switch>
        </>
    );
}

export default Categoria;