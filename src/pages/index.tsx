import React from 'react';
import type { NextPage } from 'next';

interface PageProps { }

const Page: NextPage<PageProps> = props => {
	return (
		<div className='flex items-center justify-center w-screen h-screen'>
			<h1 data-testid='title' className='text-3xl font-bold'>Hello World</h1>
		</div>
	)
};

Page.displayName = 'IndexPage';

export default Page;
