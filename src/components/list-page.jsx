import './list-page.css';
import React from 'react';
import {Counter} from './counter';
import {InfiniteLoader, Table, Column} from 'react-virtualized';
import * as moment from 'moment';

export class ListPage extends React.PureComponent {
	componentDidMount() {
		if (this.props.tasks.length === 0) {
			this.props.loadNextPage();
		}
	}

	render() {
		return (
			<div className="list-page">
				<InfiniteLoader
					isRowLoaded={this._isRowLoaded.bind(this)}
					loadMoreRows={this._loadMoreRows.bind(this)}
					rowCount={this._rowCount()}

				>
					{({onRowsRendered, registerChild}) => (
						<Table
							className="list"
							ref={registerChild}
							rowGetter={this._rowRenderer.bind(this)}
							onRowsRendered={onRowsRendered}
							rowCount={this._rowCount()}
							width={1000}
							height={300}
							rowHeight={35}
							headerHeight={25}
							onRowClick={this._onRowClick.bind(this)}
							onHeaderClick={this._onHeaderClick.bind(this)}
							headerClassName="header"
							rowClassName="list-row"
						>
							<Column
								label={(
									<span className="column">
										Name {this._renderSortArrow('name')}
									</span>
								)}
								cellDataGetter={({rowData}) => rowData.name}
								dataKey="name"
								width={200}
								className="column"
							/>
							<Column
								label={(
									<span className="column">
										Priority {this._renderSortArrow('priority')}
									</span>
								)}
								cellDataGetter={({rowData}) => rowData.priority}
								dataKey="priority"
								width={200}
								className="column"
							/>
							<Column
								label={(
									<span className="column">
										Added {this._renderSortArrow('timeAdded')}
									</span>
								)}
								cellDataGetter={({rowData}) => rowData.timeAdded}
								dataKey="timeAdded"
								width={200}
								className="column"
							/>
							<Column
								label={(
									<span className="column">Time to complete</span>
								)}
								cellDataGetter={({rowData}) => rowData.ttc}
								cellRenderer={({cellData}) => cellData}
								dataKey="ttc"
								width={200}
								className="column"
							/>
							<Column
								label={(
									<span className="column">Action</span>
								)}
								cellDataGetter={({rowData}) => rowData.action}
								cellRenderer={({cellData}) => cellData}
								dataKey="action"
								width={200}
								className="column"
							/>
						</Table>
					)}
				</InfiniteLoader>
				{this.props.children}
			</div>
		);
	}

	_onHeaderClick({dataKey}) {
		if (['name', 'priority', 'timeAdded'].includes(dataKey)) {
			if (!this.props.fetching) {
				this.props.onSort(dataKey, this.props.sortDir === 'asc' ? 'desc' : 'asc');
			}
		}
	}

	_renderSortArrow(column) {
		if (this.props.sortBy === column) {
			return this.props.sortDir === 'desc' ? '⮝' : '⮟';
		}
		return null;
	}

	_onRowClick({rowData}) {
		this.props.onSelectTask(rowData.task);
	}

	_rowRenderer({index}) {
		if (index < this.props.tasks.length) {
			const task = this.props.tasks[index];
			return {
				task: task,
				name: task.name,
				priority: task.priority,
				timeAdded: moment.unix(task.timeAdded).format('YYYY-MM-DD HH:mm:ss'),
				ttc: <Counter task={task}/>,
				action: <button onClick={() => this.props.onDelete(task)}>Delete</button>
			};
		} else {
			return {name: 'Loading...'};
		}
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
}
