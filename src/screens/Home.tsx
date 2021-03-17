import { logUserOut } from "../apollo";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => logUserOut()}>Logout</button>
        </div>
    )
}
export default Home;