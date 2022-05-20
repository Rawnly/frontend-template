import type { NextPage as NP } from 'next/types';
import type { ReactElement, ReactNode } from 'react';
export type GetLayout = <T extends object>(page: ReactElement, props?: T) => ReactNode;

export type NextPageWithLayout<T = unknown> = NP<T> & {
	/**
	 * Specify a custom layout for the current page.
	 * @default undefined
	 */
	getLayout?: GetLayout;

	/**
	 * Disables layout for the current page
	 * @default true
	 */
	layout?: boolean;

	/**
	 * Page title to show in the layout
	 * @default "Dashboard"
	 */
	title?: string | null;

	/**
	 * Page title to show in the layout
	 * @default undefined
	 */
	seoTitle?: string;
};
