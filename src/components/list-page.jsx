import './list-page.css';
import React from 'react';
import {ListItem} from './list-item';
import {InfiniteLoader, List} from 'react-virtualized'

export class ListPage extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.props.tasks.length === 0) {
			this.props.loadNextPage();
		}
	}

	render() {
		return (
			<div className="list-page">
				<div className="filter-field">
					<input type="text" onKeyDown={this._onKeyDown.bind(this)}/>
					<input type="button" onClick={this._onSort.bind(this)}/>
				</div>
				<div className="list-header">
					<div className="column">Name</div>
					<div className="column">Priority</div>
					<div className="column">Added</div>
					<div className="column">Time to complete</div>
					<div className="column">Action</div>
				</div>
				<InfiniteLoader
					className="list"
					isRowLoaded={this._isRowLoaded.bind(this)}
					loadMoreRows={this._loadMoreRows.bind(this)}
					rowCount={this._rowCount()}
				>
					{({onRowsRendered, registerChild}) => (
						<List
							ref={registerChild}
							rowRenderer={this._rowRenderer.bind(this)}
							onRowsRendered={onRowsRendered}
							rowCount={this._rowCount()}
							width={1200}
							height={300}
							rowHeight={35}
						/>
					)}
				</InfiniteLoader>
				{this.props.children}
			</div>
		);
	}

	_onKeyDown(ev) {
		ev.stopPropagation();
		if (ev.keyCode === 13 && ev.currentTarget.value) {
			this.props.onFilter(ev.currentTarget.value);
		}
	}

	_onSort(ev) {
		this.props.onSort(this.props.sortBy, this.props.sortDir === 'asc' ? 'desc' : 'asc');
	}

	_rowRenderer({index, key, style}) {
		let content;
		if (index < this.props.tasks.length) {
			const task = this.props.tasks[index];
			if (this.props.filter && !task.name.includes(this.props.filter)) {
				return null;
			}
			content = (
				<ListItem
					task={task}
					onDelete={this.props.onDelete}
					onClick={this.props.onSelectTask}
					isSelected={this.props.selectedTask === task.id}
				/>
			);
		} else {
			content = <div className="loading">Loading...</div>;
		}
		return (
			<div
				className="list-row-wrap"
				style={style}
				key={key}
			>
				{content}
			</div>
		);
	}

	_isRowLoaded({index}) {
		return index < this.props.tasks.length;
	}

	_loadMoreRows() {
		this.props.loadNextPage();
	}

	_rowCount() {
		return this.props.endReached ?
			this.props.tasks.length :
			this.props.tasks.length + 1;
	}

	_onScroll(ev) {
		// if (ev.currentTarget.clientHeight + ev.currentTarget.scrollTop >= ev.currentTarget.scrollHeight) {
		// 	this.props.loadNextPage();
		// }
	}
}
