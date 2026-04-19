import classNames from 'classnames';

type TabButtonProps = {
	isActive: boolean;
	onClick: () => void;
	children: React.ReactNode;
};

export const TabButton = ( {
	isActive,
	onClick,
	children,
}: TabButtonProps ) => {
	return (
		<button
			className={ classNames(
				'flex-1 py-3 text-base box-content border-x-0 border-t-0 border-b-3',
				{
					'bg-gray-100 border-transparent': ! isActive,
					'bg-transparent border-[var(--wp-admin-theme-color)] text-[var(--wp-admin-theme-color)]':
						isActive,
				}
			) }
			onClick={ onClick }
		>
			{ children }
		</button>
	);
};
