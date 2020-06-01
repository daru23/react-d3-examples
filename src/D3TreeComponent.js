import React, { Component } from 'react';
import D3Tree from './D3TreeClass';

export default class D3TreeComponent extends Component {

    constructor() {
        super();
        this.myTree = React.createRef();
    }

    componentDidMount() {
        const { data } = this.props;
        this.setState({
			tree: new D3Tree(this.myTree.current, data)
		})
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.selected !== prevProps.selected) {
            this.setState({
    			tree: new D3Tree(this.myTree.current, this.props.data)
    		})
        }
    }

    render () {
        return(<div ref={this.myTree}></div>)
    }
}
