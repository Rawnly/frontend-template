import { Button } from 'ariakit/button';
import clsx from 'clsx';
import type { NextPage } from 'next';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import todoSlice, { todosSelectors } from '@store/features/todo/todo.duck';
import { Todo } from '~types/api/todo';

function paginate<T>(list: T[], page = 1, perPage = 15): T[] {
	const start = (page - 1) * perPage;
	const end = page * perPage;

	return list.slice(start, end);
}

interface PageProps {}

const per_page = 15;

const Page: NextPage<PageProps> = props => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const todos = useSelector(todosSelectors.getTodos);
	const list = useMemo(() => paginate(todos, page, per_page), [page, todos]);

	const toggleTodo = useCallback(
		(todo: Todo) => () => {
			dispatch(
				todoSlice.actions.updateTodo({
					id: todo.id,
					completed: !todo.completed,
				})
			);
		},
		[dispatch]
	);

	useEffect(() => {
		dispatch(todoSlice.actions.fetchTodos());
	}, [dispatch]);

	return (
		<div className="flex flex-col items-center justify-center w-screen h-screen gap-4">
			<h1 className="text-3xl font-bold">Todo List</h1>
			<ul className="min-w-[570px] overflow-y-scroll h-[520px]">
				{list.map(todo => (
					<li
						key={todo.id}
						onClick={toggleTodo(todo)}
						className={clsx(
							'transition-all px-2 cursor-pointer py-1 duration-150 rounded-md hover:bg-gray-200',
							{
								'line-through opacity-50': todo.completed,
							}
						)}
					>
						{todo.title}
					</li>
				))}

				{list.length === 0 ? 'No todos for this page.' : null}
			</ul>
			<nav
				className="w-[500px] sm:px-6 flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200"
				aria-label="Pagination"
			>
				<div className="sm:block hidden">
					<p className="text-sm text-gray-700">
						Showing <span className="font-medium">{page === 1 ? page : (page - 1) * per_page}</span> to{' '}
						<span className="font-medium">{per_page * page}</span> of{' '}
						<span className="font-medium">{todos.length}</span> results
					</p>
				</div>
				<div className="sm:justify-end flex justify-between flex-1">
					<Button
						onClick={() => setPage(page => page - 1)}
						disabled={page <= 1}
						className="hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
					>
						Previous
					</Button>
					<Button
						onClick={() => setPage(page => page + 1)}
						className="hover:bg-gray-50 relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
					>
						Next
					</Button>
				</div>
			</nav>
		</div>
	);
};

Page.displayName = 'IndexPage';

export default Page;
