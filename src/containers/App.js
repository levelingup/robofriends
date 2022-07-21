import React, { Component } from "react";
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
import './App.css';

import { setSearchField } from '../actions'

// what piece of state I need to listen to and send it down as props
const mapStateToProps = state => {
    return {
        searchField: state.searchField // comes from our reducers
    }
}

// what props I should listen to that are actions, that needs to get dispatched.
const mapDispatchToProps = (dispatch) => {
    return { // return as an object that contains all of our action
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}
class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            // searchField: '',
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users})
        );
    }
    // const [robots, setRobots] = useState([]);
    // const [searchfield, setSearchField] = useState('');
    // const [count, setCount] = useState(0);
    
    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => setRobots(users)
    //     );
    //     console.log(count);
    // }, [count]); // only run if count changes.


    // const onSearchChange = (event) => {
    //     setSearchField(event.target.value)
    // }

    // onSearchChange = (event) => {
    //     this.setState({searchField: event.target.value})
    // }

    // const { robots, searchfield } = this.state;
    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return !robots.length ?
            <div className="tc"><h1 className="f1">Loading...</h1></div> : 
        (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);