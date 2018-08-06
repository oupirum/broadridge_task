import './app.css';
import React from 'react';
import ListPage from '../containers/list-page';
import Details from '../containers/details';
import AddPage from '../containers/add-page';
import {Router, Route, Link, hashHistory} from 'react-router';

export class App extends React.PureComponent {
	render() {
		const navMenu = (
			<div className="nav-menu">
				<Link className="link" to="/" activeClassName="active">Tasks List</Link>
				<Link className="link" to="/add" activeClassName="active">Add new task</Link>
			</div>
		);
		return (
			<div className="app">
				<Router history={hashHistory}>
					<Route path="/" component={(props) => (
						<>
							{navMenu}
							<ListPage
								{...props}
								onSelectTask={(task) => {
									hashHistory.push(`/details/${task.id}`);
									this.props.onSelectTask(task.id);
								}}
								selectedTask={this.props.selectedTaskId}
							/>
						</>
					)}>
						<Route path="/details/:id" component={Details} onEnter={(nextState) => {
							this.props.onSelectTask(nextState.params.id);
						}}/>
					</Route>
					<Route path="/add" component={(props) => (
						<>
							{navMenu}
							<AddPage {...props}/>
						</>
					)}/>
				</Router>
			</div>
		);
	}
}
