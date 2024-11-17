import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './cardsHome.scss';

// Typage "article"
interface Article{
    title : string;
    description : string;
    urlToImage : string;
    publishedAt : string;
    content : string;
}

// Gestion des cards de la homepage
const CardsHome:React.FC= () => {
    // Constantes
    const [articles, setArticles] = useState<Article[]>([]);
    const [category, setCategory] = useState<string>('');
    const [totalResults, setTotalResults] = useState<number>(0);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [page, setPage] = useState<number>(1);
    const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology']
    const pageSize = 20;

    const navigate = useNavigate();

    // Fonction pages next & prev
    const nextPage = () => {
        setPage(page === maxPage ? 1 : page + 1)
    }

    const prevPage = () => {
        setPage(page - 1 === 0 ? maxPage : page - 1)
    }

    // Changement de category et réinitialisation de la page affichée
    const changeCategory = (event: React.SetStateAction<string>) => {
        setCategory(event)
        setPage(1)
    }

    // Fonction arrondir au supérieur
    const roundSup = (number: number) => {
        return Math.ceil(number)
    }

    // Récupère les données de l'API, converti en json, stocke l'objet dans 'articles', stocke les totalResults et maxPage
    const fetchBody = async () => {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=0c2ea3b3ce384a4e9d52cc7b214b8732&page=${page}&pageSize=${pageSize}&category=${category}`);
        const body = await response.json();
        setArticles(body.articles)
        setTotalResults(body.totalResults)
        setMaxPage(roundSup(totalResults/pageSize))
    }

    useEffect(() => {
        fetchBody();
    }, [page, category, maxPage, totalResults]);
    
    // Fonction lien vers l'article cliqué + typage des arg
    // Stocke l'obj article et le passe à la route /article/:index
    const linkToArticle = (article: Article, index: string | number) => {
        navigate("/article/" + index, {state : {article}})
    }

            return (
                <div>
                    <nav>
                        <div className='catBtn'>
                            <button className={`filterBtn ${category === '' ? 'active' : ''}`} onClick={() => setCategory('')}>A la une</button>
                            {categories.map((item) => (
                                <button key={item} className={`filterBtn ${category === item ? 'active' : ''}`} onClick={() => changeCategory(item)}>
                                    {item}
                                </button>
                                ))}
                        </div>
                    </nav>
                    <div className='navBtn'>
                                <div className='prevBtn'onClick={() => {prevPage()}}>Page Précédente</div>
                                <div className='nextBtn' onClick={() => {nextPage()}}>Page Suivante</div>
                    </div>
                    <div className='navPage'>
                        Page : {page} sur {maxPage}
                    </div>
                    <div className='cardsHome'>
                        {articles.map((article, index) => {
                            return (
                                <section key={index} >
                                    <div className='card' onClick={() => linkToArticle(article, index)} >
                                        <figure className='card__img_ctn'>
                                            {article.urlToImage && <img className="card__img" src ={article.urlToImage} alt ={article.title} />}
                                        </figure>
                                        <div className ="card__title">{article.title}</div>
                                        <div className ="card__date">{new Date(article.publishedAt).toUTCString()}</div>
                                    </div>
                                </section>
                            )
                        })}
                        
                    </div>
                </div>
    )
}

export default CardsHome