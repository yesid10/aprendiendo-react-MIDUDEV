
import "./App.css";
import TwitterFollowCard from './TwitterFollowCard';

const users = [
    {
        userName: 'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing: true
    },
    {
        userName: 'pheralb',
        name: 'Pablo H.',
        isFollowing: false
    },
    {
        userName: 'PacoHdezs',
        name: 'Paco Hdez',
        isFollowing: true
    },
    {
        userName: 'TMChein',
        name: 'Tomas',
        isFollowing: false
    }
]

const App = () => {
   
    return (
        <section className="App">
            {
                users.map((user) => 
                    <TwitterFollowCard
                        key={user.userName}
                        userName={user.userName}
                        initialFollowing={user.isFollowing}
                    >
                        {user.name}
                    </TwitterFollowCard>
                )
            }

        </section>
    )

}

export default App;