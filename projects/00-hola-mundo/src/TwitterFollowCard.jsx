import { useState } from "react"

const TwitterFollowCard = ({ children, userName, initialFollowing }) => {

    const [isFollowing, setIsFollowing] = useState(initialFollowing)

    const handleClick = () => {
        setIsFollowing(!isFollowing)

    }

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing
        ? 'tw-followCard-button is-following'
        : "tw-followCard-button"
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img className='tw-followCard-avatar' src={`https://unavatar.io/${userName}`} alt="Midudev" />
                <div>
                    <strong>{children}</strong>
                    <span>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">{text}</span>
                    <span className="tw-followCard-stopFollow">Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}

export default TwitterFollowCard