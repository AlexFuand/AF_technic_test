import Banner from '../../components/banner/banner.tsx';
import CardsHome from '../../components/cardsHome/cardsHome.tsx';
import './home.scss'

function Home() {
    return(
        <main>
            <div className="home">
                <Banner text='Bliink News'/>
                <CardsHome />
            </div>
        </main>
    )
}

export default Home;