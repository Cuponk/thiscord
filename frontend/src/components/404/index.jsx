import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './404.css'
import gif from '../../assets/gif.gif'


const FourOhFour = () => {
    return (
        <div className="container">
            <div className="text">
                <h1>WRONG TURN?</h1>
                <p>You look lost, stranger. You know what helps when you're lost? A piping hot bowl of noodles. Take a seat, we're frantically at work here cooking up something good. Oh, you need something to read? These might help you:</p>
                <Link to="/"><p>Back to Home</p></Link>
            </div>
        <img className='gif' src={gif} alt="" />
        </div>
    );
};

export default FourOhFour;