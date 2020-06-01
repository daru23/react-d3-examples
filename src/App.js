import React from 'react';
import './App.css';
import D3TreeComponent from './D3TreeComponent';

export default class App extends React.Component {
    state = {
        selected: 0,
        samples: [
            [
                {"child":"0", "parent":"", root: true},
                {"child":"1", "parent":"0"},
                {"child":"2", "parent":"0"},
                {"child":"3", "parent":"1"},
                {"child":"4", "parent":"1"},
                {"child":"5", "parent":"1"},
                {"child":"6", "parent":"1"},
                {"child":"6", "parent":"2"},
                {"child":"3", "parent":"2"},
                {"child":"7", "parent":"6"},
                {"child":"8", "parent":"3"},
                {"child":"8", "parent":"4"},
                {"child":"9", "parent":"4"},
            ],
            [
               {"child":"0", "parent":"", root: true},
               {"child":"1", "parent":"0"},
               {"child":"2", "parent":"0"},
               {"child":"3", "parent":"1"},
               {"child":"4", "parent":"1"},
               {"child":"5", "parent":"1"},
               {"child":"6", "parent":"1"},
               {"child":"5", "parent":"2"},
               {"child":"6", "parent":"2"},
               {"child":"7", "parent":"6"},
               {"child":"8", "parent":"3"},
               {"child":"8", "parent":"4"},
               {"child":"9", "parent":"5"},
            ],
        ]
    }

    handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        this.setState({selected: value});
    }

    render() {

        const { samples, selected }  = this.state;
        const data = this.state.samples[selected];
        return (<div>
                    <select name="samples" id="samples" onChange={this.handleChange}>
                        {samples.map((s,i) => <option value={i} key={i}>Sample {i+1}</option> )}
                    </select>
                    <D3TreeComponent data={data} index={selected} />

                </div>)
    }
}
