import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Banner from '../banner/banner.tsx'
import './articles.scss';


const Article = () => {

    // Recupération du state passé grave à l'item state:article de la fonction linkToArticle du composant cardsHome
    const { state } = useLocation(); 
    // Récupération et stockage de l'objet article
    const article = state.article; 

    const navigate = useNavigate();
    // fonction de retour à la page d'accueil
    const returnBtn = () => {
        navigate('/')
    }
  
        return (
            <main>
                <Banner text='Bliink news' />
                <div className='article_container'>
                    <div className='article_title'>{article.title}</div>
                    <div className='article_date'>Publié le : {new Date(article.publishedAt).toUTCString()}</div>
                    <div className='article_corpse'>
                        <div className='article_corpse_left'>
                            <div className='article_corpse_left_descr'>{article.description}</div>
                            <div className='article_corpse_left_content'>{article.content}</div>
                        </div>
                        <div className='article_corpse_right'>
                            {article.urlToImage && <img className='article_corpse_right_img' src={article.urlToImage} alt={article.title} />}
                        </div>
                    </div>
                    <div className='return_btn' onClick={returnBtn}>Retour à la page d'accueil</div>
                </div>
            </main>
            
        );
  };
  
  export default Article;